const { getNewPlayer } = require('../js/player');

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
		player.makeMove(computer, randIndex);
		expect(computer.gameboard.missedHits).toContain(randIndex);
	})

	test('makeMove() makes random move if it is a computer', () =>
	{
		computer.makeMove(player);
		expect(player.gameboard.missedHits.length).toBe(1);
	})
})
