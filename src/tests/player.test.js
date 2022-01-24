const { getNewPlayer } = require('../js/player');
const { SHIPTYPES } = require('../js/ship');

describe('player properties', () =>
{
	let player;
	beforeEach(() =>
	{
		player = getNewPlayer(false);
	});

	test('returns an object', () =>
	{
		expect(typeof player).toBe('object');
		expect(Array.isArray(player)).toBeFalsy();
	})

	test('has gameboard prop', () =>
	{
		expect(typeof player.gameboard).toBe('object');
		expect(Array.isArray(player.gameboard)).toBeFalsy();
	})
})

describe('player methods', () =>
{
	let player;
	let computer;
	beforeEach(() =>
	{
		player = getNewPlayer(false);
		computer = getNewPlayer(true);
	});

	test('makeMove() makes a move on the correct tile', () =>
	{
		const randIndex = Math.floor(Math.random() * 101);
		player.makeMove(randIndex);
		expect(player.gameboard.missedHits).toContain(randIndex);
	})

	test('getMove() only returns random move if it is a computer', () =>
	{
		expect(player.getMove()).toBeNull();
	})

	test('getMove() does not fire at already shot tiles', () =>
	{
		const moves = [];
		for (let i = 0; i < 10; i++)
		{
			const move = computer.getMove(player);
			player.makeMove(move);
			expect(player.gameboard.missedHits.length).toBe(i + 1);
			expect(moves).not.toContain(move);
			moves.push(move);
		}
	})

	test('checkWin() returns true if all ships are sunk', () =>
	{
		player.gameboard.setShip(SHIPTYPES.PATROLBOAT, 13, false);
		player.gameboard.setShip(SHIPTYPES.PATROLBOAT, 45, true);
		expect(player.checkWin()).toBeFalsy();
		player.makeMove(13);
		player.makeMove(14);
		player.makeMove(45);
		player.makeMove(55);
		expect(player.checkWin()).toBeTruthy();
	})
})
