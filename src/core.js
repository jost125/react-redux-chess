import {Map,List} from 'immutable';
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
} from './move';

export function move(state, coordinate) {
	let selectedCoordinate = state.get('selected');

	return selectedCoordinate && selectedCoordinate != coordinate
		? state.delete('selected')
			.setIn(['figures', coordinate], state.getIn(['figures', selectedCoordinate]))
			.deleteIn(['figures', selectedCoordinate])
			.delete('moves')
			.set('player', state.get('player') == 'white' ? 'black' : 'white')
		: state;
}

export function select(state, coordinate) {
	const figure = state.getIn(['figures', coordinate]);

	return figure && figure.get('player') == state.get('player')
		? (
			state.get('selected') == coordinate
				? state.delete('selected').delete('moves')
				: state.set('selected', coordinate).set('moves', getPossibleMoves(state, figure, coordinate))
		)
		: state;
}

export function setState(state, newState) {
	return state.merge(newState);
}

function getPossibleMoves(state, figure, coordinate) {
	switch (figure.get('type')) {
		case 'pawn': return getPawnPossibleMoves(state.get('figures'), figure.get('player'), coordinate);
		case 'knight': return getKnightPossibleMoves(state.get('figures'), figure.get('player'), coordinate);
	}
	return new List();
}

function getEnemyColor(figureColor) {
	return figureColor === 'white' ? 'black' : 'white';
}

function getPawnPossibleMoves(figures, figureColor, coordinate) {
	const enemyColor = getEnemyColor(figureColor);
	const isStaringPosition = (figureColor === 'white' && coordinate[1] === "2") ||
		(figureColor === 'black' && coordinate[1] === "7");

	const forward = (coordinate, fields = 1) => figureColor == 'white' ? goUp(coordinate, fields) : goDown(coordinate, fields);
	const forwardRight = (coordinate, fields = 1) => figureColor == 'white' ? goRightUp(coordinate, fields) : goRightDown(coordinate, fields);
	const forwardLeft = (coordinate, fields = 1) => figureColor == 'white' ? goLeftUp(coordinate, fields) : goLeftDown(coordinate, fields);

	let moves = List();
	if (!isCoordinateOccupied(forward(coordinate), figures)) {
		moves = moves.push(forward(coordinate));
		if (isStaringPosition && !isCoordinateOccupied(forward(coordinate, 2), figures)) {
			moves = moves.push(forward(coordinate, 2));
		}
	}
	if (isCoordinateOccupiedByColor(forwardRight(coordinate), figures, enemyColor)) {
		moves = moves.push(forwardRight(coordinate));
	}
	if (isCoordinateOccupiedByColor(forwardLeft(coordinate), figures, enemyColor)) {
		moves = moves.push(forwardLeft(coordinate));
	}

	return moves;
}

function getKnightPossibleMoves(figures, figureColor, coordinate) {
	const enemyColor = getEnemyColor(figureColor);

	let moves = List();

	const pushIfPossible = (row, coll) => {
		const possibleMove = go(coordinate, row, coll);
		if (isCoordinateOccupiedByColor(possibleMove, figures, enemyColor) || !isCoordinateOccupied(possibleMove, figures)) {
			moves = moves.push(possibleMove);
		}
	};

	pushIfPossible(1, 2);
	pushIfPossible(-1, 2);
	pushIfPossible(1, -2);
	pushIfPossible(-1, -2);
	pushIfPossible(2, 1);
	pushIfPossible(-2, 1);
	pushIfPossible(2, -1);
	pushIfPossible(-2, -1);

	return moves;
}
