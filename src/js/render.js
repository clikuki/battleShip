const createElement = require('./createElement');

// Will replace words inside with image of ship
const getShipElem = (shipObj) =>
{
	const startIndex = shipObj.startIndex;
	const orientationClass = shipObj.isVertical ? 'vertical' : 'horizontal';
	const shipElem = createElement('div', {
		props: {
			class: `ship ${orientationClass}`,
			style: {
				'--left': startIndex % 10,
				'--top': Math.floor(startIndex / 10),
				'--cell-num': shipObj.length,
			}
		},
		children: shipObj.type.split('')
			.map(char => createElement('span', {
				children: [char],
			})),
	})

	return shipElem;
}

const getGridLayer = (player) =>
{
	const allHitTiles = player.gameboard.missedHits.concat(player.gameboard.shipHits);
	const cells = Array.from({ length: 100 }, (_, i) =>
	{
		const cellHasBeenShot = allHitTiles.includes(i);
		const cellElem = createElement('div', {
			props: {
				class: `cell ${cellHasBeenShot ? 'shot' : ''}`,
			}
		})

		return cellElem;
	})

	const grid = createElement('div', {
		children: cells,
		props: {
			class: 'grid',
		}
	});

	return {
		grid,
		cells
	};
}

const getShipLayer = (player) =>
{
	const shipContainer = createElement('div', {
		children: player.gameboard.ships.map(getShipElem),
		props: {
			class: `ships ${player.isComputer ? 'hide' : ''}`,
		}
	})

	const shipElems = shipContainer.children;

	return {
		shipContainer,
		shipElems,
	};
}

const getGameboard = (player, containerClasses) =>
{
	const shipLayer = getShipLayer(player);
	const gridLayer = getGridLayer(player);

	const playerContainer = createElement('div', {
		children: [
			shipLayer.shipContainer,
			gridLayer.grid,
		],
		props: {
			class: containerClasses || '',
		}
	})

	return {
		mainElem: playerContainer,
		...shipLayer,
		...gridLayer,
	}
}

module.exports = {
	getGameboard,
	getShipElem,
};
