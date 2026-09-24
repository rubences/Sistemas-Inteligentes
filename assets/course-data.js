/* Course metadata. All paths are relative to index.html. */
const COURSE = {
  "version": 1,
  "title": "Intelligent Systems",
  "institution": "Universidad de Castilla-La Mancha",
  "teacher": "Rubén Juárez Cádiz",
  "academicYear": "2026/2027",
  "units": [
    {
      "id": 1,
      "title": "Intelligent agents",
      "subtitle": "Perception, action and the environment",
      "summary": "Describe an agent precisely before choosing how it should behave.",
      "outcomes": [
        "Specify PEAS for a concrete task.",
        "Distinguish rationality from omniscience.",
        "Explain how memory changes behaviour.",
        "Model the geared Loopover transition correctly."
      ],
      "tags": [
        "PEAS",
        "rationality",
        "environment",
        "memory"
      ],
      "slides": 48,
      "cover": "assets/unit-1.jpg",
      "deck": "materials/lectures/UCLM_Unit1_Intelligent_Agents_EN.html",
      "pdf": "materials/pdf/UCLM_Unit1_Intelligent_Agents_EN.pdf",
      "original": "materials/originals/Unit1_Original.pptx",
      "worksheet": "practice/worksheets/unit-1.md",
      "labs": [
        "u1-l1",
        "u1-l2",
        "u1-l3",
        "u1-l4"
      ],
      "quiz": [
        {
          "id": "u1q1",
          "question": "A rational agent chooses actions using…",
          "options": [
            "the actual future outcome",
            "available percepts, knowledge and expected performance",
            "a guarantee of success"
          ],
          "answer": 1,
          "explanation": "Rationality concerns the information and objective available when the decision is made."
        },
        {
          "id": "u1q2",
          "question": "Which PEAS component describes what the agent can observe?",
          "options": [
            "Actuators",
            "Performance measure",
            "Sensors"
          ],
          "answer": 2,
          "explanation": "Sensors provide observations. Actuators change the environment."
        },
        {
          "id": "u1q3",
          "question": "A partially observable environment may require…",
          "options": [
            "memory or a belief about hidden state",
            "only the most recent percept in every task",
            "a deterministic transition model"
          ],
          "answer": 0,
          "explanation": "The latest observation can omit information that matters for the next decision."
        },
        {
          "id": "u1q4",
          "question": "A stochastic environment means…",
          "options": [
            "the agent is always irrational",
            "the same state-action pair can have different outcomes",
            "the goal changes after every action"
          ],
          "answer": 1,
          "explanation": "Stochasticity concerns transition outcomes, not the quality of the agent."
        },
        {
          "id": "u1q5",
          "question": "In geared Loopover, one action is…",
          "options": [
            "a row shift followed by a column shift",
            "either a row shift or a column shift, chosen independently",
            "a swap of any two tiles"
          ],
          "answer": 0,
          "explanation": "The course model couples both phases into one unit-cost action."
        },
        {
          "id": "u1q6",
          "question": "A performance measure should evaluate…",
          "options": [
            "only the number of actions executed",
            "whether the intended task objective is achieved",
            "whether the implementation uses AI terminology"
          ],
          "answer": 1,
          "explanation": "The measure should capture what successful behaviour means for the task."
        }
      ],
      "agenda": [
        {
          "title": "Retrieve and predict",
          "minutes": 10,
          "slide": 2,
          "instruction": "Ask students to explain what they already know. Collect a prediction before revealing the example."
        },
        {
          "title": "Build the model",
          "minutes": 20,
          "slide": 4,
          "instruction": "Specify PEAS for a concrete task."
        },
        {
          "title": "Experiment together",
          "minutes": 20,
          "slide": 11,
          "instruction": "Run both policies from the same starting world."
        },
        {
          "title": "Produce evidence",
          "minutes": 20,
          "slide": 38,
          "instruction": "Record the initial, intermediate and final states; explain operation order."
        },
        {
          "title": "Explain and check",
          "minutes": 10,
          "slide": 46,
          "instruction": "Use the six-question campus check. Ask students to explain one incorrect alternative."
        }
      ]
    },
    {
      "id": 2,
      "title": "Problem solving and search",
      "subtitle": "From a state space to a verified solution",
      "summary": "Choose a frontier discipline and explain what it guarantees.",
      "outcomes": [
        "Define states, actions, goal and path cost.",
        "Trace BFS, DFS and uniform-cost search.",
        "Separate failure from a depth or resource cutoff.",
        "Validate a search result against the transition model."
      ],
      "tags": [
        "BFS",
        "DFS",
        "UCS",
        "complexity"
      ],
      "slides": 53,
      "cover": "assets/unit-2.jpg",
      "deck": "materials/lectures/UCLM_Unit2_Problem_Solving_Search_EN.html",
      "pdf": "materials/pdf/UCLM_Unit2_Problem_Solving_Search_EN.pdf",
      "original": "materials/originals/Unit2_Original.pptx",
      "worksheet": "practice/worksheets/unit-2.md",
      "labs": [
        "u2-l1",
        "u2-l2",
        "u2-l3",
        "u2-l4"
      ],
      "quiz": [
        {
          "id": "u2q1",
          "question": "BFS returns a least-cost path when…",
          "options": [
            "step costs are equal and nonnegative",
            "the deepest node is always best",
            "the graph contains no repeated states"
          ],
          "answer": 0,
          "explanation": "BFS minimizes depth. Equal step costs align depth with path cost."
        },
        {
          "id": "u2q2",
          "question": "Uniform-cost search prioritizes…",
          "options": [
            "estimated remaining cost h",
            "lowest accumulated path cost g",
            "largest branching factor"
          ],
          "answer": 1,
          "explanation": "UCS orders the frontier by the cost already paid."
        },
        {
          "id": "u2q3",
          "question": "A depth-limited cutoff means…",
          "options": [
            "the problem is unsatisfiable",
            "the goal is already found",
            "the current limit prevented complete exploration"
          ],
          "answer": 2,
          "explanation": "A deeper search may still find a solution."
        },
        {
          "id": "u2q4",
          "question": "With branching factor 3 and depth 2, a full tree contains…",
          "options": [
            "9 nodes",
            "13 nodes",
            "6 nodes"
          ],
          "answer": 1,
          "explanation": "There are 1+3+9=13 nodes including the root."
        },
        {
          "id": "u2q5",
          "question": "For finite coin inventories, a state must distinguish…",
          "options": [
            "only the current monetary amount",
            "the amount and remaining inventory",
            "only the last coin selected"
          ],
          "answer": 1,
          "explanation": "The remaining coins determine which future actions are legal."
        },
        {
          "id": "u2q6",
          "question": "A search hits its configured node budget. Report…",
          "options": [
            "cutoff / budget exhausted",
            "proved unsolvable",
            "optimal failure"
          ],
          "answer": 0,
          "explanation": "A resource cap is not a proof that no solution exists."
        }
      ],
      "agenda": [
        {
          "title": "Retrieve and predict",
          "minutes": 10,
          "slide": 2,
          "instruction": "Ask students to explain what they already know. Collect a prediction before revealing the example."
        },
        {
          "title": "Build the model",
          "minutes": 20,
          "slide": 4,
          "instruction": "Define states, actions, goal and path cost."
        },
        {
          "title": "Experiment together",
          "minutes": 20,
          "slide": 15,
          "instruction": "Run BFS, DFS and UCS on the same graph."
        },
        {
          "title": "Produce evidence",
          "minutes": 20,
          "slide": 37,
          "instruction": "Record a legal optimal combination and explain why amount alone is insufficient."
        },
        {
          "title": "Explain and check",
          "minutes": 10,
          "slide": 51,
          "instruction": "Use the six-question campus check. Ask students to explain one incorrect alternative."
        }
      ]
    },
    {
      "id": 3,
      "title": "Informed search",
      "subtitle": "Heuristics with evidence behind them",
      "summary": "Use estimates to reduce work while checking the conditions for optimality.",
      "outcomes": [
        "Distinguish greedy search from A*.",
        "Check admissibility and consistency.",
        "Explain why improved paths may need reopening.",
        "Derive a lower bound for a coupled Loopover action."
      ],
      "tags": [
        "A*",
        "heuristics",
        "reopening",
        "Loopover"
      ],
      "slides": 60,
      "cover": "assets/unit-3.jpg",
      "deck": "materials/lectures/UCLM_Unit3_Informed_Search_EN.html",
      "pdf": "materials/pdf/UCLM_Unit3_Informed_Search_EN.pdf",
      "original": "materials/originals/Unit3_Original.pptx",
      "worksheet": "practice/worksheets/unit-3.md",
      "labs": [
        "u3-l1",
        "u3-l2",
        "u3-l3",
        "u3-l4",
        "u3-l5"
      ],
      "quiz": [
        {
          "id": "u3q1",
          "question": "A* normally orders the frontier using…",
          "options": [
            "h only",
            "g+h",
            "g−h"
          ],
          "answer": 1,
          "explanation": "A* combines cost paid with an estimate of cost remaining."
        },
        {
          "id": "u3q2",
          "question": "An admissible heuristic satisfies…",
          "options": [
            "h(s)≤h*(s)",
            "h(s)≥h*(s)",
            "h(s)=g(s)"
          ],
          "answer": 0,
          "explanation": "It never overestimates the optimal remaining cost."
        },
        {
          "id": "u3q3",
          "question": "Consistency requires, on each edge s→s′,…",
          "options": [
            "h(s)≤c(s,a,s′)+h(s′)",
            "h(s)=h(s′)",
            "g(s)≤h(s′)"
          ],
          "answer": 0,
          "explanation": "This local inequality prevents f from decreasing along a path."
        },
        {
          "id": "u3q4",
          "question": "With an inconsistent heuristic, graph A* may need…",
          "options": [
            "to ignore cheaper paths to closed states",
            "to reopen a state when a better g is found",
            "to replace all costs with one"
          ],
          "answer": 1,
          "explanation": "Reopening allows the improved path to propagate to successors."
        },
        {
          "id": "u3q5",
          "question": "A single geared move affects seven distinct positions. A lower bound based on m misplaced tiles is…",
          "options": [
            "m",
            "ceil(m/7)",
            "7m"
          ],
          "answer": 1,
          "explanation": "One action can correct at most seven misplaced positions."
        },
        {
          "id": "u3q6",
          "question": "Does greedy best-first search guarantee a least-cost path?",
          "options": [
            "Yes, for any heuristic",
            "No, h alone ignores cost already paid",
            "Yes, if it expands fewer states"
          ],
          "answer": 1,
          "explanation": "Expansion count alone does not establish path optimality."
        }
      ],
      "agenda": [
        {
          "title": "Retrieve and predict",
          "minutes": 10,
          "slide": 2,
          "instruction": "Ask students to explain what they already know. Collect a prediction before revealing the example."
        },
        {
          "title": "Build the model",
          "minutes": 20,
          "slide": 4,
          "instruction": "Distinguish greedy search from A*."
        },
        {
          "title": "Experiment together",
          "minutes": 20,
          "slide": 9,
          "instruction": "Run UCS, Greedy and A* from a reset state."
        },
        {
          "title": "Produce evidence",
          "minutes": 20,
          "slide": 42,
          "instruction": "Justify a lower bound in units of coupled actions, then undo and verify restoration."
        },
        {
          "title": "Explain and check",
          "minutes": 10,
          "slide": 58,
          "instruction": "Use the six-question campus check. Ask students to explain one incorrect alternative."
        }
      ]
    },
    {
      "id": 4,
      "title": "Constraint satisfaction",
      "subtitle": "Reduce possibilities before committing",
      "summary": "Build a constraint model and inspect the effect of propagation.",
      "outcomes": [
        "Separate variables, domains and constraints.",
        "Trace backtracking with MRV and LCV.",
        "Explain AC-3 and the limits of local consistency.",
        "Compare global propagation with local repair."
      ],
      "tags": [
        "CSP",
        "AC-3",
        "MRV",
        "min-conflicts"
      ],
      "slides": 54,
      "cover": "assets/unit-4.jpg",
      "deck": "materials/lectures/UCLM_Unit4_Constraint_Satisfaction_EN.html",
      "pdf": "materials/pdf/UCLM_Unit4_Constraint_Satisfaction_EN.pdf",
      "original": "materials/originals/Unit4_Original.pptx",
      "worksheet": "practice/worksheets/unit-4.md",
      "labs": [
        "u4-l1",
        "u4-l2",
        "u4-l3",
        "u4-l4",
        "u4-l5"
      ],
      "quiz": [
        {
          "id": "u4q1",
          "question": "A CSP consists of…",
          "options": [
            "variables, domains and constraints",
            "a neural policy only",
            "a frontier with one fixed cost"
          ],
          "answer": 0,
          "explanation": "The model defines values each variable may take and which combinations are allowed."
        },
        {
          "id": "u4q2",
          "question": "MRV chooses the variable with…",
          "options": [
            "most remaining values",
            "fewest remaining legal values",
            "largest name alphabetically"
          ],
          "answer": 1,
          "explanation": "MRV focuses on the most constrained current choice."
        },
        {
          "id": "u4q3",
          "question": "LCV prefers a value that…",
          "options": [
            "removes fewer options from other variables",
            "always has the smallest numeric value",
            "maximizes constraint violations"
          ],
          "answer": 0,
          "explanation": "LCV preserves flexibility for later choices."
        },
        {
          "id": "u4q4",
          "question": "AC-3 reaches arc consistency. This implies…",
          "options": [
            "a solution must exist",
            "each remaining value has local support on each relevant arc",
            "every variable has one value"
          ],
          "answer": 1,
          "explanation": "Local support does not guarantee a jointly consistent global assignment."
        },
        {
          "id": "u4q5",
          "question": "Three mutually adjacent variables with two colours are…",
          "options": [
            "satisfiable",
            "unsatisfiable even though initial binary arcs can be consistent",
            "always solved by a single AC-3 revision"
          ],
          "answer": 1,
          "explanation": "Each pair has support, but a triangle needs a third colour."
        },
        {
          "id": "u4q6",
          "question": "Min-conflicts reaches its step budget with one attack. Report…",
          "options": [
            "a valid solution",
            "an incomplete run with one conflict remaining",
            "proof that eight queens has no solution"
          ],
          "answer": 1,
          "explanation": "The budgeted local search did not find a solution in this run."
        }
      ],
      "agenda": [
        {
          "title": "Retrieve and predict",
          "minutes": 10,
          "slide": 2,
          "instruction": "Ask students to explain what they already know. Collect a prediction before revealing the example."
        },
        {
          "title": "Build the model",
          "minutes": 20,
          "slide": 4,
          "instruction": "Separate variables, domains and constraints."
        },
        {
          "title": "Experiment together",
          "minutes": 20,
          "slide": 10,
          "instruction": "Assign adjacent and nonadjacent regions and inspect domains."
        },
        {
          "title": "Produce evidence",
          "minutes": 20,
          "slide": 40,
          "instruction": "Report attacks remaining, successful runs and failures without discarding seeds."
        },
        {
          "title": "Explain and check",
          "minutes": 10,
          "slide": 52,
          "instruction": "Use the six-question campus check. Ask students to explain one incorrect alternative."
        }
      ]
    },
    {
      "id": 5,
      "title": "Adversarial search",
      "subtitle": "A decision must survive a reply",
      "summary": "Evaluate strategic choices, search bounds and uncertain outcomes.",
      "outcomes": [
        "Back up minimax values under a fixed utility perspective.",
        "Trace alpha-beta bounds and safe tie handling.",
        "Explain depth cutoffs and evaluation errors.",
        "Calculate expected utility at chance nodes."
      ],
      "tags": [
        "minimax",
        "alpha-beta",
        "evaluation",
        "chance"
      ],
      "slides": 60,
      "cover": "assets/unit-5.jpg",
      "deck": "materials/lectures/UCLM_Unit5_Adversarial_Search_EN.html",
      "pdf": "materials/pdf/UCLM_Unit5_Adversarial_Search_EN.pdf",
      "original": "materials/originals/Unit5_Original.pptx",
      "worksheet": "practice/worksheets/unit-5.md",
      "labs": [
        "u5-l1",
        "u5-l2",
        "u5-l3",
        "u5-l4",
        "u5-l5"
      ],
      "quiz": [
        {
          "id": "u5q1",
          "question": "A MAX root has MIN children with leaves [4,7] and [6,1]. Its value is…",
          "options": [
            "7",
            "4",
            "1"
          ],
          "answer": 1,
          "explanation": "MIN values are 4 and 1. MAX selects 4."
        },
        {
          "id": "u5q2",
          "question": "Alpha-beta pruning preserves…",
          "options": [
            "the minimax root value under the same complete search model",
            "every internal value as exact",
            "the number of leaves visited"
          ],
          "answer": 0,
          "explanation": "A cut-off subtree may supply a bound while the root decision remains correct."
        },
        {
          "id": "u5q3",
          "question": "A terminal state should use…",
          "options": [
            "a heuristic before checking the winner",
            "exact terminal utility",
            "the value zero in every game"
          ],
          "answer": 1,
          "explanation": "Terminal outcomes must take precedence over nonterminal evaluation."
        },
        {
          "id": "u5q4",
          "question": "A cut-off MIN node returns an upper bound equal to the current best root value. It…",
          "options": [
            "proves that candidate ties the best action",
            "may hide a worse true value",
            "must replace the earlier root action"
          ],
          "answer": 1,
          "explanation": "An equal upper bound is not an exact-value tie."
        },
        {
          "id": "u5q5",
          "question": "Risk gives +10 with probability p and −6 otherwise. Expected utility is…",
          "options": [
            "4p",
            "16p−6",
            "10p−6"
          ],
          "answer": 1,
          "explanation": "10p−6(1−p)=16p−6."
        },
        {
          "id": "u5q6",
          "question": "Risk beats a certain utility 4 when…",
          "options": [
            "p>0.625",
            "p>0.5",
            "p<0.625"
          ],
          "answer": 0,
          "explanation": "Solve 16p−6>4. At p=0.625 both actions tie."
        }
      ],
      "agenda": [
        {
          "title": "Retrieve and predict",
          "minutes": 10,
          "slide": 2,
          "instruction": "Ask students to explain what they already know. Collect a prediction before revealing the example."
        },
        {
          "title": "Build the model",
          "minutes": 20,
          "slide": 4,
          "instruction": "Back up minimax values under a fixed utility perspective."
        },
        {
          "title": "Experiment together",
          "minutes": 20,
          "slide": 15,
          "instruction": "Run minimax, then alpha-beta on the pruning and tie examples."
        },
        {
          "title": "Produce evidence",
          "minutes": 20,
          "slide": 44,
          "instruction": "Derive 16p−6 and solve the decision threshold against utility 4."
        },
        {
          "title": "Explain and check",
          "minutes": 10,
          "slide": 58,
          "instruction": "Use the six-question campus check. Ask students to explain one incorrect alternative."
        }
      ]
    },
    {
      "id": 6,
      "title": "Reinforcement learning",
      "subtitle": "Learn from actions and consequences",
      "summary": "Connect reward design, Bellman backups, exploration and evaluation.",
      "outcomes": [
        "Define an MDP and its return objective.",
        "Compare model backups with sampled updates.",
        "Calculate TD, Q-learning and SARSA updates.",
        "Evaluate a frozen policy and handle episode endings correctly."
      ],
      "tags": [
        "MDP",
        "TD",
        "Q-learning",
        "SARSA"
      ],
      "slides": 60,
      "cover": "assets/unit-6.jpg",
      "deck": "materials/lectures/UCLM_Unit6_Reinforcement_Learning_EN.html",
      "pdf": "materials/pdf/UCLM_Unit6_Reinforcement_Learning_EN.pdf",
      "original": "materials/originals/Unit6_Original.pptx",
      "worksheet": "practice/worksheets/unit-6.md",
      "labs": [
        "u6-l1",
        "u6-l2",
        "u6-l3",
        "u6-l4",
        "u6-l5"
      ],
      "quiz": [
        {
          "id": "u6q1",
          "question": "Rewards [−1,−1,5] with γ=0.9 give return…",
          "options": [
            "3",
            "2.15",
            "3.5"
          ],
          "answer": 1,
          "explanation": "−1−0.9+0.9²×5=2.15."
        },
        {
          "id": "u6q2",
          "question": "Q-learning uses which continuation?",
          "options": [
            "the maximum current next-state Q value",
            "only the action actually selected next",
            "no estimate of future rewards"
          ],
          "answer": 0,
          "explanation": "Its greedy target can differ from the exploratory behaviour action."
        },
        {
          "id": "u6q3",
          "question": "SARSA uses which continuation?",
          "options": [
            "always max Q",
            "the value of the selected next action",
            "the average of all values regardless of policy"
          ],
          "answer": 1,
          "explanation": "SARSA includes the next action drawn from its behaviour policy."
        },
        {
          "id": "u6q4",
          "question": "At a true task terminal, the TD target is…",
          "options": [
            "r+γV(reset state)",
            "r",
            "γV(s′)"
          ],
          "answer": 1,
          "explanation": "No task reward follows the terminal state under the stated reward-on-entry convention."
        },
        {
          "id": "u6q5",
          "question": "An external time cap should normally…",
          "options": [
            "erase all continuation value",
            "retain bootstrapping from the final nonterminal observation",
            "change the reward into success"
          ],
          "answer": 1,
          "explanation": "Collection stops, but the underlying MDP may still continue."
        },
        {
          "id": "u6q6",
          "question": "With four actions, one chosen greedy action and ε=0.2, its probability is…",
          "options": [
            "0.8",
            "0.85",
            "0.95"
          ],
          "answer": 1,
          "explanation": "The random branch can also pick it: 1−ε+ε/4=0.85."
        }
      ],
      "agenda": [
        {
          "title": "Retrieve and predict",
          "minutes": 10,
          "slide": 2,
          "instruction": "Ask students to explain what they already know. Collect a prediction before revealing the example."
        },
        {
          "title": "Build the model",
          "minutes": 20,
          "slide": 4,
          "instruction": "Define an MDP and its return objective."
        },
        {
          "title": "Experiment together",
          "minutes": 20,
          "slide": 12,
          "instruction": "Compare γ=0, γ=0.9 and the exact tie."
        },
        {
          "title": "Produce evidence",
          "minutes": 20,
          "slide": 37,
          "instruction": "Report algorithm, seed, motion, budget, goals, failures, caps and mean return."
        },
        {
          "title": "Explain and check",
          "minutes": 10,
          "slide": 58,
          "instruction": "Use the six-question campus check. Ask students to explain one incorrect alternative."
        }
      ]
    }
  ],
  "labs": [
    {
      "id": "u1-l1",
      "unit": 1,
      "title": "A perception and memory laboratory",
      "slide": 11,
      "minutes": 15,
      "predict": "How does remembered information change the next action?",
      "experiment": "Run both policies from the same starting world.",
      "evidence": "Record a case where the same current percept leads to different behaviour.",
      "tags": [
        "PEAS",
        "rationality",
        "environment",
        "memory"
      ]
    },
    {
      "id": "u1-l2",
      "unit": 1,
      "title": "When does the decision change?",
      "slide": 15,
      "minutes": 15,
      "predict": "At what probability does the preferred action change?",
      "experiment": "Move the probability slider and inspect expected utilities.",
      "evidence": "Show the calculation on each side of the decision threshold.",
      "tags": [
        "PEAS",
        "rationality",
        "environment",
        "memory"
      ]
    },
    {
      "id": "u1-l3",
      "unit": 1,
      "title": "One changed assumption changes the agent",
      "slide": 25,
      "minutes": 15,
      "predict": "Which environmental assumption changes the design?",
      "experiment": "Select each scenario and compare the agent requirements.",
      "evidence": "Write a PEAS change and its consequence for memory or planning.",
      "tags": [
        "PEAS",
        "rationality",
        "environment",
        "memory"
      ]
    },
    {
      "id": "u1-l4",
      "unit": 1,
      "title": "One action, two transformations",
      "slide": 38,
      "minutes": 20,
      "predict": "Is the opposite-sign coupled action the inverse?",
      "experiment": "Apply 02+ and inspect the row and column phases.",
      "evidence": "Record the initial, intermediate and final states; explain operation order.",
      "tags": [
        "PEAS",
        "rationality",
        "environment",
        "memory"
      ]
    },
    {
      "id": "u2-l1",
      "unit": 2,
      "title": "One graph, three search strategies",
      "slide": 15,
      "minutes": 15,
      "predict": "Will the first goal found have minimum cost?",
      "experiment": "Run BFS, DFS and UCS on the same graph.",
      "evidence": "Compare returned path, path cost and expansion order.",
      "tags": [
        "BFS",
        "DFS",
        "UCS",
        "complexity"
      ]
    },
    {
      "id": "u2-l2",
      "unit": 2,
      "title": "How quickly does a tree grow?",
      "slide": 18,
      "minutes": 15,
      "predict": "What happens when depth increases by one?",
      "experiment": "Vary branching factor and depth while watching the counts.",
      "evidence": "Calculate one tree size independently and estimate its memory requirement.",
      "tags": [
        "BFS",
        "DFS",
        "UCS",
        "complexity"
      ]
    },
    {
      "id": "u2-l3",
      "unit": 2,
      "title": "A depth limit you can change",
      "slide": 27,
      "minutes": 15,
      "predict": "Does a depth cutoff prove that no solution exists?",
      "experiment": "Move the depth limit below and above the goal depth.",
      "evidence": "Explain success, cutoff and failure using the explored tree.",
      "tags": [
        "BFS",
        "DFS",
        "UCS",
        "complexity"
      ]
    },
    {
      "id": "u2-l4",
      "unit": 2,
      "title": "A coin-change solver you can inspect",
      "slide": 37,
      "minutes": 20,
      "predict": "Why must remaining inventory be part of the state?",
      "experiment": "Solve several coin targets, including an unreachable one.",
      "evidence": "Record a legal optimal combination and explain why amount alone is insufficient.",
      "tags": [
        "BFS",
        "DFS",
        "UCS",
        "complexity"
      ]
    },
    {
      "id": "u3-l1",
      "unit": 3,
      "title": "UCS, Greedy and A* in action",
      "slide": 9,
      "minutes": 15,
      "predict": "Can greedy search expand fewer nodes but return a worse path?",
      "experiment": "Run UCS, Greedy and A* from a reset state.",
      "evidence": "Compare cost and expansions, with one explanation of the observed difference.",
      "tags": [
        "A*",
        "heuristics",
        "reopening",
        "Loopover"
      ]
    },
    {
      "id": "u3-l2",
      "unit": 3,
      "title": "An interactive heuristic check",
      "slide": 18,
      "minutes": 15,
      "predict": "Can an admissible heuristic still be inconsistent?",
      "experiment": "Edit heuristic values and inspect the edge checks.",
      "evidence": "Give a concrete violating edge and show both inequalities.",
      "tags": [
        "A*",
        "heuristics",
        "reopening",
        "Loopover"
      ]
    },
    {
      "id": "u3-l3",
      "unit": 3,
      "title": "Reopening changes the returned answer",
      "slide": 20,
      "minutes": 15,
      "predict": "What happens if an improved closed state is never reopened?",
      "experiment": "Run the example with reopening enabled and disabled.",
      "evidence": "Record the two results and identify the improved path.",
      "tags": [
        "A*",
        "heuristics",
        "reopening",
        "Loopover"
      ]
    },
    {
      "id": "u3-l4",
      "unit": 3,
      "title": "Move a tile and inspect both heuristics",
      "slide": 28,
      "minutes": 15,
      "predict": "Which heuristic changes after moving one tile?",
      "experiment": "Use the near-goal and goal presets and make legal moves.",
      "evidence": "Calculate misplaced tiles and Manhattan distance for one board.",
      "tags": [
        "A*",
        "heuristics",
        "reopening",
        "Loopover"
      ]
    },
    {
      "id": "u3-l5",
      "unit": 3,
      "title": "A live Loopover heuristic laboratory",
      "slide": 42,
      "minutes": 20,
      "predict": "How much can a single coupled move change?",
      "experiment": "Choose a Loopover preset and apply a complete action.",
      "evidence": "Justify a lower bound in units of coupled actions, then undo and verify restoration.",
      "tags": [
        "A*",
        "heuristics",
        "reopening",
        "Loopover"
      ]
    },
    {
      "id": "u4-l1",
      "unit": 4,
      "title": "Colour the graph and inspect the domains",
      "slide": 10,
      "minutes": 15,
      "predict": "Which domains shrink after colouring one region?",
      "experiment": "Assign adjacent and nonadjacent regions and inspect domains.",
      "evidence": "Save a consistent partial colouring and identify one forbidden colour.",
      "tags": [
        "CSP",
        "AC-3",
        "MRV",
        "min-conflicts"
      ]
    },
    {
      "id": "u4-l2",
      "unit": 4,
      "title": "Watch assignment, pruning and restoration",
      "slide": 16,
      "minutes": 15,
      "predict": "Where does ordering reduce branching?",
      "experiment": "Compare fixed order with MRV, keeping inference settings controlled.",
      "evidence": "Record assignments and backtracks; explain one difference.",
      "tags": [
        "CSP",
        "AC-3",
        "MRV",
        "min-conflicts"
      ]
    },
    {
      "id": "u4-l3",
      "unit": 4,
      "title": "Follow the AC-3 queue",
      "slide": 27,
      "minutes": 15,
      "predict": "Can every arc have support while the CSP is unsatisfiable?",
      "experiment": "Run the chain and two-colour triangle presets to completion.",
      "evidence": "Explain the queue changes and distinguish local support from a global solution.",
      "tags": [
        "CSP",
        "AC-3",
        "MRV",
        "min-conflicts"
      ]
    },
    {
      "id": "u4-l4",
      "unit": 4,
      "title": "Compare binary and global propagation",
      "slide": 33,
      "minutes": 15,
      "predict": "Does pairwise inequality capture every AllDifferent inference?",
      "experiment": "Run binary and global propagation on the same preset.",
      "evidence": "Identify a value pruned only by the global constraint and explain why.",
      "tags": [
        "CSP",
        "AC-3",
        "MRV",
        "min-conflicts"
      ]
    },
    {
      "id": "u4-l5",
      "unit": 4,
      "title": "Repair an eight-queen board",
      "slide": 40,
      "minutes": 20,
      "predict": "Does a fixed iteration budget guarantee a solution?",
      "experiment": "Run min-conflicts with several seeds and the same budget.",
      "evidence": "Report attacks remaining, successful runs and failures without discarding seeds.",
      "tags": [
        "CSP",
        "AC-3",
        "MRV",
        "min-conflicts"
      ]
    },
    {
      "id": "u5-l1",
      "unit": 5,
      "title": "A visible trace from leaves to the root",
      "slide": 15,
      "minutes": 15,
      "predict": "Which leaf value determines the root decision?",
      "experiment": "Run minimax, then alpha-beta on the pruning and tie examples.",
      "evidence": "Record backed-up values and label exact values versus upper bounds.",
      "tags": [
        "minimax",
        "alpha-beta",
        "evaluation",
        "chance"
      ]
    },
    {
      "id": "u5-l2",
      "unit": 5,
      "title": "Search depth and feature weights change the choice",
      "slide": 22,
      "minutes": 15,
      "predict": "Can a shallow heuristic miss a forced win?",
      "experiment": "Compare depth 1, depth 2 and exact move values.",
      "evidence": "Record a changed action and explain why the heuristic score was misleading.",
      "tags": [
        "minimax",
        "alpha-beta",
        "evaluation",
        "chance"
      ]
    },
    {
      "id": "u5-l3",
      "unit": 5,
      "title": "The same tree, three exploration orders",
      "slide": 33,
      "minutes": 15,
      "predict": "How many leaves does ordering save on this tree?",
      "experiment": "Run listed, strong and weak move orders.",
      "evidence": "Verify equal root values and compare evaluated leaf counts.",
      "tags": [
        "minimax",
        "alpha-beta",
        "evaluation",
        "chance"
      ]
    },
    {
      "id": "u5-l4",
      "unit": 5,
      "title": "Play against an exact minimax opponent",
      "slide": 39,
      "minutes": 15,
      "predict": "Can a human force a win against exact optimal O?",
      "experiment": "Play several games and use best-move assistance to test a draw.",
      "evidence": "Separate a mistake in play from a claim about the solved game value.",
      "tags": [
        "minimax",
        "alpha-beta",
        "evaluation",
        "chance"
      ]
    },
    {
      "id": "u5-l5",
      "unit": 5,
      "title": "A probability can reverse the selected action",
      "slide": 44,
      "minutes": 20,
      "predict": "At what probability is the risky action preferable?",
      "experiment": "Compare p=0.5, the exact tie and p=0.75.",
      "evidence": "Derive 16p−6 and solve the decision threshold against utility 4.",
      "tags": [
        "minimax",
        "alpha-beta",
        "evaluation",
        "chance"
      ]
    },
    {
      "id": "u6-l1",
      "unit": 6,
      "title": "Discounting can change the preferred trajectory",
      "slide": 12,
      "minutes": 15,
      "predict": "When does patience become better than the quick payoff?",
      "experiment": "Compare γ=0, γ=0.9 and the exact tie.",
      "evidence": "Derive −1−γ+5γ² and explain the discount threshold.",
      "tags": [
        "MDP",
        "TD",
        "Q-learning",
        "SARSA"
      ]
    },
    {
      "id": "u6-l2",
      "unit": 6,
      "title": "Watch values spread through the grid",
      "slide": 21,
      "minutes": 15,
      "predict": "How do useful values reach the start cell?",
      "experiment": "Run one sweep at a time, then compare deterministic and noisy motion.",
      "evidence": "Record the start value and residual; explain the terminal reward convention.",
      "tags": [
        "MDP",
        "TD",
        "Q-learning",
        "SARSA"
      ]
    },
    {
      "id": "u6-l3",
      "unit": 6,
      "title": "Compare three one-step update targets",
      "slide": 31,
      "minutes": 15,
      "predict": "Why do the three targets differ?",
      "experiment": "Change the selected next action, then compare termination and truncation.",
      "evidence": "Calculate all default updates and state which continuation each uses.",
      "tags": [
        "MDP",
        "TD",
        "Q-learning",
        "SARSA"
      ]
    },
    {
      "id": "u6-l4",
      "unit": 6,
      "title": "Explore three actions with unknown reward rates",
      "slide": 33,
      "minutes": 15,
      "predict": "Can a greedy agent remain stuck on an early preference?",
      "experiment": "Compare ε=0 and ε=0.1 with the same seed and pull budget.",
      "evidence": "Report counts and expected regret, then repeat with a second seed.",
      "tags": [
        "MDP",
        "TD",
        "Q-learning",
        "SARSA"
      ]
    },
    {
      "id": "u6-l5",
      "unit": 6,
      "title": "Train a policy from sampled gridworld experience",
      "slide": 37,
      "minutes": 20,
      "predict": "Does training return measure the deployed greedy policy?",
      "experiment": "Train for 100 and 1,000 episodes, then run frozen evaluation.",
      "evidence": "Report algorithm, seed, motion, budget, goals, failures, caps and mean return.",
      "tags": [
        "MDP",
        "TD",
        "Q-learning",
        "SARSA"
      ]
    }
  ]
};
if (typeof module !== "undefined") module.exports = COURSE;
