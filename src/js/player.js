const { getNewBoard } = require('../js/gameboard');

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

const getNewPlayer = (isComputer) =>
{
	return {
		gameboard: getNewBoard(),
		isComputer,
		makeMove,
		getMove,
	}
}

module.exports = {
	getNewPlayer
}
