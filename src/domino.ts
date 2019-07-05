import { Stones } from './stones';

function dominoSolve(stones: Stones, left: number, right: number): Stones[] {
  const solved = stones.firstLast(left, right);
  if (solved.length == 1) {
    if (solved[0].length == 1) {
      return solved;
    }
    if (solved[0].length == 2) {
      if (solved[0].first.right === solved[0].last.left) {
        return solved;
      } else {
        return [];
      }
    }
  }
  // console.log(`solve:`, solved);
  const ret = solved.reduce<Stones[]>((accu, ustones) => {
    const tmp = dominoSolve(ustones.mid, ustones.first.right, ustones.last.left);
    tmp.forEach((sts) => {
      accu.push(Stones.create([ustones.first, ...sts.stones, ustones.last]));
    });
    return accu;
  }, []);
  return ret;
}

export class Domino {
  public readonly chains: Stones[];

  public static solve(stones: Stones, left: number, right: number): Domino {
    return new Domino(dominoSolve(stones, left, right));
  }

  private constructor(stones: Stones[]) {
    this.chains = stones;
  }

  public get asObj() {
    return this.chains.map(sts => sts.asObj);
  }

}
