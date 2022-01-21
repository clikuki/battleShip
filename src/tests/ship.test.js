const { getNewShip, SHIPTYPES } = require('../js/ship');

let ship;
beforeEach(() =>
{
	ship = getNewShip(SHIPTYPES.CARRIER, 0, false);
});

describe('ship properties', () =>
{
	test('returns an object', () =>
	{
		expect(typeof ship).toBe('object');
		expect(Array.isArray(ship)).toBeFalsy();
	})

	test('has indices array', () =>
	{
		expect(Array.isArray(ship.indices)).toBeTruthy();
	})

	test('indices array has correct indices', () =>
	{
		const sort = (arr) => arr.sort((a, b) => a - b);

		// Test horizontal
		const expectedHorizontalIndices = [0, 1, 2, 3, 4];
		expect(sort(ship.indices)).toEqual(expectedHorizontalIndices);

		// Test vertical
		ship = getNewShip(SHIPTYPES.CARRIER, 5, true);
		const expectedVerticalIndices = [5, 15, 25, 35, 45];
		expect(sort(ship.indices)).toEqual(expectedVerticalIndices);
	})

	test('fails when no type is passed in', () =>
	{
		expect(getNewShip()).toBeNull();
	})
})

describe('ship methods', () =>
{
	test('hit() correctly sets hit index', () =>
	{
		ship.hit(0);
		expect(ship.hitIndices).toContain(0);
		ship.hit(3);
		expect(ship.hitIndices).toContain(3);
	})

	test('hit() does not add indices outside of the ship', () =>
	{
		ship.hit(6);
		expect(ship.hitIndices).not.toContain(6);
	})

	test('hit() sets sunk prop if all indices are hit', () =>
	{
		expect(ship.isSunk).toBeFalsy();

		for (let i = 0; i < 5; i++)
		{
			ship.hit(i);
		}

		expect(ship.isSunk).toBeTruthy();
	})
})
