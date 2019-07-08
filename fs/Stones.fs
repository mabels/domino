namespace Domino

module Stones =
  let makeStoneLeft(left: int) = function
    | (stone: Stone) ->
        if (stone.left.Equals(left)) then
          stone
        else
          Stone(stone.id, Turned.YES, left, stone.left)

  let makeStoneRight(right: int) = function
    | (stone: Stone) ->
      if (stone.right.Equals(right)) then
        stone
      else
        Stone(stone.id, Turned.YES, stone.right, right)


  type UniqTurn = {
    selected: Stone[]
    rest: Stone[]
  }

  let insGetValue(uniq: Map<string, Stone[]>, id: string) =
    if (uniq.ContainsKey(id)) then
      uniq.[id]
    else
      let ustones: Stone[] = [||]
      uniq.Add(id, ustones);
      ustones

  let uniqTurn(nr: int, makeTurnTo: (Stone) -> Stone, stones: Stone[]) =
    { selected = [||]; rest = [||] }
    // let rest: Stone[] = []
    // // might be a performance problem;
    // let uniq = new Map<string, Stone[]>()
    // stones.iter(fun (stone) ->
    //   if (!stone.hasNumber(nr)) then
    //     // is an other stone not our search nr
    //     rest.push(stone)
    //   else
    //   // collect all stones which has our number
    //     insGetValue(uniq, stone.idString()).push(stone);
    // )
    // let selected: Stone[] = [];
    // uniq.values.iter(fun (stones) ->
    //   // find optimial stone, which do not needed to turn
    //   // might be uncool uses object reference equality
    //   let idx = ustones.findIndex(stone => makeTurnTo(stone) == stone)
    //   // this are the stones which are used
    //   // if no optimal just use the first
    //   // let toDel = if idx < 0 then 0
    //   //             else idx
    //   // selected.push(makeTurnTo(ustones.remove()

    //   // .splice(hhh
    //   //    if idx < 0 then 0 else idx
    //   //  , 1)[0]));
    //   // this are the stones which could be used for on the right side
    //   // in place append
    //   rest.append(ustones)
    // )
    // { selected, rest };


type Stones = class
  val stones: Stone[];

  static member create(stones: Stone[]) = new Stones(stones);

  new (stones0: Stone[]) = {
    stones = stones0;
  }

  member this.asStones(): Stone[] = this.stones

  // only used for testing
  // member asObj(): StoneObj[] {
  //   return this.stones.map(i => i.asObj)
  // }

  member this.firstLast(left: int, right: int): Stones[] =
    if (this.stones.Length.Equals(0)) then
      // empty solution
      [||]
    elif (this.stones.Length.Equals(1)) then
      // single Stone solution
      if (this.stones.[0].isStone(left, right)) then
        [|Stones.create([|this.stones.[0].turnTo(Stones.makeStoneLeft(left))|])|];
      else
        [||]
    else
      // possible right and left stones
      // the same stones has to remove
      // the stones will be turned
      // so that i could use the first.right, last.left value
      // to recursive solve to an chain
      let leftStones = Stones.uniqTurn(left, Stones.makeStoneLeft(left), this.stones)
      let rightStones = Stones.uniqTurn(right, Stones.makeStoneRight(right), leftStones.rest)
      let ret: Stones[] = [||]
      // leftStones.selected.Iter(fun ls -> {
      //   rightStones.selected.Iter(fun rs -> {
      //     if (ls.id != rs.id) then
      //       ret.push(
      //         Stones.create([
      //           ls,
      //           // remove ls and rs from list
      //           this.stones.filter(i => i.id !== ls.id && i.id !== rs.id),
      //           rs
      //         ])
      //       )
      //   });
      // });
      ret

  member this.first() = this.stones.[0]

  // this is the next solving target if first and last
  // our solved stones
  member this.mid() = new Stones(this.stones.[1..this.stones.Length - 1])

  member this.last() = this.stones.[this.stones.Length - 1]

  member this.length() = this.stones.Length

end
