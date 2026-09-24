/** Run with java -ea LoopoverTest. Independent fixtures test order and wraparound. */
public final class LoopoverTest {
    private static void reject(Runnable f) {
        try { f.run(); throw new AssertionError("Expected invalid input rejection"); }
        catch(IllegalArgumentException expected) { }
    }
    public static void main(String[] args) {
        boolean assertions=false; assert assertions=true;
        if(!assertions)throw new IllegalStateException("Use java -ea LoopoverTest");
        var goal=Loopover.GOAL; var a=new Loopover.Action(0,2,1); var next=goal.apply(a);
        assert next.toString().equals("03001402040501070809061112131015") : next;
        assert goal.toString().equals("00010203040506070809101112131415");
        assert next.undo(a).equals(goal);
        assert !next.apply(new Loopover.Action(0,2,-1)).equals(goal);
        for(var action:Loopover.actions()) assert goal.apply(action).undo(action).equals(goal);
        assert Loopover.actions().size()==32;
        assert next.misplacedLowerBound(goal)==1;
        int[] tiles=new int[16]; for(int i=0;i<16;i++)tiles[i]=i;
        var copied=new Loopover.Board(tiles); tiles[0]=15; assert copied.equals(goal);
        reject(()->Loopover.Board.parse("00000000000000000000000000000000"));
        reject(()->new Loopover.Action(4,0,1)); reject(()->new Loopover.Action(0,0,0));
        reject(()->goal.at(-1,0));
        var zero=Loopover.bfs(goal,goal,0); assert zero.status()==Loopover.Status.SOLVED && zero.actions().isEmpty();
        var start=goal.undo(a); assert Loopover.bfs(start,goal,0).status()==Loopover.Status.CUTOFF;
        var solved=Loopover.bfs(start,goal,100); assert solved.status()==Loopover.Status.SOLVED;
        assert solved.actions().size()==1;
        for(var action:solved.actions())start=start.apply(action);
        assert start.equals(goal);
        System.out.println("Loopover contracts passed: transition, inverse, invariants, bounds and path replay.");
    }
}
