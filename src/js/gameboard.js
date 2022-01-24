const { getNewShip } = require('../js/ship');

function setShip(type, startIndex, isVertical)
{
	const ship = getNewShip(type, startIndex, isVertical);

	// Prevent ship from going over the edge
	if ((isVertical && ship.indices.some(index => index >= 100))
		|| (!isVertical && (startIndex % 10) + ship.length > 10)) return null;

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

function removeShip(ship)
{
	const shipContainerIndex = this.ships.findIndex(x => x === ship);
	this.ships.splice(shipContainerIndex, 1);
	for (const index of ship.indices)
	{
		this.tiles[index] = null;
	}
}

function recieveAttack(index)
{
	if (index === undefined) return 'attack index required';
	if (this.missedHits.concat(this.shipHits).includes(index)) return 'tile has already been hit';
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
		removeShip,
		recieveAttack,
	}
}

module.exports = {
	getNewBoard,
}
