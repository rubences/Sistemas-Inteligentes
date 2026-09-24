import java.util.*;

/** Course model: one unit-cost action shifts a row, THEN a fixed-index column. */
public final class Loopover {
    public record Action(int row, int column, int sign) {
        public Action {
            if(row<0 || row>3 || column<0 || column>3 || (sign!=1 && sign!=-1))
                throw new IllegalArgumentException("row/column: 0..3; sign: -1 or +1");
        }
    }
    public static final class Board {
        private final int[] tiles;
        public Board(int[] tiles) {
            if(tiles==null || tiles.length!=16) throw new IllegalArgumentException("Need 16 tiles");
            boolean[] seen=new boolean[16];
            for(int x:tiles) {
                if(x<0 || x>=16 || seen[x]) throw new IllegalArgumentException("Need each tile 0..15 once");
                seen[x]=true;
            }
            this.tiles=tiles.clone();
        }
        public static Board parse(String s) {
            if(s==null || !s.matches("[0-9]{32}")) throw new IllegalArgumentException("Need 32 decimal digits");
            int[] a=new int[16];
            for(int i=0;i<16;i++) a[i]=Integer.parseInt(s.substring(2*i,2*i+2));
            return new Board(a);
        }
        public int at(int row,int col) {
            if(row<0 || row>3 || col<0 || col>3) throw new IllegalArgumentException("Outside board");
            return tiles[row*4+col];
        }
        private Board row(int r,int d) {
            int[] a=tiles.clone();
            for(int c=0;c<4;c++) a[4*r+Math.floorMod(c+d,4)]=tiles[4*r+c];
            return new Board(a);
        }
        private Board column(int c,int d) {
            int[] a=tiles.clone();
            for(int r=0;r<4;r++) a[4*Math.floorMod(r+d,4)+c]=tiles[4*r+c];
            return new Board(a);
        }
        public Board apply(Action a) { return row(a.row(),a.sign()).column(a.column(),a.sign()); }
        /** Undo phases in reverse order. This is not generally a legal single action. */
        public Board undo(Action a) { return column(a.column(),-a.sign()).row(a.row(),-a.sign()); }
        public int misplacedLowerBound(Board goal) {
            int wrong=0;
            for(int i=0;i<16;i++) if(tiles[i]!=goal.tiles[i]) wrong++;
            return (wrong+6)/7; // at most 7 positions can be repaired by one action
        }
        @Override public boolean equals(Object x) { return x instanceof Board b && Arrays.equals(tiles,b.tiles); }
        @Override public int hashCode() { return Arrays.hashCode(tiles); }
        @Override public String toString() {
            StringBuilder b=new StringBuilder();
            for(int x:tiles) { if(x<10)b.append('0'); b.append(x); }
            return b.toString();
        }
    }
    public enum Status { SOLVED, EXHAUSTED, CUTOFF }
    public record Result(Status status,List<Action> actions,int expanded) {
        public Result { actions=List.copyOf(actions); }
    }
    private record Parent(Board board,Action action) {}
    public static final Board GOAL=Board.parse("00010203040506070809101112131415");
    public static List<Action> actions() {
        List<Action> all=new ArrayList<>();
        for(int r=0;r<4;r++) for(int c=0;c<4;c++) for(int d:new int[]{-1,1}) all.add(new Action(r,c,d));
        return List.copyOf(all);
    }
    /** BFS proves minimum coupled-action cost if solved; budget stops are not failure proofs. */
    public static Result bfs(Board start,Board goal,int maxExpansions) {
        Objects.requireNonNull(start); Objects.requireNonNull(goal);
        if(maxExpansions<0)throw new IllegalArgumentException("Budget must be nonnegative");
        ArrayDeque<Board> queue=new ArrayDeque<>(); Map<Board,Parent> parents=new HashMap<>();
        queue.add(start); parents.put(start,null); int expanded=0;
        while(!queue.isEmpty()) {
            Board s=queue.remove();
            if(s.equals(goal)) {
                LinkedList<Action> path=new LinkedList<>();
                for(Board n=s;parents.get(n)!=null;n=parents.get(n).board()) path.addFirst(parents.get(n).action());
                return new Result(Status.SOLVED,path,expanded);
            }
            if(expanded>=maxExpansions)return new Result(Status.CUTOFF,List.of(),expanded);
            expanded++;
            for(Action a:actions()) {
                Board next=s.apply(a);
                if(!parents.containsKey(next)) {parents.put(next,new Parent(s,a));queue.add(next);}
            }
        }
        return new Result(Status.EXHAUSTED,List.of(),expanded);
    }
    public static void main(String[] args) {
        Action a=new Action(0,2,1);
        System.out.println("Known forward transition: "+GOAL.apply(a));
        Board start=GOAL.undo(a); // a is a legal one-action solution from this state
        Result result=bfs(start,GOAL,100);
        System.out.println("Status="+result.status()+", cost="+result.actions().size()+", expanded="+result.expanded());
        System.out.println("Solution="+result.actions());
    }
}
