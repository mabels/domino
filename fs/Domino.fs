open Stones

let dominoSolve(stones: Stones, left: number, right: number) x =
  let solved = stones.firstLast(left, right);
  if (solved.length === 1) {
    if (solved[0].length === 1) {
      return solved;
    }
    if (solved[0].length === 2) {
      // this is the root rule of domino
      if (solved[0].first.right === solved[0].last.left) {
        return solved;
      } else {
        return [];
      }
    }
  }
  return solved.reduce<Stones[]>((accu, ustones) => {
    const tmp = dominoSolve(ustones.mid, ustones.first.right, ustones.last.left);
    tmp.forEach((sts) => {
      accu.push(Stones.create([ustones.first, ...sts.asStones, ustones.last]));
    });
    return accu;
  }, []);


type Domino(stones: Stones[]) = {
  let chains: Stones[] = stones;

  static solve(stones: Stones, left: number, right: number) = Domino(dominoSolve(stones, left, right))

  member asObj() x = this.chains.map(sts => sts.asObj)

}

