namespace Domino

open NUnit.Framework


module Test =
  [<Test>]
  let ``find combination list should be empty`` =
    let stones = Stones.create([||]);
    Assert.AreEqual(stones.firstLast(4, 2), [])

  [<Test>]
  let ``find combination on list of one stone`` =
    let stones = Stones.create([|Stone.create("id", Turned.NO, 1, 2)|]);
    Assert.AreEqual(stones.firstLast(7, 4), []);
    Assert.AreEqual(stones.firstLast(1, 2).map(i => i.asObj()), [
      [{ left = 1, right = 2, id = "id", turned = Turned.NO }]
    ])
    Assert.AreEqual(stones.firstLast(2, 1).map(i => i.asObj()), [
      [{ left = 2, right = 1, id = "id", turned = Turned.YES }]
    ])

  [<Test>]
  let ``find combination list should be empty`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 3, 4),
      Stone.create("i3", Turned.NO, 5, 6),
      Stone.create("i4", Turned.NO, 7, 8)
    ])
    for i in 0 .. 10 do
      Assert.AreEqual(stones.firstLast(i, i), [])

  [<Test>]
  let ``find combination list should be one`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 2, 1),
      Stone.create("i3", Turned.NO, 6, 4)
    ])
    Assert.AreEqual(stones.firstLast(1, 1).map(i => i.asObj()), [
      [
        { id = "i1"; left = 1; right = 2; turned = Turned.NO },
        { id = "i3"; left = 6; right = 4; turned = Turned.NO },
        { id = "i2"; left = 2; right = 1; turned = Turned.NO }
      ]
    ])

  [<Test>]
  let ``find combination list should be one without turn`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 2, 1),
      Stone.create("i2", Turned.NO, 1, 2),
      Stone.create("i3", Turned.NO, 6, 4)
    ])
    Assert.AreEqual (stones.firstLast(1, 1).map(i => i.asObj()), [
      [
        { id = "i2"; left = 1; right = 2; turned = Turned.NO },
        { id = "i3"; left = 6; right = 4; turned = Turned.NO },
        { id = "i1"; left = 2; right = 1; turned = Turned.NO }
      ]
    ])

  [<Test>]
  let ``find combination list should be one with turn`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 1, 2),
      Stone.create("i3", Turned.NO, 6, 4)
    ])
    Assert.AreEqual(stones.firstLast(1, 1).map(i => i.asObj()), [
      [
        { id = "i1"; left = 1; right = 2; turned = Turned.NO },
        { id = "i3"; left = 6; right = 4; turned = Turned.NO },
        { id = "i2"; left = 2; right = 1; turned = Turned.YES }
      ]
    ])

  [<Test>]
  let ``find combination list should be more than one`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 2, 1),
      Stone.create("i3", Turned.NO, 4, 2),
      Stone.create("i4", Turned.NO, 7, 9)
    ])
    // console.log(JSON.stringify(stones.firstLast(1, 2).map(i => i.asObj)));
    let [f1, f2] = stones.firstLast(1, 2).map(i => i.asObj());
    Assert.AreEqual(f1, [
      { id = "i1"; turned = Turned.NO; left = 1; right = 2 },
      { id = "i2"; turned = Turned.NO; left = 2; right = 1 },
      { id = "i4"; turned = Turned.NO; left = 7; right = 9 },
      { id = "i3"; turned = Turned.NO; left = 4; right = 2 }
    ])
    Assert.AreEqual(f2, [
      { id = "i1"; turned = Turned.NO; left = 1; right = 2 },
      { id = "i3"; turned = Turned.NO; left = 4; right = 2 },
      { id = "i4"; turned = Turned.NO; left = 7; right = 9 },
      { id = "i2"; turned = Turned.YES; left = 1; right = 2 }
    ])

  [<Test>]
  let ``not solvable stones empty`` =
    let stones = Stones.create([ ])
    Assert.AreEqual (Domino.solve(stones, 1, 2).asObj(), [])

  [<Test>]
  let ``not solvable stones one`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2)
    ])
    Assert.AreEqual (Domino.solve(stones, 3, 2).asObj(), [])

  [<Test>]
  let ``solvable stones one`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2)
    ])
    Assert.AreEqual (Domino.solve(stones, 2, 1).asObj(), [
      [{ id = "i1"; left = 2; right = 1; turned = Turned.YES }]
    ])

  [<Test>]
  let ``not solvable stones two`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 1, 2)
    ])
    Assert.AreEqual (Domino.solve(stones, 2, 1).asObj(), [])

  [<Test>]
  let ``solvable stones two equal`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 1, 2)
    ])
    Assert.AreEqual(Domino.solve(stones, 2, 2).asObj(), [
      [
        { id = "i1"; left = 2; right = 1; turned = Turned.YES },
        { id = "i2"; left = 1; right = 2; turned = Turned.NO}
      ]
    ])

  [<Test>]
  let ``solvable stones two equal`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 1, 2)
    ])
    Assert.AreEqual (Domino.solve(stones, 1, 1).asObj(), [
      [
        { id = "i1"; left = 1; right = 2; turned = Turned.NO },
        { id = "i2"; left = 2; right = 1; turned = Turned.YES }
      ]
    ])

  [<Test>]
  let ``solvable stones two`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 4, 2)
    ])
    Assert.AreEqual (Domino.solve(stones, 1, 4).asObj(), [
      [
        { id = "i1"; left = 1; right = 2; turned = Turned.NO },
        { id = "i2"; left = 2; right = 4; turned = Turned.YES }
      ]
    ])

  [<Test>]
  let ``not solvable stones even`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 3, 4),
      Stone.create("i3", Turned.NO, 5, 6),
      Stone.create("i4", Turned.NO, 2, 4)
    ])
    Assert.AreEqual (Domino.solve(stones, 1, 2).asObj(), [])

  [<Test>]
  let ``not solvable stones odd`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 3, 4),
      Stone.create("i3", Turned.NO, 5, 6)
    ])
    Assert.AreEqual (Domino.solve(stones, 1, 2).asObj(), [])

  [<Test>]
  let ``solvable stones odd`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 2, 4),
      Stone.create("i3", Turned.NO, 4, 2)
    ])
    Assert.AreEqual(Domino.solve(stones, 1, 2).asObj(), [
      [
        { id = "i1"; left = 1; right = 2; turned = Turned.NO },
        { id = "i2"; left = 2; right = 4; turned = Turned.NO },
        { id = "i3"; left = 4; right = 2; turned = Turned.NO }
      ]
    ])

  [<Test>]
  let ``solvable stones even`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 2, 4),
      Stone.create("i3", Turned.NO, 4, 2),
      Stone.create("i4", Turned.NO, 2, 1)
    ])
    Assert.AreEqual (Domino.solve(stones, 1, 1).asObj(), [
      [|
        { id = "i1"; left = 1; right = 2; turned = Turned.NO },
        { id = "i2"; left = 2; right = 4; turned = Turned.NO },
        { id = "i3"; left = 4; right = 2; turned = Turned.NO },
        { id = "i4"; left = 2; right = 1; turned = Turned.NO }
      |]
    ])

  [<Test>]
  let ``not solvable stones but parcial`` =
    let stones = Stones.create([
      Stone.create("i1", Turned.NO, 1, 2),
      Stone.create("i2", Turned.NO, 2, 4),
      Stone.create("i3", Turned.NO, 4, 2),
      Stone.create("i4", Turned.NO, 2, 1),
      Stone.create("i5", Turned.NO, 9, 9)
    ])
    Assert.AreEqual(Domino.solve(stones, 1, 1).asObj(), [])

  // missing the test case for multiple solutions
