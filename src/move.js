import {Map,List} from 'immutable';

const letters = List(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
const lettersIndex = Map(letters.zip(new Array(8).keys()));
const indexLetters = lettersIndex.flip();

export function go(coordinate, colls, rows) {
	if (!coordinate) return null;

	const newIndex = lettersIndex.get(coordinate[0]) + colls;
	const newColl = newIndex <= 7 && newIndex >= 0 ? indexLetters.get(newIndex) : null;
	const newRow = parseInt(coordinate[1]) + rows;

	return newRow <= 8 && newRow >= 1 && newColl ? newColl + newRow : null;
}

export function goUp(coordinate, fields = 1) {
	return coordinate ? go(coordinate, 0, fields) : null;
}

export function goDown(coordinate, fields = 1) {
	return coordinate ? go(coordinate, 0, -fields) : null;
}

export function goRight(coordinate, fields = 1) {
	return coordinate ? go(coordinate, fields, 0) : null;
}

export function goLeft(coordinate, fields = 1) {
	return coordinate ? go(coordinate, -fields, 0) : null;
}

export function goRightUp(coordinate, fields = 1) {
	return coordinate ? go(coordinate, fields, fields) : null;
}

export function goRightDown(coordinate, fields = 1) {
	return coordinate ? go(coordinate, fields, -fields) : null;
}

export function goLeftUp(coordinate, fields = 1) {
	return coordinate ? go(coordinate, -fields, fields) : null;
}

export function goLeftDown(coordinate, fields = 1) {
	return coordinate ? go(coordinate, -fields, -fields) : null;
}

export function isCoordinateOccupied(coordinate, figures) {
	return figures.has(coordinate);
}

export function isCoordinateOccupiedByColor(coordinate, figures, color) {
	return isCoordinateOccupied(coordinate, figures) && figures.getIn([coordinate, 'player']) === color;
}
