import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {
	go,
	goUp,
	goDown,
	goRight,
	goLeft,
	goRightUp,
	goRightDown,
	goLeftUp,
	goLeftDown,
	isCoordinateOccupied,
	isCoordinateOccupiedByColor
} from '../src/move';

describe('move logic', () => {

	it('go', () => {
		const coordinate = 'A1';
		expect(go(coordinate, 1, 1)).to.equal('B2');
		expect(go(coordinate, 1, 2)).to.equal('B3');
		expect(go(coordinate, -1, 0)).to.equal(null);
	});

	it('goUp', () => {
		const coordinate = 'A1';
		expect(goUp(coordinate)).to.equal('A2');
		expect(goUp(coordinate, 7)).to.equal('A8');
		expect(goUp(coordinate, 8)).to.equal(null);
	});

	it('goDown', () => {
		const coordinate = 'A8';
		expect(goDown(coordinate)).to.equal('A7');
		expect(goDown(coordinate, 7)).to.equal('A1');
		expect(goDown(coordinate, 8)).to.equal(null);
	});

	it('goRight', () => {
		const coordinate = 'A1';
		expect(goRight(coordinate)).to.equal('B1');
		expect(goRight(coordinate, 7)).to.equal('H1');
		expect(goRight(coordinate, 8)).to.equal(null);
	});

	it('goLeft', () => {
		const coordinate = 'H1';
		expect(goLeft(coordinate)).to.equal('G1');
		expect(goLeft(coordinate, 7)).to.equal('A1');
		expect(goLeft(coordinate, 8)).to.equal(null);
	});

	it('goRightUp', () => {
		const coordinate = 'A1';
		expect(goRightUp(coordinate)).to.equal('B2');
		expect(goRightUp(coordinate, 7)).to.equal('H8');
		expect(goRightUp(coordinate, 8)).to.equal(null);
	});

	it('goRightDown', () => {
		const coordinate = 'A8';
		expect(goRightDown(coordinate)).to.equal('B7');
		expect(goRightDown(coordinate, 7)).to.equal('H1');
		expect(goRightDown(coordinate, 8)).to.equal(null);
	});

	it('goLeftUp', () => {
		const coordinate = 'H1';
		expect(goLeftUp(coordinate)).to.equal('G2');
		expect(goLeftUp(coordinate, 7)).to.equal('A8');
		expect(goLeftUp(coordinate, 8)).to.equal(null);
	});


	it('goLeftDown', () => {
		const coordinate = 'H8';
		expect(goLeftDown(coordinate)).to.equal('G7');
		expect(goLeftDown(coordinate, 7)).to.equal('A1');
		expect(goLeftDown(coordinate, 8)).to.equal(null);
	});
	
	it('isCoordinateOccupied', () => {
		const figures = fromJS({
			'A1': {'type': 'pawn', 'player': 'white', 'id': 'pawn-1-white'}
		});

		expect(isCoordinateOccupied('A1', figures)).to.equal(true);
		expect(isCoordinateOccupied('A2', figures)).to.equal(false);
	});

	it('isCoordinateOccupiedByColor', () => {
		const figures = fromJS({
			'A1': {'type': 'pawn', 'player': 'white', 'id': 'pawn-1-white'}
		});

		expect(isCoordinateOccupiedByColor('A1', figures, 'white')).to.equal(true);
		expect(isCoordinateOccupiedByColor('A2', figures, 'white')).to.equal(false);
		expect(isCoordinateOccupiedByColor('A1', figures, 'black')).to.equal(false);
	});

});