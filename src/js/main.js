const { getNewPlayer } = require('./player');
const { SHIPTYPES } = require('./ship');
const { getPlayerContainer, getShipElem } = require('./render');
require('../main.css');

const setShip = (player, type, startIndex, isVertical) =>
{
	const shipObj = player.gameboard.setShip(type, startIndex, isVertical);
	const shipElem = getShipElem(shipObj);
	player.elems.shipContainer.append(shipElem);
}

const setClickEvents = (humanObj, computerObj) =>
{
	const updateCell = (player, cell, i) =>
	{
		cell.classList.add('shot');
		const ship = player.makeMove(i);
		if (ship)
		{
			cell.classList.add('hadShip');
		}
	}

	computerObj.elems.cells.forEach((computerCell, i) =>
	{
		const clickEvent = () =>
		{
			const randIndex = computerObj.getMove(humanObj);
			const playerCell = humanObj.elems.cells[randIndex];
			updateCell(computerObj, computerCell, i);
			updateCell(humanObj, playerCell, randIndex);
			computerCell.removeEventListener('click', clickEvent);
		}

		computerCell.addEventListener('click', clickEvent);
	})
}

const startGame = () =>
{
	const humanObj = getNewPlayer(false);
	const computerObj = getNewPlayer(true);
	humanObj.elems = getPlayerContainer(humanObj, 'side human');
	computerObj.elems = getPlayerContainer(computerObj, 'side computer');

	// Set ships in advance for testing
	setShip(humanObj, SHIPTYPES.CARRIER, 43, false);
	setShip(computerObj, SHIPTYPES.CARRIER, 34, true);

	setClickEvents(humanObj, computerObj);

	document.body.replaceChildren(humanObj.elems.mainElem, computerObj.elems.mainElem);
}

startGame();
