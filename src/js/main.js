const { getNewPlayer } = require('./player');
const { getNewShip, SHIPTYPES } = require('./ship');
const { getGameboard, getShipElem } = require('./render');
const createElement = require('./createElement');
const modal = require('./modal');
require('../main.css');

const setShip = (player, type, startIndex, isVertical) =>
{
	const shipObj = player.gameboard.setShip(type, startIndex, isVertical);
	const shipElem = getShipElem(shipObj);
	player.elems.shipContainer.append(shipElem);
	return {
		elem: shipElem,
		...shipObj,
	}
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
	const fakeBoard = getGameboard(fakePlayer, 'placeShipBoard');
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

	const curShipTypeDisplay = createElement('span', {
		props: {
			class: 'shipTypeDisplay',
		}
	});

	modal.show(
		false,
		'Place your ships!',
		curShipTypeDisplay,
		switchOrientationBtn,
		fakeBoard.mainElem,
	);

	const removeAllEventListeners = (eventNodePairs) =>
	{
		for (const [cell, clickEvent, hoverEvent] of eventNodePairs)
		{
			cell.removeEventListener('click', clickEvent);
			cell.removeEventListener('mouseenter', hoverEvent);
		}
	}

	for (const type in SHIPTYPES)
	{
		curShipTypeDisplay.textContent = `Current Ship: ${type}`;

		const shipParams = await new Promise(resolve =>
		{
			let shipElem;
			const eventNodePairs = fakeBoard.cells.map((cell, i) =>
			{
				const clickEvent = () =>
				{
					if (!shipElem) return;
					const shipObj = getNewShip(type, i, isVertical);
					fakePlayer.elems = fakeBoard;
					setShip(fakePlayer, type, i, isVertical);
					removeAllEventListeners(eventNodePairs);
					resolve(shipObj);
				}

				const mouseenter = () =>
				{
					if (shipElem)
					{
						shipElem.remove();
						shipElem = null;
					}

					const shipObj = getNewShip(type, i, isVertical);
					if (isVertical && shipObj.indices.some(index => index >= 100)) return;
					if (!isVertical && (i % 10) + shipObj.length > 10) return;
					if (ships.some((otherShip) =>
					{
						return shipObj.indices.some(index =>
						{
							return otherShip.indices.some(otherIndex =>
							{
								return index === otherIndex;
							});
						})
					})) return;

					shipElem = getShipElem(shipObj);
					fakeBoard.shipContainer.append(shipElem);
				}

				cell.addEventListener('click', clickEvent);
				cell.addEventListener('mouseenter', mouseenter);
				return [cell, clickEvent, mouseenter];
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
	for (const shipObj of shipPositions)
	{
		setShip(humanObj, shipObj.type, shipObj.startIndex, shipObj.isVertical);
	}

	setClickEvents(humanObj, computerObj);
}

startGame();
