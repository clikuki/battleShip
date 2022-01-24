const { getNewPlayer } = require('./player');
const { SHIPTYPES } = require('./ship');
const { getGameboard, getShipElem } = require('./render');
const createElement = require('./createElement');
const modal = require('./modal');
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

const getShipPositions = async () =>
{
	const fakePlayer = getNewPlayer(false);
	fakePlayer.elems = getGameboard(fakePlayer, 'placeShipBoard');
	const ships = [];

	let isVertical = false;
	const switchOrientationBtn = createElement('button', {
		children: [
			'Change orientation: False',
		],
		props: {
			class: 'switchBtn',
			onclick: () =>
			{
				isVertical = !isVertical;
				const isVerticalStr = isVertical.toString();
				const newText = `Change orientation: ${isVerticalStr[0].toUpperCase()}${isVerticalStr.slice(1)}`;
				switchOrientationBtn.textContent = newText;
			}
		}
	})

	const curShipTypeDisplay = createElement('span');

	modal.show(
		false,
		'Place your ships!',
		curShipTypeDisplay,
		switchOrientationBtn,
		fakePlayer.elems.mainElem,
	);

	const removeAllEventListeners = (eventNodePairs) =>
	{
		for (const [cell, clickEvent, hoverEvent] of eventNodePairs)
		{
			cell.removeEventListener('click', clickEvent);
			cell.removeEventListener('mouseover', hoverEvent);
		}
	}

	for (const type in SHIPTYPES)
	{
		curShipTypeDisplay.textContent = `Current ship: ${type}`;

		const shipParams = await new Promise(resolve =>
		{
			const eventNodePairs = fakePlayer.elems.cells.map((cell, i) =>
			{
				const clickEvent = () =>
				{
					removeAllEventListeners(eventNodePairs);
					resolve([type, i, isVertical]);
				}

				const hoverEvent = () =>
				{

				}

				cell.addEventListener('click', clickEvent);
				cell.addEventListener('mouseover', hoverEvent);
				return [cell, clickEvent, hoverEvent];
			})
		});

		ships.push(shipParams);
	}

	modal.hide();

	return ships;
}

const startGame = async () =>
{
	const gameContainer = document.querySelector('main');
	const humanObj = getNewPlayer(false);
	const computerObj = getNewPlayer(true);
	humanObj.elems = getGameboard(humanObj, 'side human');
	computerObj.elems = getGameboard(computerObj, 'side computer');
	gameContainer.replaceChildren(humanObj.elems.mainElem, computerObj.elems.mainElem);

	const shipPositions = await getShipPositions();
	for (const [type, startIndex, isVertical] of shipPositions)
	{
		setShip(humanObj, type, startIndex, isVertical);
	}

	setClickEvents(humanObj, computerObj);
}

startGame();
