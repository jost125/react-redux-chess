import {Map} from 'immutable';
import {select, move, setState} from '../src/core';

export default function reducer(state = Map(), action) {
	switch (action.type) {
		case 'SELECT_FIGURE':
			return state.set('board', select(state.get('board'), action.coordinate));
		case 'MOVE_FIGURE':
			return state.set('board', move(state.get('board'), action.coordinate));
		case 'SET_STATE':
			return setState(state, action.state);
	}
	return state;
}
