const { getNewPlayer } = require('./player');
const { SHIPTYPES } = require('./ship');
const { getGameboard, getShipElem } = require('./render');
const createElement = require('./createElement');
const modal = require('./modal');
require('../main.css');

const setShip = (player, type, startIndex, isVertical) =>
{
	const shipObj = player.gameboard.setShip(type, startIndex, isVertical);
	if (!shipObj) return shipObj;

	const shipElem = getShipElem(shipObj);
	player.elems.shipContainer.append(shipElem);
	return {
		elem: shipElem,
		...shipObj,
	}
}

const removeShip = (player, ship) =>
{
	player.gameboard.removeShip(ship);
	ship.elem.remove();
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
	fakePlayer.elems = fakeBoard;
	const ships = [];
	let isVertical = false;

	const curShipTypeDisplay = createElement('span', {
		props: {
			class: 'shipTypeDisplay',
		}
	});

	const removeListeners = () =>
	{
		for (const node of fakeBoard.cells)
		{
			node.onclick = null;
			node.onmouseenter = null;
			node.onmouseleave = null;
		}
	}

	modal.show(
		false,
		'Place your ships!',
		curShipTypeDisplay,
		createElement('button', {
			// Btn to toggle between vertical and horizontal
			children: [
				'Change orientation: False',
			],
			props: {
				class: 'switchBtn',
				onclick: (ev) =>
				{
					isVertical = !isVertical;
					const isVerticalStr = isVertical.toString();
					const newText = `Change orientation: ${isVerticalStr[0].toUpperCase()}${isVerticalStr.slice(1)}`;
					ev.target.textContent = newText;
				}
			}
		}),
		fakeBoard.mainElem,
	);

	for (const type in SHIPTYPES)
	{
		curShipTypeDisplay.textContent = `Current Ship: ${type}`;

		const shipParams = await new Promise(resolve =>
		{
			let ship;
			fakeBoard.cells.forEach((cell, i) =>
			{
				const clickEvent = () =>
				{
					if (ship) resolve([type, i, isVertical]);
				}

				const mouseEnterEvent = () =>
				{
					if (ship)
					{
						removeShip(fakePlayer, ship)
						ship = null;
					}

					ship = setShip(fakePlayer, type, i, isVertical);
				}

				const mouseLeaveEvent = () =>
				{
					if (!ship) return;
					removeShip(fakePlayer, ship)
					ship = null;
				}

				cell.onclick = clickEvent;
				cell.onmouseenter = mouseEnterEvent;
				cell.onmouseleave = mouseLeaveEvent;
			})
		});

		ships.push(shipParams);
	}

	removeListeners();
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
