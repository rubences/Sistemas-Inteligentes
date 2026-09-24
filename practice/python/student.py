"""Implement these contracts yourself. Initial checks intentionally fail.

Use the dataclasses from reference.py for result shapes, not its algorithms.
"""
from reference import SearchResult, GameResult

def vacuum_action(location, dirty, visited):
    raise NotImplementedError('Unit 1: implement the agent policy')

def uniform_cost_search(graph, start, goal, max_expansions=10000):
    raise NotImplementedError('Unit 2: implement UCS')

def a_star(graph, start, goal, heuristic, max_expansions=10000):
    raise NotImplementedError('Unit 3: implement A* with reopening')

def solve_coloring(graph, colors):
    raise NotImplementedError('Unit 4: implement MRV and forward checking')

def minimax(tree, prune=True):
    raise NotImplementedError('Unit 5: implement minimax and alpha-beta')

def td_update(old,reward,next_values,alpha,gamma,method='q',next_action=0,terminated=False,truncated=False):
    raise NotImplementedError('Unit 6: implement the TD target')
