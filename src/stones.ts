import { Stone, StoneObj } from './stone';
import { Turned } from './turned';

function makeStoneLeft(left: number) {
  return (stone: Stone) => {
    if (stone.left === left) {
      return stone;
    }
    return Stone.create(stone.id, Turned.YES, left, stone.left);
  };
}

function makeStoneRight(right: number) {
  return (stone: Stone) => {
    if (stone.right === right) {
      return stone;
    }
    return Stone.create(stone.id, Turned.YES, stone.right, right);
  };
}

interface UniqTurn {
  readonly selected: Stone[];
  readonly rest: Stone[];
}

function insGetValue(uniq: Map<string, Stone[]>, id: string): Stone[] {
  let ustones = uniq.get(id)
  if (!ustones) {
    ustones = [];
    uniq.set(id, ustones);
  }
  return ustones;
}

function uniqTurn(nr: number, makeTurnTo: (my: Stone) => Stone, stones: Stone[]): UniqTurn {
  const rest: Stone[] = [];
  // might be a performance problem;
  const uniq = new Map<string, Stone[]>();
  stones.forEach(stone => {
    if (!stone.hasNumber(nr)) {
      // is an other stone not our search nr
      rest.push(stone);
      return;
    }
    // collect all stones which has our number
    insGetValue(uniq, stone.idString()).push(stone);
  });
  const selected: Stone[] = [];
  for (let ustones of uniq.values()) {
    // find optimial stone, which do not needed to turn
    // might be uncool uses object reference equality
    const idx = ustones.findIndex(stone => makeTurnTo(stone) === stone);
    // this are the stones which are used
    // if no optimal just use the first
    selected.push(makeTurnTo(ustones.splice(idx < 0 ? 0 : idx, 1)[0]));
    // this are the stones which could be used for on the right side
    // in place append
    Array.prototype.push.apply(rest, ustones);
  }
  return { selected, rest };
}

export class Stones {
  private readonly stones: Stone[];

  public static create(stones: Stone[]) {
    return new Stones(stones);
  }

  public static fromTuples(values: [string, number, number][]): Stones {
    return new Stones(values.map(Stone.fromTuple));
  }

  private constructor(stones: Stone[]) {
    this.stones = stones;
  }

  public get asStones(): Stone[] {
    return this.stones;
  }

  // only used for testing
  public get asObj(): StoneObj[] {
    return this.stones.map(i => i.asObj)
  }

  public toTuples(): [string, number, number][] {
    return this.stones.map(i => i.toTuple());
  }

  public firstLast(left: number, right: number): Stones[] {
    if (this.stones.length === 0) {
      // empty solution
      return [];
    }
    if (this.stones.length === 1) {
      // single Stone solution
      if (this.stones[0].isStone(left, right)) {
        return [Stones.create([this.stones[0].turnTo(makeStoneLeft(left))])];
      }
      return [];
    }
    // possible right and left stones
    // the same stones has to remove
    // the stones will be turned
    // so that i could use the first.right, last.left value
    // to recursive solve to an chain
    const leftStones = uniqTurn(left, makeStoneLeft(left), this.stones);
    const rightStones = uniqTurn(right, makeStoneRight(right), leftStones.rest);
    const ret: Stones[] = [];
    leftStones.selected.forEach(ls => {
      rightStones.selected.forEach(rs => {
        if (ls.id === rs.id) {
          // skip the same stone
          return;
        }
        ret.push(
          Stones.create([
            ls,
            // remove ls and rs from list
            ...this.stones.filter(i => i.id !== ls.id && i.id !== rs.id),
            rs
          ])
        );
      });
    });
    return ret;
  }

  public get first() {
    return this.stones[0];
  }

  // this is the next solving target if first and last
  // our solved stones
  public get mid() {
    return new Stones(this.stones.slice(1, -1));
  }

  public get last() {
    return this.stones[this.stones.length - 1];
  }

  public get length() {
    return this.stones.length;
  }

}
