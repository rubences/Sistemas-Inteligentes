/** Student extension: preserve Result status semantics and replayable action paths. */
public final class AStarExercise {
    public static Loopover.Result solve(Loopover.Board start,Loopover.Board goal,int maxExpansions) {
        // PriorityQueue ordered by g+h; best-g map; parent map; stale-entry check.
        // Improve/reopen a state whenever a strictly smaller g is discovered.
        // Use Board.misplacedLowerBound(goal), then justify your own lower bound.
        throw new UnsupportedOperationException("Student exercise: implement A* and test it");
    }
}
