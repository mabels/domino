import { Turned } from './turned';

export class Stone {
  public readonly id: string;
  public readonly turned: Turned;
  public readonly left: number;
  public readonly right: number;

  public static create(id: string, turned: Turned, left: number, right: number) {
    return new Stone(id, turned, left, right);
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
    if (this.left == left && this.right == right) {
      return true;
    }
    if (this.left == right && this.right == left) {
      return true;
    }
    return false;
  }

  public turnTo(turns: (my: Stone) => Stone) {
    return turns(this);
  }

  public toString() {
    return `${this.left}|${this.right}`;
  }

  public idString() {
    if (this.left < this.right) {
      return `${this.left}|${this.right}`;
    } else {
      return `${this.right}|${this.left}`;
    }
  }

  public equal(o: Stone) {
    return this.idString() == o.idString();
  }
}
