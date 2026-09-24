"""Behavioural contracts shared by the reference and student exercises."""
import unittest
import reference as impl

class AlgorithmTests(unittest.TestCase):
    def test_agent_uses_dirt_and_memory(self):
        self.assertEqual(impl.vacuum_action('A', True, {'A','B'}), 'SUCK')
        self.assertEqual(impl.vacuum_action('A', False, {'A'}), 'RIGHT')
        self.assertEqual(impl.vacuum_action('B', False, {'A','B'}), 'STOP')
        with self.assertRaises(ValueError): impl.vacuum_action('C', False, set())

    def test_ucs_goal_on_removal_and_cheaper_duplicate(self):
        g={'S':[('G',10),('A',1)],'A':[('G',2)],'G':[]}
        r=impl.uniform_cost_search(g,'S','G')
        self.assertEqual((r.status,r.path,r.cost),('SOLVED',['S','A','G'],3))
        self.assertEqual(impl.uniform_cost_search(g,'G','G',0).cost,0)
        self.assertEqual(impl.uniform_cost_search(g,'S','G',0).status,'CUTOFF')
        self.assertEqual(impl.uniform_cost_search(g,'G','S').status,'EXHAUSTED')
        with self.assertRaises(ValueError): impl.uniform_cost_search({'S':[('G',-1)]},'S','G')

    def test_astar_reopens_with_admissible_inconsistent_heuristic(self):
        g={'S':[('A',3),('B',1)],'A':[('G',2)],'B':[('A',1),('G',100)],'G':[]}
        h={'S':4,'A':0,'B':3,'G':0}
        r=impl.a_star(g,'S','G',h)
        self.assertEqual((r.path,r.cost),(['S','B','A','G'],4))
        self.assertEqual(impl.a_star(g,'S','G',{k:0 for k in g}).cost,4)

    def test_coloring_feasibility_and_failure(self):
        graph={'A':{'B','C'},'B':{'A','C'},'C':{'A','B'}}
        result=impl.solve_coloring(graph,['red','green','blue'])
        self.assertIsNotNone(result)
        for a,neighbors in graph.items():
            for b in neighbors: self.assertNotEqual(result[a],result[b])
        self.assertIsNone(impl.solve_coloring(graph,['red','blue']))
        self.assertEqual(impl.solve_coloring({},[]),{})
        self.assertIsNone(impl.solve_coloring({'A':{'A'}},['red']))

    def test_minimax_pruning_value_and_stable_ties(self):
        for pruning in (True,False):
            r=impl.minimax([[4,7],[6,1]],pruning)
            self.assertEqual((r.value,r.action),(4,0))
            r=impl.minimax([[5,6],[5,0]],pruning)
            self.assertEqual((r.value,r.action),(5,0))
        self.assertEqual(impl.minimax([[5,6],[2,9]],True).leaves,3)
        self.assertEqual(impl.minimax([[5,6],[2,9]],False).leaves,4)
        with self.assertRaises(ValueError): impl.minimax([])

    def test_td_targets_and_terminal_vs_external_truncation(self):
        args=(.5,-.04,[4,1,-2,0],.2,.9)
        self.assertAlmostEqual(impl.td_update(*args),1.112)
        self.assertAlmostEqual(impl.td_update(*args,method='sarsa',next_action=1),.572)
        self.assertAlmostEqual(impl.td_update(.5,1,[],.2,.9,terminated=True),.6)
        self.assertAlmostEqual(impl.td_update(*args,truncated=True),1.112)
        with self.assertRaises(ValueError): impl.td_update(*args,method='unknown')

if __name__=='__main__': unittest.main()
