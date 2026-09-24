# Unit 6: Reinforcement learning

Connect reward design, Bellman backups, exploration and evaluation.

## Learning outcomes

- Define an MDP and its return objective.
- Compare model backups with sampled updates.
- Calculate TD, Q-learning and SARSA updates.
- Evaluate a frozen policy and handle episode endings correctly.

## Discounting can change the preferred trajectory

Open [the laboratory](../../materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html#12).

1. **Predict:** When does patience become better than the quick payoff?
2. **Experiment:** Compare γ=0, γ=0.9 and the exact tie.
3. **Evidence:** Derive −1−γ+5γ² and explain the discount threshold.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Watch values spread through the grid

Open [the laboratory](../../materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html#21).

1. **Predict:** How do useful values reach the start cell?
2. **Experiment:** Run one sweep at a time, then compare deterministic and noisy motion.
3. **Evidence:** Record the start value and residual; explain the terminal reward convention.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Compare three one-step update targets

Open [the laboratory](../../materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html#31).

1. **Predict:** Why do the three targets differ?
2. **Experiment:** Change the selected next action, then compare termination and truncation.
3. **Evidence:** Calculate all default updates and state which continuation each uses.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Explore three actions with unknown reward rates

Open [the laboratory](../../materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html#33).

1. **Predict:** Can a greedy agent remain stuck on an early preference?
2. **Experiment:** Compare ε=0 and ε=0.1 with the same seed and pull budget.
3. **Evidence:** Report counts and expected regret, then repeat with a second seed.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Train a policy from sampled gridworld experience

Open [the laboratory](../../materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html#37).

1. **Predict:** Does training return measure the deployed greedy policy?
2. **Experiment:** Train for 100 and 1,000 episodes, then run frozen evaluation.
3. **Evidence:** Report algorithm, seed, motion, budget, goals, failures, caps and mean return.

Record your settings, observations and explanation. Attach a screenshot or a trace where helpful. A result without its conditions cannot be reproduced.

## Submission checklist

- State the prediction you made before running the experiment.
- Record exact settings and random seeds where applicable.
- Include one observed trace or calculation.
- Explain one limitation of the conclusion.
- Run the matching Python exercise tests and record the result.

Your lecturer will specify the official submission channel and assessment rules.
