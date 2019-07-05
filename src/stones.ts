import { Stone } from './stone';
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

function uniqTurn(
  nr: number,
  makeTurnTo: (my: Stone) => Stone,
  stones: Stone[],
): UniqTurn {
  const rest: Stone[] = [];
  const uniq = new Map<String, Stone[]>();
  stones.forEach(stone => {
    if (!stone.hasNumber(nr)) {
      // is an other stone not our search nr
      rest.push(stone);
      return;
    }
    // collect all stones which has our number
    const id = stone.idString();
    let ustones = uniq.get(id);
    if (!ustones) {
      ustones = [];
      uniq.set(id, ustones);
    }
    ustones.push(stone);
  });
  const selected: Stone[] = [];
  for (let ustones of uniq.values()) {
    // find optimial stone, which do not needed to turn
    const idx = ustones.findIndex(stone => makeTurnTo(stone) === stone);
    // this are the stones which are used
    selected.push(makeTurnTo(ustones.splice(idx < 0 ? 0 : idx, 1)[0]));
    // this are the stones which could be used for on the right side
    Array.prototype.push.apply(rest, ustones);
  }
  return { selected, rest };
}

export class Stones {
  public readonly stones: Stone[];

  public static create(stones: Stone[]) {
    return new Stones(stones);
  }

  private constructor(stones: Stone[]) {
    this.stones = stones;
  }

  public get asObj(): { id: string; left: number; right: number, turned: string }[] {
    return this.stones.map(i => ({ id: i.id, turned: i.turned, left: i.left, right: i.right }));
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
    const leftStones = uniqTurn(left, makeStoneLeft(left), this.stones);
    const rightStones = uniqTurn(right, makeStoneRight(right), leftStones.rest);
    const ret: Stones[] = [];
    leftStones.selected.forEach(ls => {
      rightStones.selected.forEach(rs => {
        if (ls.id == rs.id) {
          return;
        }
        ret.push(
          Stones.create([ls, ...this.stones.filter(i => i.id !== ls.id && i.id !== rs.id), rs]),
        );
      });
    });
    return ret;
  }

  public get first() {
    return this.stones[0];
  }

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
