# Course project — Geared Loopover

Build and evaluate a solver for the **coupled 4 × 4** puzzle used in the course. The core project links Units 1–3. CSP, adversarial search and RL are separate models; any extension must explain which part of the problem changes.

## Exact model

The board contains each tile 0–15 once. Encode it row-major with two decimal digits per tile. The goal is:

```text
00010203040506070809101112131415
```

A legal action is `(row, column, sign)` with indices 0–3 and sign −1 or +1. There are 32 actions. One action costs 1 and performs **both phases**:

1. Shift the selected row cyclically by the sign: +1 right, −1 left.
2. On the resulting board, shift the selected **fixed-index** column: +1 down, −1 up.

The column index does not follow a moving tile. From the goal, action `(0,2,+1)` gives:

```text
03001402040501070809061112131015
```

The inverse transformation applies the inverse column shift **before** the inverse row shift. An opposite-sign action with row-first order is generally not the inverse. The reference `undo` method implements the inverse transformation for testing and generating solvable starts; it is not a claim that this transformation is itself one legal action.

## Milestones

| Milestone | Deliverable | Acceptance evidence |
|---|---|---|
| Model | Immutable state and validated action | Exact fixture, permutation invariant and parent unchanged |
| Baseline | Bounded BFS/UCS | Replayable path, correct cost, distinct cutoff status |
| Heuristic | Derivation and implementation | Lower-bound argument and small-instance checks |
| A* | Best-g tracking, stale-entry handling and reopening | Agreement with BFS on manageable cases |
| Experiment | Published instances and fixed budgets | Costs, expansions, elapsed time and memory evidence |
| Defence | Reproducible report and runnable code | Commands, interpretations and limitations |

The Java starter provides the model, BFS and contract tests. Implement `AStarExercise.solve` yourself. Compile all sources with a JDK 17+:

```sh
cd practice/java
javac *.java
java -ea LoopoverTest
java Loopover
```

## A first lower bound

A coupled action touches at most seven distinct positions: four in a row plus four in a column with one overlap. It can therefore repair at most seven misplaced tiles. `ceil(misplaced / 7)` is an admissible lower bound on remaining unit-cost actions. Derive stronger bounds carefully: adding two admissible bounds is not automatically admissible; their maximum is.

The space of all tile permutations is an upper bound of 16! states. Do not assume all permutations are reachable without a separate argument. A reverse breadth-first construction from the goal using `undo` yields solvable starts and known feasible paths, but scramble length need not equal optimal solution depth.

## Experimental protocol

Publish the exact initial-state strings and generation procedure. Include shallow cases where BFS can certify the optimum, and harder cases with explicit limits. Use identical instances and budgets across algorithms. Separate total expansion events from distinct states; report the tie-breaking rule, duplicate handling, hardware/runtime, elapsed time and how memory was measured. Repeat timing trials and state the aggregation method.

A cutoff is a censored run, not a successful solution and not proof of failure. Never silently exclude it from a comparison. Replaying every returned action sequence must reach the goal. Include at least one unsuccessful hypothesis about a heuristic or implementation.

## Proposed rubric

| Dimension | Weight |
|---|---:|
| Model and transition correctness | 20% |
| Search correctness | 25% |
| Heuristic reasoning | 20% |
| Experimental method | 20% |
| Explanation and reproducibility | 15% |

These are proposed teaching weights. The instructor confirms official assessment rules and submission arrangements.

## Optional learning extension

Define observations, actions, rewards, termination and external time limits explicitly. Compare a learned policy against a search baseline on held-out starting states. Report multiple seeds and failure rates. Reward shaping, training leakage and evaluation budgets must be discussed; successful training trajectories alone do not demonstrate generalisation.
