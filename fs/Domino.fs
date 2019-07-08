namespace Domino

module Domino =
  let dominoSolve(stones: Stones, left: int, right: int) =
    let solved = stones.firstLast(left, right)
    if (solved.Length.Equals(1)) then
      if (solved.[0].length().Equals(1)) then
        solved
      elif (solved.[0].length().Equals(2)) then
        // this is the root rule of domino
        if (solved.[0].first().right.Equals(solved.[0].last().left)) then
          solved
        else
          [||]
      else
        [||]
    else
      [||]
      // solved |> Array.reduce(fun (accu, ustones) ->
      //   let tmp = Domino.dominoSolve(ustones.mid, ustones.first.right, ustones.last.left);
      //   tmp.iter(fun (sts) ->
      //     accu.push(Stones.create([ustones.first,
      //       // ...sts.asStones,
      //       ustones.last]));
      //   )
      //   accu
      // )


type Domino = class
  val chains: Stones[]

  new (stones: Stones[]) = {
    chains = stones
  }

  static member solve(stones: Stones, left: int, right: int) =
    Domino(Domino.dominoSolve(stones, left, right))

  // member this.asObj() = this.chains.map(fun sts -> sts.asObj)

end