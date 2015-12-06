export function move(state, coordinate) {
	let selectedCoordinate = state.get('selected');

	return selectedCoordinate && selectedCoordinate != coordinate
		? state.delete('selected')
			.setIn(['figures', coordinate], state.getIn(['figures', selectedCoordinate]))
			.deleteIn(['figures', selectedCoordinate])
			.set('player', state.get('player') == 'white' ? 'black' : 'white')
		: state;
}

export function select(state, coordinate) {
	return state.getIn(['figures', coordinate, 'player']) == state.get('player')
		? (state.get('selected') == coordinate ? state.delete('selected') : state.set('selected', coordinate))
		: state;
}

export function setState(state, newState) {
	return state.merge(newState);
}
