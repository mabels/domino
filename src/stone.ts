import { Turned } from './turned';

export interface StoneObj {
  readonly id: string;
  readonly turned: Turned;
  readonly left: number;
  readonly right: number;
}

export class Stone implements StoneObj {
  public readonly id: string;
  public readonly turned: Turned;
  public readonly left: number;
  public readonly right: number;

  public static create(id: string, turned: Turned, left: number, right: number) {
    return new Stone(id, turned, left, right);
  }

  public static fromTuple([id, left, right]: [string, number, number]): Stone {
    return new Stone(id, Turned.NO, left, right)
  }

  private constructor(id: string, turned: Turned, left: number, right: number) {
    this.left = left;
    this.right = right;
    this.turned = turned;
    this.id = id;
  }
  public hasNumber(n: number): boolean {
    return n == this.left || n == this.right;
  }

  public isStone(left: number, right: number) {
    return (this.left == left && this.right == right) || (this.left == right && this.right == left);
  }

  public turnTo(turns: (my: Stone) => Stone) {
    return turns(this);
  }

  public toString() {
    return `${this.left}|${this.right}`;
  }

  public toTuple(): [string, number, number] {
    return [this.id, this.left, this.right];
  }

  public idString() {
    if (this.left < this.right) {
      return `${this.left}|${this.right}`;
    } else {
      return `${this.right}|${this.left}`;
    }
  }

  public equal(o: Stone) {
    return this.idString() === o.idString();
  }

  public get asObj(): StoneObj {
    return {
      id: this.id,
      turned: this.turned,
      left: this.left,
      right: this.right,
    };
  }
}
