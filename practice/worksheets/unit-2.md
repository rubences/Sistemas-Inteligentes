# Unit 2: Problem solving and search

Choose a frontier discipline and explain what it guarantees.

## Learning outcomes

- Define states, actions, goal and path cost.
- Trace BFS, DFS and uniform-cost search.
- Separate failure from a depth or resource cutoff.
- Validate a search result against the transition model.

## One graph, three search strategies

Open [the laboratory](../../materials/lectures/UCLM_Unit2_Problem_Solving_Search_EN.html#15).

1. **Predict:** Will the first goal found have minimum cost?
2. **Experiment:** Run BFS, DFS and UCS on the same graph.
3. **Evidence:** Compare returned path, path cost and expansion order.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## How quickly does a tree grow?

Open [the laboratory](../../materials/lectures/UCLM_Unit2_Problem_Solving_Search_EN.html#18).

1. **Predict:** What happens when depth increases by one?
2. **Experiment:** Vary branching factor and depth while watching the counts.
3. **Evidence:** Calculate one tree size independently and estimate its memory requirement.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## A depth limit you can change

Open [the laboratory](../../materials/lectures/UCLM_Unit2_Problem_Solving_Search_EN.html#27).

1. **Predict:** Does a depth cutoff prove that no solution exists?
2. **Experiment:** Move the depth limit below and above the goal depth.
3. **Evidence:** Explain success, cutoff and failure using the explored tree.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## A coin-change solver you can inspect

Open [the laboratory](../../materials/lectures/UCLM_Unit2_Problem_Solving_Search_EN.html#37).

1. **Predict:** Why must remaining inventory be part of the state?
2. **Experiment:** Solve several coin targets, including an unreachable one.
3. **Evidence:** Record a legal optimal combination and explain why amount alone is insufficient.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Submission checklist

- State the prediction you made before running the experiment.
- Record exact settings and random seeds where applicable.
- Include one observed trace or calculation.
- Explain one limitation of the conclusion.
- Run the matching Python exercise tests and record the result.

Your lecturer will specify the official submission channel and assessment rules.
