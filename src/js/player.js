const { getNewBoard } = require('../js/gameboard');

function makeMove(otherPlayer, attackIndex)
{
	const otherGameboard = otherPlayer.gameboard;
	const hitTiles = otherGameboard.missedHits.concat(otherGameboard.shipHits);

	if (this.isComputer)
	{
		// TODO: Make computer move smarter
		do
		{
			attackIndex = Math.floor(Math.random() * 101);
		}
		while (hitTiles.includes(attackIndex));
	}

	return otherGameboard.recieveAttack(attackIndex);
}

const getNewPlayer = (isComputer) =>
{
	return {
		gameboard: getNewBoard(),
		isComputer,
		makeMove,
	}
}

module.exports = {
	getNewPlayer
}
