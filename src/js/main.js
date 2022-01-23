const { getNewPlayer } = require('./player');
const { SHIPTYPES } = require('./ship');
const { getPlayerContainer } = require('./render');
require('../main.css');

const body = document.body;
const startGame = () =>
{
	const human = getNewPlayer(false);
	const computer = getNewPlayer(true);
	human.gameboard.setShip(SHIPTYPES.CARRIER, 43, false);
	computer.gameboard.setShip(SHIPTYPES.CARRIER, 34, true);
	const humanElemObj = getPlayerContainer(human, 'side human');
	const computerElemObj = getPlayerContainer(computer, 'side computer');

	[[human, humanElemObj], [computer, computerElemObj]].forEach(([player, elemObj]) =>
	{
		const { cells } = elemObj;
		cells.forEach((cell, i) =>
		{
			const clickEvent = () =>
			{
				cell.classList.add('shot');
				const ship = player.makeMove(i);
				if (ship)
				{
					cell.classList.add('hadShip');
				}

				cell.removeEventListener('click', clickEvent);
			}

			cell.addEventListener('click', clickEvent);
		})
	})

	body.append(humanElemObj.mainElem, computerElemObj.mainElem);
}

startGame();
