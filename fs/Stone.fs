namespace Domino
// type StoneObj = {
//   id: string
//   turned: Turned
//   left: int
//   right: int
// }

type Stone = class
  val id : string
  val turned : Domino.Turned
  val left : int
  val right : int

  new (id0: string, turned0: Turned, left0: int, right0: int) = {
    id = id0;
    turned = turned0;
    left = left0;
    right = right0
  }

  member this.hasNumber (n: int) = n.Equals(this.left) || n.Equals(this.right);

  member this.isStone (left: int, right: int) =
    (this.left.Equals(left) && this.right.Equals(right)) ||
    (this.left.Equals(right) && this.right.Equals(left))

  member this.turnTo(turns: (Stone) -> Stone) = turns(this)

  member this.toString = sprintf "%d|%d" this.left this.right

  member this.idString =
    if this.left < this.right then
      sprintf "%d|%d" this.left this.right
    else
      sprintf "%d|%d" this.right this.left

  member this.equal(o: Stone) = this.idString.Equals(o.idString)

  // member this.asObj() y StoneObj = {
  //     id: this.id,
  //     turned: this.turned,
  //     left: this.left,
  //     right: this.right,
  // }

end