"""Small, readable reference implementations. Python 3.10+, no dependencies.

Read docs/PRACTICE.md for assumptions, contracts and extension experiments.
"""
from dataclasses import dataclass
from heapq import heappush, heappop
from itertools import count
from math import inf, isfinite

@dataclass
class SearchResult:
    status: str
    path: list
    cost: float
    expanded: int

@dataclass
class GameResult:
    value: float
    action: int | None
    leaves: int

def vacuum_action(location, dirty, visited):
    """Two-room, static-dirt world; visited denotes rooms already checked clean."""
    if location not in {'A','B'} or not set(visited) <= {'A','B'}:
        raise ValueError('Rooms must be A or B')
    if dirty: return 'SUCK'
    if set(visited) | {location} == {'A','B'}: return 'STOP'
    return 'RIGHT' if location == 'A' else 'LEFT'

def _search(graph, start, goal, heuristic, max_expansions):
    if not isinstance(max_expansions, int) or max_expansions < 0:
        raise ValueError('Use a nonnegative integer expansion budget')
    # Validate all supplied edges, including unreachable parts of the graph.
    for edges in graph.values():
        for _, cost in edges:
            if not isfinite(cost) or cost < 0: raise ValueError('Costs must be finite and nonnegative')
    def h(s):
        value = heuristic(s)
        if not isfinite(value) or value < 0: raise ValueError('Heuristics must be finite and nonnegative')
        return value
    if h(goal) != 0: raise ValueError('Goal heuristic must be zero')
    serial=count(); frontier=[]; best={start:0}; parent={start:None}; expanded=0
    heappush(frontier,(h(start),next(serial),0,start))
    while frontier:
        _,_,g,state=heappop(frontier)
        if g != best[state]: continue  # obsolete, more expensive entry
        if state == goal:
            path=[]; current=state
            while current is not None:
                path.append(current); current=parent[current]
            return SearchResult('SOLVED',list(reversed(path)),g,expanded)
        if expanded >= max_expansions: return SearchResult('CUTOFF',[],inf,expanded)
        expanded += 1
        for child,cost in graph.get(state,[]):
            new_g=g+cost
            if new_g < best.get(child,inf):
                best[child]=new_g; parent[child]=state
                heappush(frontier,(new_g+h(child),next(serial),new_g,child))
    return SearchResult('EXHAUSTED',[],inf,expanded)

def uniform_cost_search(graph, start, goal, max_expansions=10000):
    """Goal test on removal. Absent adjacency keys are treated as leaf nodes."""
    return _search(graph,start,goal,lambda _:0,max_expansions)

def a_star(graph, start, goal, heuristic, max_expansions=10000):
    """Best-g duplicate handling permits reopening. Caller must establish admissibility."""
    return _search(graph,start,goal,lambda s:heuristic[s],max_expansions)

def solve_coloring(graph, colors):
    """MRV + forward checking; asymmetric input edges are interpreted undirected."""
    nodes=list(dict.fromkeys(list(graph)+[n for ns in graph.values() for n in ns]))
    neighbors={v:set() for v in nodes}
    for a,ns in graph.items():
        for b in ns:
            if a == b: return None
            neighbors[a].add(b); neighbors[b].add(a)
    colors=list(dict.fromkeys(colors))
    def visit(assignment, domains):
        if len(assignment)==len(nodes): return assignment
        v=min((x for x in nodes if x not in assignment),key=lambda x:len(domains[x]))
        for color in domains[v]:
            if any(assignment.get(n)==color for n in neighbors[v]): continue
            next_domains={x:list(d) for x,d in domains.items()}
            for n in neighbors[v]:
                if n not in assignment and color in next_domains[n]: next_domains[n].remove(color)
            if any(not next_domains[n] for n in nodes if n not in assignment and n!=v): continue
            result=visit({**assignment,v:color},next_domains)
            if result is not None: return result
        return None
    return visit({}, {v:list(colors) for v in nodes})

def minimax(tree, prune=True):
    """Nested lists alternate MAX/MIN. Leaves are finite numbers; leftmost ties win."""
    def validate(node):
        if isinstance(node,(int,float)) and not isinstance(node,bool) and isfinite(node): return
        if not isinstance(node,list) or not node: raise ValueError('Use finite leaves and nonempty lists')
        for child in node: validate(child)
    validate(tree)
    leaves=0
    def visit(node,maximizing,alpha,beta):
        nonlocal leaves
        if isinstance(node,(int,float)):
            leaves+=1; return node,None
        value=-inf if maximizing else inf; action=None
        for i,child in enumerate(node):
            score,_=visit(child,not maximizing,alpha,beta)
            if action is None or (score>value if maximizing else score<value): value,action=score,i
            if maximizing: alpha=max(alpha,value)
            else: beta=min(beta,value)
            if prune and alpha>=beta: break
        return value,action
    value,action=visit(tree,True,-inf,inf)
    return GameResult(value,action,leaves)

def td_update(old,reward,next_values,alpha,gamma,method='q',next_action=0,terminated=False,truncated=False):
    """External time-limit truncation bootstraps; true task termination does not.

    Q-learning uses max next Q; SARSA uses the selected next action. A finite
    horizon that is part of the task must be represented in the state instead.
    """
    if method not in {'q','sarsa'}: raise ValueError('Use q or sarsa')
    if not (0<=alpha<=1 and 0<=gamma<=1): raise ValueError('Alpha and gamma must lie in [0,1]')
    if not all(isfinite(v) for v in [old,reward,*next_values]): raise ValueError('Values must be finite')
    continuation=0
    if not terminated:
        if not next_values: raise ValueError('Nonterminal states need next-action values')
        if method=='q': continuation=max(next_values)
        else:
            if not isinstance(next_action,int) or not 0<=next_action<len(next_values): raise ValueError('Invalid next action')
            continuation=next_values[next_action]
    return old+alpha*(reward+gamma*continuation-old)
