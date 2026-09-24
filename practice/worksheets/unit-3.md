# Unit 3: Informed search

Use estimates to reduce work while checking the conditions for optimality.

## Learning outcomes

- Distinguish greedy search from A*.
- Check admissibility and consistency.
- Explain why improved paths may need reopening.
- Derive a lower bound for a coupled Loopover action.

## UCS, Greedy and A* in action

Open [the laboratory](../../materials/lectures/UCLM_Unit3_Informed_Search_EN.html#9).

1. **Predict:** Can greedy search expand fewer nodes but return a worse path?
2. **Experiment:** Run UCS, Greedy and A* from a reset state.
3. **Evidence:** Compare cost and expansions, with one explanation of the observed difference.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## An interactive heuristic check

Open [the laboratory](../../materials/lectures/UCLM_Unit3_Informed_Search_EN.html#18).

1. **Predict:** Can an admissible heuristic still be inconsistent?
2. **Experiment:** Edit heuristic values and inspect the edge checks.
3. **Evidence:** Give a concrete violating edge and show both inequalities.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Reopening changes the returned answer

Open [the laboratory](../../materials/lectures/UCLM_Unit3_Informed_Search_EN.html#20).

1. **Predict:** What happens if an improved closed state is never reopened?
2. **Experiment:** Run the example with reopening enabled and disabled.
3. **Evidence:** Record the two results and identify the improved path.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Move a tile and inspect both heuristics

Open [the laboratory](../../materials/lectures/UCLM_Unit3_Informed_Search_EN.html#28).

1. **Predict:** Which heuristic changes after moving one tile?
2. **Experiment:** Use the near-goal and goal presets and make legal moves.
3. **Evidence:** Calculate misplaced tiles and Manhattan distance for one board.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## A live Loopover heuristic laboratory

Open [the laboratory](../../materials/lectures/UCLM_Unit3_Informed_Search_EN.html#42).

1. **Predict:** How much can a single coupled move change?
2. **Experiment:** Choose a Loopover preset and apply a complete action.
3. **Evidence:** Justify a lower bound in units of coupled actions, then undo and verify restoration.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Submission checklist

- State the prediction you made before running the experiment.
- Record exact settings and random seeds where applicable.
- Include one observed trace or calculation.
- Explain one limitation of the conclusion.
- Run the matching Python exercise tests and record the result.

Your lecturer will specify the official submission channel and assessment rules.
