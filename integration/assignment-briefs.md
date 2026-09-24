# Challenge assignment briefs

All work and reflection should be written in English. Suggested formative criteria follow each brief. The instructor sets official deadlines, weighting and submission rules.

## u1-foundation: Specify the agent

Estimated time: 20 minutes.

Create a PEAS description for a campus delivery robot. Identify one hidden state and one stochastic outcome.

**Deliverable:** A PEAS table, two environment assumptions and a justified agent architecture.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u1-applied: Repair the vacuum policy

Estimated time: 45 minutes.

Implement the two-room policy. Trace a dirty room, an unvisited clean room and the stopping condition.

**Deliverable:** A three-case trace, passing checks and an explanation of the memory state.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u1-extension: Break the assumptions

Estimated time: 75 minutes.

Construct a dirt-reappearing environment where stopping fails. Propose a memory expiry or inspection policy.

**Deliverable:** A reproducible failure trace, revised performance measure and policy comparison.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u2-foundation: Trace the frontier

Estimated time: 20 minutes.

Trace BFS and UCS on S→G:10, S→A:1, A→G:2. State when the goal is tested.

**Deliverable:** Frontier contents at each removal and both path costs.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u2-applied: Implement a reliable baseline

Estimated time: 45 minutes.

Complete UCS with best-g tracking, stale-entry removal and an expansion limit. Test start=goal and unreachable goals.

**Deliverable:** Code, an edge case and distinct SOLVED/EXHAUSTED/CUTOFF outcomes.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u2-extension: Measure search growth

Estimated time: 75 minutes.

Create five shared instances of increasing depth. Compare BFS and UCS with identical budgets.

**Deliverable:** Published instances, expansion counts, costs and an account of all cutoff runs.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u3-foundation: Audit a heuristic

Estimated time: 20 minutes.

For the reopening example, compute h*(S), h*(A), h*(B), h*(G). Check every consistency inequality.

**Deliverable:** A true-distance table and the exact edge that violates consistency.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u3-applied: Implement reopening

Estimated time: 45 minutes.

Complete A* and reproduce the cost-4 solution after improving an already expanded A.

**Deliverable:** Frontier trace, path replay and an explanation of the stale-entry check.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u3-extension: Design and defend a bound

Estimated time: 75 minutes.

Derive a Loopover lower bound. Compare it with ceil(misplaced/7) on shallow instances certified by BFS.

**Deliverable:** An admissibility argument, counterexample search and controlled measurements.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u4-foundation: Separate local and global reasoning

Estimated time: 20 minutes.

Show why a two-colour triangle is arc-consistent yet unsatisfiable.

**Deliverable:** Support for each value on each arc and a global contradiction.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u4-applied: Solve and explain

Estimated time: 45 minutes.

Implement MRV with forward checking for graph colouring. Compare a triangle with two and three colours.

**Deliverable:** Complete assignment or failure proof by search, plus domains after each decision.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u4-extension: Compare propagation

Estimated time: 75 minutes.

Add AC-3 and compare its domain deletions and search decisions against forward checking.

**Deliverable:** Identical networks, explicit effort metrics and one case where propagation pays off.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u5-foundation: Trace exact values and bounds

Estimated time: 20 minutes.

Annotate minimax and alpha–beta on [[5,6],[2,9]]. Identify what can be pruned.

**Deliverable:** Root decision, leaf count and exact-versus-bound labels.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u5-applied: Implement stable decisions

Estimated time: 45 minutes.

Complete minimax with optional pruning and leftmost tie handling. Compare both modes on multiple trees.

**Deliverable:** Matching root values and actions, with a trace for a tied bound.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u5-extension: Investigate move ordering

Estimated time: 75 minutes.

Reorder the same game tree without changing utilities and compare leaf evaluations.

**Deliverable:** Original and reordered trees, preserved root value and explained differences.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u6-foundation: Calculate targets

Estimated time: 20 minutes.

Compute Q-learning and SARSA updates for the worked example and a true terminal transition.

**Deliverable:** Numerical calculations and a clear bootstrap decision for each case.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u6-applied: Separate learning and evaluation

Estimated time: 45 minutes.

Use the comparison tool to train Q-learning and SARSA under the same seeds and budgets.

**Deliverable:** Mean and standard deviation of frozen-policy returns, success rate and cutoffs.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

## u6-extension: Investigate reward and generalisation

Estimated time: 75 minutes.

Change reward design or exploration and evaluate on held-out starts with at least five seeds.

**Deliverable:** Hypothesis, fixed protocol, dispersion and a discussion of reward exploitation or leakage.

- Model and assumptions (25%): Define the instance, objective and conditions under which the claim holds.
- Correctness and reasoning (35%): Use a replayable trace, derivation or verified implementation.
- Experimental evidence (25%): Publish settings and a controlled comparison, including failed cases.
- Explanation and limits (15%): Connect observations to the model and state a limitation.

Submit an evidence report exported from the campus, plus source code and data when the brief requires them. State the settings, limits, results and one limitation of your conclusion.

