import { Stones } from './stones';
import { StoneObj } from './stone';

function dominoSolve(stones: Stones, left: number, right: number): Stones[] {
  const solved = stones.firstLast(left, right);
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
}

export class Domino {
  private readonly chains: Stones[];

  public static solve(stones: Stones, left: number, right: number): Domino {
    return new Domino(dominoSolve(stones, left, right));
  }

  private constructor(stones: Stones[]) {
    this.chains = stones;
  }

  public get asObj(): StoneObj[][] {
    return this.chains.map(sts => sts.asObj);
  }

}
