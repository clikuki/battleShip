const { getNewBoard } = require('../js/gameboard');
const { SHIPTYPES } = require('./ship');

function makeMove(attackIndex)
{
	if (typeof attackIndex === 'number')
	{
		return this.gameboard.recieveAttack(attackIndex);
	}
}

function getMove(human)
{
	if (!this.isComputer) return null;
	const allHitTiles = human.gameboard.missedHits.concat(human.gameboard.shipHits);
	while (true)
	{
		const randTile = Math.floor(Math.random() * 100);
		if (!allHitTiles.includes(randTile))
		{
			return randTile;
		}
	}
}

// If player is  a computer, then it sets ships on its board
function generateShips()
{
	if (!this.isComputer) return;
	for (const type in SHIPTYPES)
	{
		let ship;
		while (!ship)
		{
			const randIndex = Math.floor(Math.random() * 101);
			for (const isVertical of [false, true])
			{
				ship = this.gameboard.setShip(type, randIndex, isVertical);
				if (ship) break;
			}
		}
	}
}

function checkWin()
{
	const ships = this.gameboard.ships;
	const sunkenShips = this.gameboard.sunkenShips;
	return ships.length === sunkenShips.length;
}

const getNewPlayer = (isComputer) =>
{
	return {
		gameboard: getNewBoard(),
		isComputer,
		makeMove,
		getMove,
		generateShips,
		checkWin,
	}
}

module.exports = {
	getNewPlayer
}
