import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {select, move} from '../src/core';

describe('application logic', () => {

	describe('select', () => {

		it('selects valid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'player': 'white'
			});
			const nextState = select(state, 'A2');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'A2',
				'player': 'white'
			}));
		});

		it('unselects valid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'A2',
				'player': 'white'
			});
			const nextState = select(state, 'A2');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'player': 'white'
			}));
		});

		it('select different valid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'A2',
				'player': 'white'
			});
			const nextState = select(state, 'B2');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'B2',
				'player': 'white'
			}));
		});

		it('selects invalid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'A2',
				'player': 'white'
			});
			const nextState = select(state, 'A1');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'A2',
				'player': 'white'
			}));
		});

		it('selects black figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'},
					'A7': {type: 'pawn', player: 'black', 'id': 'pawn-2-black'}
				},
				'selected': 'A2',
				'player': 'white'
			});
			const nextState = select(state, 'A7');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'},
					'A7': {type: 'pawn', player: 'black', 'id': 'pawn-2-black'}
				},
				'selected': 'A2',
				'player': 'white'
			}));
		});

	});

	describe('move', () => {

		it('moves selected figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'A2',
				'player': 'white'
			});
			const nextState = move(state, 'A4');

			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A4': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'player': 'black'
			}));
		});

	});

});