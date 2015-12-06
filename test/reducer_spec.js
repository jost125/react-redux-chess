import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
import {setState, select, move} from '../src/actionCreator';

describe('reducer', () => {

	it('handles SELECT_FIGURE', () => {
		const state = fromJS({
			'board': {
				figures: {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				player: 'white'
			}
		});
		const action = select('A2');
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			'board': {
				figures: {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				selected: 'A2',
				player: 'white'
			}
		}));
	});
	it('handles SET_STATE', () => {
		const state = new Map();
		const action = setState(fromJS({
			'board': {
				'figures': {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				selected: 'A2',
				player: 'white'
			}
		}));
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			'board': {
				figures: {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				selected: 'A2',
				player: 'white'
			}
		}));
	});
	it('handles MOVE', () => {
		const state = fromJS({
			'board': {
				'figures': {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				selected: 'A2',
				player: 'white'
			}
		});
		const action = move('A3');
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			'board': {
				figures: {
					'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				player: 'black'
			}
		}));
	});
});
