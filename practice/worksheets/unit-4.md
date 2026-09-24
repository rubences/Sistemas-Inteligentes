# Unit 4: Constraint satisfaction

Build a constraint model and inspect the effect of propagation.

## Learning outcomes

- Separate variables, domains and constraints.
- Trace backtracking with MRV and LCV.
- Explain AC-3 and the limits of local consistency.
- Compare global propagation with local repair.

## Colour the graph and inspect the domains

Open [the laboratory](../../materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html#10).

1. **Predict:** Which domains shrink after colouring one region?
2. **Experiment:** Assign adjacent and nonadjacent regions and inspect domains.
3. **Evidence:** Save a consistent partial colouring and identify one forbidden colour.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Watch assignment, pruning and restoration

Open [the laboratory](../../materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html#16).

1. **Predict:** Where does ordering reduce branching?
2. **Experiment:** Compare fixed order with MRV, keeping inference settings controlled.
3. **Evidence:** Record assignments and backtracks; explain one difference.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Follow the AC-3 queue

Open [the laboratory](../../materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html#27).

1. **Predict:** Can every arc have support while the CSP is unsatisfiable?
2. **Experiment:** Run the chain and two-colour triangle presets to completion.
3. **Evidence:** Explain the queue changes and distinguish local support from a global solution.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Compare binary and global propagation

Open [the laboratory](../../materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html#33).

1. **Predict:** Does pairwise inequality capture every AllDifferent inference?
2. **Experiment:** Run binary and global propagation on the same preset.
3. **Evidence:** Identify a value pruned only by the global constraint and explain why.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Repair an eight-queen board

Open [the laboratory](../../materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html#40).

1. **Predict:** Does a fixed iteration budget guarantee a solution?
2. **Experiment:** Run min-conflicts with several seeds and the same budget.
3. **Evidence:** Report attacks remaining, successful runs and failures without discarding seeds.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Submission checklist

- State the prediction you made before running the experiment.
- Record exact settings and random seeds where applicable.
- Include one observed trace or calculation.
- Explain one limitation of the conclusion.
- Run the matching Python exercise tests and record the result.

Your lecturer will specify the official submission channel and assessment rules.
