export function move(coordinate) {
	return {type: 'MOVE_FIGURE', coordinate: coordinate}
}

export function select(coordinate) {
	return {type: 'SELECT_FIGURE', coordinate: coordinate}
}

export function setState(state) {
	return {type: 'SET_STATE', state: state};
}
