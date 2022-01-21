const SHIPTYPES = {
	CARRIER: 'CARRIER',
	BATTLESHIP: 'BATTLESHIP',
	DESTROYER: 'DESTROYER',
	SUBMARINE: 'SUBMARINE',
	PATROLBOAT: 'PATROLBOAT',
}

const shipLengths = {
	CARRIER: 5,
	BATTLESHIP: 4,
	DESTROYER: 3,
	SUBMARINE: 3,
	PATROLBOAT: 2,
}

function hit(index)
{
	if (!this.indices.includes(index)) return false;
	this.hitIndices.push(index);
	if (checkIfSunk(this)) this.isSunk = true;
	return true;
}

const checkIfSunk = (ship) =>
{
	const sameLen = ship.indices.length === ship.hitIndices.length;
	if (!sameLen) return false;
	const hasAllVals = ship.hitIndices.every(val => ship.indices.includes(val));
	return hasAllVals;
}

const getIndices = (type, startIndex, isVertical) =>
{
	const indices = [];
	const length = shipLengths[type];

	for (let i = 0; i < length; i++)
	{
		const index = startIndex + ((isVertical ? 10 : 1) * i);
		indices.push(index);
	}

	return indices;
};

const getNewShip = (type, startIndex, isVertical) =>
{
	if (!SHIPTYPES[type]) return null;

	const length = shipLengths[type];
	const indices = getIndices(type, startIndex, isVertical);
	const hitIndices = [];

	return {
		type,
		length,
		isVertical,
		isSunk: false,
		indices,
		hitIndices,
		hit,
	}
}

module.exports = {
	getNewShip,
	SHIPTYPES
};
