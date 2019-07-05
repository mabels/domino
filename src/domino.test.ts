import { Turned, Stone, Stones, Domino } from './index';

test('find combination list should be empty', () => {
  const stones = Stones.create([]);
  expect(stones.firstLast(4, 2)).toEqual([]);
});

test('find combination on list of one stone ', () => {
  const stones = Stones.create([Stone.create('id', Turned.NO, 1, 2)]);
  expect(stones.firstLast(7, 4)).toEqual([]);
  expect(stones.firstLast(1, 2).map(i => i.asObj)).toEqual([
    [{ left: 1, right: 2, id: 'id', turned: 'NO' }],
  ]);
  expect(stones.firstLast(2, 1).map(i => i.asObj)).toEqual([
    [{ left: 2, right: 1, id: 'id', turned: 'YES' }],
  ]);
});

test('find combination list should be empty', () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 3, 4),
    Stone.create('i3', Turned.NO, 5, 6),
    Stone.create('i4', Turned.NO, 7, 8),
  ]);
  for (let i = 0; i < 10; ++i) {
    expect(stones.firstLast(i, i)).toEqual([]);
  }
});

test('find combination list should be one', () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 2, 1),
    Stone.create('i3', Turned.NO, 6, 4),
  ]);
  expect(stones.firstLast(1, 1).map(i => i.asObj)).toEqual([
    [
      { id: 'i1', left: 1, right: 2, turned: 'NO' },
      { id: 'i3', left: 6, right: 4, turned: 'NO' },
      { id: 'i2', left: 2, right: 1, turned: 'NO' },
    ],
  ]);
});

test('find combination list should be one without turn', () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 2, 1),
    Stone.create('i2', Turned.NO, 1, 2),
    Stone.create('i3', Turned.NO, 6, 4),
  ]);
  expect(stones.firstLast(1, 1).map(i => i.asObj)).toEqual([
    [
      { id: 'i2', left: 1, right: 2, turned: 'NO' },
      { id: 'i3', left: 6, right: 4, turned: 'NO' },
      { id: 'i1', left: 2, right: 1, turned: 'NO' },
    ],
  ]);
});

test('find combination list should be one with turn', () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 1, 2),
    Stone.create('i3', Turned.NO, 6, 4),
  ]);
  expect(stones.firstLast(1, 1).map(i => i.asObj)).toEqual([
    [
      { id: 'i1', left: 1, right: 2, turned: 'NO' },
      { id: 'i3', left: 6, right: 4, turned: 'NO' },
      { id: 'i2', left: 2, right: 1, turned: 'YES' },
    ],
  ]);
});

test('find combination list should be more than one', () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 2, 1),
    Stone.create('i3', Turned.NO, 4, 2),
    Stone.create('i4', Turned.NO, 7, 9),
  ]);
  // console.log(JSON.stringify(stones.firstLast(1, 2).map(i => i.asObj)));
  const [f1, f2] = stones.firstLast(1, 2).map(i => i.asObj);
  expect(f1).toEqual([
    { id: 'i1', turned: Turned.NO, left: 1, right: 2 },
    { id: 'i2', turned: Turned.NO, left: 2, right: 1 },
    { id: 'i4', turned: Turned.NO, left: 7, right: 9 },
    { id: 'i3', turned: Turned.NO, left: 4, right: 2 },
  ]);
  expect(f2).toEqual([
    { id: 'i1', turned: Turned.NO, left: 1, right: 2 },
    { id: 'i3', turned: Turned.NO, left: 4, right: 2 },
    { id: 'i4', turned: Turned.NO, left: 7, right: 9 },
    { id: 'i2', turned: Turned.YES, left: 1, right: 2 },
  ]);
});

test(`not solvable stones empty`, () => {
  const stones = Stones.create([
  ]);
  expect(Domino.solve(stones, 1, 2).asObj).toEqual([]);
});

test(`not solvable stones one`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
  ]);
  expect(Domino.solve(stones, 3, 2).asObj).toEqual([]);
});

test(`solvable stones one`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
  ]);
  expect(Domino.solve(stones, 2, 1).asObj).toEqual([
    [{ id: 'i1', left: 2, right: 1, turned: 'YES'}]
  ]);
});

test(`not solvable stones two`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 1, 2),
  ]);
  expect(Domino.solve(stones, 2, 1).asObj).toEqual([]);
});

test(`solvable stones two equal`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 1, 2),
  ]);
  expect(Domino.solve(stones, 2, 2).asObj).toEqual([
    [
      { id: 'i1', left: 2, right: 1, turned: 'YES' },
      { id: 'i2', left: 1, right: 2, turned: 'NO'}
    ]
  ]);
});

test(`solvable stones two equal`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 1, 2),
  ]);
  expect(Domino.solve(stones, 1, 1).asObj).toEqual([
    [
      { id: 'i1', left: 1, right: 2, turned: 'NO' },
      { id: 'i2', left: 2, right: 1, turned: 'YES'}
    ]
  ]);
});

test(`solvable stones two`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 4, 2),
  ]);
  expect(Domino.solve(stones, 1, 4).asObj).toEqual([
    [
      { id: 'i1', left: 1, right: 2, turned: 'NO' },
      { id: 'i2', left: 2, right: 4, turned: 'YES'}
    ]
  ]);
});

test(`not solvable stones even`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 3, 4),
    Stone.create('i3', Turned.NO, 5, 6),
    Stone.create('i4', Turned.NO, 2, 4),
  ]);
  expect(Domino.solve(stones, 1, 2).asObj).toEqual([]);
});

test(`not solvable stones odd`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 3, 4),
    Stone.create('i3', Turned.NO, 5, 6),
  ]);
  expect(Domino.solve(stones, 1, 2).asObj).toEqual([]);
});

test(`solvable stones odd`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 2, 4),
    Stone.create('i3', Turned.NO, 4, 2),
  ]);
  expect(Domino.solve(stones, 1, 2).asObj).toEqual([
    [
      { id: 'i1', left: 1, right: 2, turned: 'NO' },
      { id: 'i2', left: 2, right: 4, turned: 'NO' },
      { id: 'i3', left: 4, right: 2, turned: 'NO' },
    ]
  ]);
});

test(`solvable stones even`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 2, 4),
    Stone.create('i3', Turned.NO, 4, 2),
    Stone.create('i4', Turned.NO, 2, 1),
  ]);
  expect(Domino.solve(stones, 1, 1).asObj).toEqual([
    [
      { id: 'i1', left: 1, right: 2, turned: 'NO' },
      { id: 'i2', left: 2, right: 4, turned: 'NO' },
      { id: 'i3', left: 4, right: 2, turned: 'NO' },
      { id: 'i4', left: 2, right: 1, turned: 'NO' },
    ]
  ]);
});

test(`not solvable stones but parcial`, () => {
  const stones = Stones.create([
    Stone.create('i1', Turned.NO, 1, 2),
    Stone.create('i2', Turned.NO, 2, 4),
    Stone.create('i3', Turned.NO, 4, 2),
    Stone.create('i4', Turned.NO, 2, 1),
    Stone.create('i5', Turned.NO, 9, 9),
  ]);
  expect(Domino.solve(stones, 1, 1).asObj).toEqual([]);
});

// missing the test case for multiple solutions
