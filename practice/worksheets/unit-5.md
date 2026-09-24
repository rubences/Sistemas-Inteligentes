# Unit 5: Adversarial search

Evaluate strategic choices, search bounds and uncertain outcomes.

## Learning outcomes

- Back up minimax values under a fixed utility perspective.
- Trace alpha-beta bounds and safe tie handling.
- Explain depth cutoffs and evaluation errors.
- Calculate expected utility at chance nodes.

## A visible trace from leaves to the root

Open [the laboratory](../../materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html#15).

1. **Predict:** Which leaf value determines the root decision?
2. **Experiment:** Run minimax, then alpha-beta on the pruning and tie examples.
3. **Evidence:** Record backed-up values and label exact values versus upper bounds.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Search depth and feature weights change the choice

Open [the laboratory](../../materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html#22).

1. **Predict:** Can a shallow heuristic miss a forced win?
2. **Experiment:** Compare depth 1, depth 2 and exact move values.
3. **Evidence:** Record a changed action and explain why the heuristic score was misleading.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## The same tree, three exploration orders

Open [the laboratory](../../materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html#33).

1. **Predict:** How many leaves does ordering save on this tree?
2. **Experiment:** Run listed, strong and weak move orders.
3. **Evidence:** Verify equal root values and compare evaluated leaf counts.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Play against an exact minimax opponent

Open [the laboratory](../../materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html#39).

1. **Predict:** Can a human force a win against exact optimal O?
2. **Experiment:** Play several games and use best-move assistance to test a draw.
3. **Evidence:** Separate a mistake in play from a claim about the solved game value.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## A probability can reverse the selected action

Open [the laboratory](../../materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html#44).

1. **Predict:** At what probability is the risky action preferable?
2. **Experiment:** Compare p=0.5, the exact tie and p=0.75.
3. **Evidence:** Derive 16p−6 and solve the decision threshold against utility 4.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Submission checklist

- State the prediction you made before running the experiment.
- Record exact settings and random seeds where applicable.
- Include one observed trace or calculation.
- Explain one limitation of the conclusion.
- Run the matching Python exercise tests and record the result.

Your lecturer will specify the official submission channel and assessment rules.
