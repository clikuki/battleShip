const { getNewShip } = require('../js/ship');

function setShip(type, startIndex, isVertical)
{
	const ship = getNewShip(type, startIndex, isVertical);

	for (const index of ship.indices)
	{
		if (!this.tiles[index]) this.tiles[index] = ship;
		// Remove previously set tiles
		else
		{
			for (const index of ship.indices)
			{
				if (this.tiles[index] === ship)
				{
					this.tiles[index] = null;
				}
			}

			return null;
		}
	}

	this.ships.push(ship);
	return ship;
}

function recieveAttack(index)
{
	const ship = this.tiles[index];

	if (ship?.hit(index))
	{
		this.shipHits.push(index);
		if (ship.isSunk)
		{
			this.sunkenShips.push(ship);
			if (this.sunkenShips.length === this.ships.length)
			{
				this.allShipsHaveSunk = true;
			}
		}
	}
	else this.missedHits.push(index);

	return ship;
}

const getNewBoard = () =>
{
	const tiles = Array.from({ length: 100 }, () => null);

	return {
		allShipsHaveSunk: false,
		sunkenShips: [],
		tiles,
		ships: [],
		missedHits: [],
		shipHits: [],
		setShip,
		recieveAttack,
	}
}

module.exports = {
	getNewBoard,
}
