open Turned

type StoneObj = {
  id: string;
  turned: Turned;
  left: number;
  right: number;
}

type Stone(id0: string, turned0: Turned, left0: number, right0: number) = {
  let id = id0
  let turned = turned0
  let left = left0
  let right = right0

  hasNumber (n: number) x = n == this.left || n == this.right;

  isStone (left: number, right: number) x =
    (this.left == left && this.right == right) ||
    (this.left == right && this.right == left)

  turnTo (turns: (my: Stone) => Stone) x = turns(this)

  toString () x = `${this.left}|${this.right}`

  idString() x =
    if (this.left < this.right) {
      return `${this.left}|${this.right}`;
    } else {
      return `${this.right}|${this.left}`;
    }


  equal(o: Stone): x = this.idString() == o.idString()

 asObj() y StoneObj = {
      id: this.id,
      turned: this.turned,
      left: this.left,
      right: this.right,
  }
}
