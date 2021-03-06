const { getNewBoard } = require('../js/gameboard');
const { SHIPTYPES } = require('../js/ship');

let board;
beforeEach(() =>
{
	board = getNewBoard();
});

describe('gameboard properties', () =>
{
	test('returns an object', () =>
	{
		expect(typeof board).toBe('object');
		expect(Array.isArray(board)).toBeFalsy();
	})

	test('has tiles array', () =>
	{
		expect(Array.isArray(board.tiles)).toBeTruthy();
	})
})

describe('gameboard methods', () =>
{
	test('setShip() adds ship to correct location', () =>
	{
		// Horizontal
		const ship1 = board.setShip(SHIPTYPES.PATROLBOAT, 15, false);
		expect(board.tiles[15]).toBe(ship1);
		expect(board.tiles[16]).toBe(ship1);

		// Vertical
		const ship2 = board.setShip(SHIPTYPES.PATROLBOAT, 14, true);
		expect(board.tiles[14]).toBe(ship2);
		expect(board.tiles[24]).toBe(ship2);
	})

	test('setShip() fails when ship goes over the edge', () =>
	{
		// Horizontal
		expect(board.setShip(SHIPTYPES.PATROLBOAT, 9, false)).toBeNull();

		// Vertical
		expect(board.setShip(SHIPTYPES.PATROLBOAT, 90, true)).toBeNull();
	})

	test('setShip() fails when there is a ship in the way', () =>
	{
		const ship1 = board.setShip(SHIPTYPES.SUBMARINE, 15, false);
		const ship2 = board.setShip(SHIPTYPES.SUBMARINE, 16, false);

		expect(ship1).toBeTruthy();
		expect(ship2).toBeNull();
	})

	test('removeShip() removes ship', () =>
	{
		const ship = board.setShip(SHIPTYPES.SUBMARINE, 15, false);
		board.removeShip(ship);
		expect(board.ships).not.toContain(ship);
	})

	test('recieveAttack() correctly hits ship', () =>
	{
		const ship = board.setShip(SHIPTYPES.SUBMARINE, 0, false);
		expect(board.recieveAttack(0)).toBe(ship);
		expect(board.recieveAttack(1)).toBe(ship);
		expect(board.recieveAttack(2)).toBe(ship);
	})

	test('recieveAttack() accepts misses', () =>
	{
		expect(board.recieveAttack(0)).toBeNull();
	})

	test('recieveAttack() records hits', () =>
	{
		const sort = (arr) => arr.sort((a, b) => a - b);
		board.setShip(SHIPTYPES.SUBMARINE, 0, false);

		// Successful hits
		board.recieveAttack(0);
		board.recieveAttack(1);
		board.recieveAttack(2);
		expect(sort(board.shipHits)).toEqual([0, 1, 2]);

		// Missed hits
		board.recieveAttack(15);
		board.recieveAttack(34);
		board.recieveAttack(12);
		expect(sort(board.missedHits)).toEqual([12, 15, 34]);
	})

	test('recieveAttack() fails when no index is passed', () =>
	{
		expect(board.recieveAttack()).toMatch(/index/i);
	})

	test('recieveAttack() fails if tile has already been hit', () =>
	{
		const randIndex = Math.floor(Math.random() * 101);
		board.recieveAttack(randIndex);
		expect(board.recieveAttack(randIndex)).toMatch(/hit/i);
	})
})
