# Programming laboratory contracts

Python 3.10+; standard library only. All inputs below are finite, and states are hashable non-`None` values. Use strings for room names, colours and graph nodes in the supplied exercises.

From the repository root:

```sh
python -m unittest discover -s practice/python -v
python practice/python/check_student.py
```

The first command tests the working reference. The second tests your `student.py` and intentionally fails at first. Both use the same behavioural cases. Inspect a failing assertion before opening the reference solution.

## Unit 1 — Agent policy

Implement `vacuum_action(location, dirty, visited)`. Rooms are `A` and `B`; `visited` records rooms already checked clean. In this **static-dirt** world, choose `SUCK` when dirty; `STOP` when both rooms have been checked clean; otherwise `RIGHT` from A or `LEFT` from B. Invalid room identifiers raise `ValueError`.

Explain why this memory is insufficient if new dirt can appear. Extension: replace the stopping rule with a periodic inspection policy and redefine the performance measure.

## Unit 2 — Uniform-cost search

`uniform_cost_search(graph,start,goal,max_expansions=10000)` receives an adjacency dictionary of `(successor,cost)` pairs. Missing adjacency keys are leaf nodes. Costs must be finite and nonnegative. Return `SearchResult(status,path,cost,expanded)`.

- `SOLVED`: includes start and goal in the replayable state path; cost is the sum of edge costs.
- `EXHAUSTED`: the reachable frontier is empty; path is empty and cost is infinity.
- `CUTOFF`: the expansion budget prevented completion; it is not a proof of unsolvability.

Test the goal when removing the cheapest valid entry. Stale entries do not count as expansions; expanding means generating a non-goal state's successors. With a zero budget, start=goal still succeeds. Reject negative budgets and invalid edge costs.

Extension: construct an example where BFS finds a more expensive solution than UCS.

## Unit 3 — A* with reopening

`a_star(graph,start,goal,heuristic,max_expansions=10000)` has the same result contract. `heuristic` maps every needed state to a finite, nonnegative value; require zero at the goal. Track the best discovered g-value, ignore stale heap entries and reopen when a cheaper path is found. Use a serial tie-breaker so heap ordering never requires comparing arbitrary state objects.

For optimality on this finite graph, establish admissibility. The implementation checks numeric validity, **not** admissibility. Test this inconsistent but admissible example:

```text
S→A: 3, S→B: 1, B→A: 1, A→G: 2, B→G: 100
h(S)=4, h(A)=0, h(B)=3, h(G)=0
```

The optimum is `S,B,A,G`, cost 4. Explain why forbidding reopening can return cost 5. Extension: log both unique expanded states and total expansion events.

## Unit 4 — Constraint satisfaction

`solve_coloring(graph,colors)` returns a complete colour assignment or `None` when unsatisfiable. Neighbour constraints are undirected even if supplied only once. The empty graph returns `{}`; a self-loop makes the instance unsatisfiable.

Use minimum remaining values (MRV), retain input order for ties and forward-check neighbours after each assignment. A triangle needs three colours. Extension: add AC-3 and compare pruning effort against avoided search on a fixed set of instances. Distinguish forward checking from full arc consistency.

## Unit 5 — Adversarial search

`minimax(tree,prune=True)` accepts nonempty nested lists with finite numeric leaves. The root is MAX; levels alternate MAX/MIN. Return `GameResult(value,action,leaves)`, where action is the root child's index (or `None` for a leaf). Preserve the leftmost optimal action using strict improvements.

With pruning enabled, stop when α ≥ β. Preserve the minimax root value; do not treat every returned cutoff value as an exact interior-node value. Leaf count reports evaluated utilities, excluding structural validation. Extension: change move order and measure evaluated leaves while preserving the root value.

## Unit 6 — TD targets

`td_update(old,reward,next_values,alpha,gamma,method='q',next_action=0,terminated=False,truncated=False)` returns one updated action value. Require α and γ in [0,1].

- Q-learning continuation: maximum next-action value.
- SARSA continuation: value of the selected `next_action`.
- True termination: continuation is zero.
- An **external** time-limit truncation: retain the continuation value.

For old=0.5, reward=−0.04, next values=[4,1,−2,0], α=0.2 and γ=0.9, Q-learning yields **1.112**; SARSA with next action 1 yields **0.572**. A horizon that defines the task itself requires time in the state and the correct terminal condition. Extension: compare several exploration seeds and report dispersion rather than one lucky run.

## Evidence to submit

Use your instructor's submission channel. Include your code, test command and output, one new edge case, a prediction-versus-result comparison and a short account of the assumptions behind any correctness claim. Passing a finite test suite is evidence, not a general proof.
