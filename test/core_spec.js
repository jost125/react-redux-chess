import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {select, move} from '../src/core';

describe('application logic', () => {

	describe('select', () => {

		it('selects valid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
				},
				'player': 'white'
			});
			const nextState = select(state, 'A2');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
				},
				'selected': 'A2',
				'player': 'white',
				'moves': ['A3', 'A4']
			}));
		});

		it('unselects valid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
				},
				'selected': 'A2',
				'player': 'white',
				'moves': ['A3', 'A4']
			});
			const nextState = select(state, 'A2');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
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
				'player': 'white',
				'moves': ['A3', 'A4']
			});
			const nextState = select(state, 'B2');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
				},
				'selected': 'B2',
				'player': 'white',
				'moves': ['B3', 'B4']
			}));
		});

		it('selects invalid figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
				},
				'selected': 'A2',
				'player': 'white',
				'moves': ['A3', 'A4']
			});
			const nextState = select(state, 'A1');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
				},
				'selected': 'A2',
				'player': 'white',
				'moves': ['A3', 'A4']
			}));
		});

		it('selects black figure', () => {
			const state = fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'A7': {type: 'pawn', player: 'black', 'id': 'pawn-2-black'}
				},
				'selected': 'A2',
				'player': 'white',
				'moves': ['A3', 'A4']
			});
			const nextState = select(state, 'A7');
			expect(nextState).to.equal(fromJS({
				'figures' : {
					'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
					'A7': {type: 'pawn', player: 'black', 'id': 'pawn-2-black'}
				},
				'selected': 'A2',
				'player': 'white',
				'moves': ['A3', 'A4']
			}));
		});

		describe('highlight possible moves', () => {

			describe('pawn', () => {
				it('select starting position', () => {
					const state = fromJS({
						'figures': {
							'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
						},
						'player': 'white'
					});
					const nextState = select(state, 'A2');
					expect(nextState).to.equal(fromJS({
						'figures': {
							'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
						},
						'selected': 'A2',
						'player': 'white',
						'moves': ['A3', 'A4']
					}));
				});

				it('select non-starting position', () => {
					const state = fromJS({
						'figures': {
							'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
						},
						'player': 'white'
					});
					const nextState = select(state, 'A3');
					expect(nextState).to.equal(fromJS({
						'figures': {
							'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'}
						},
						'selected': 'A3',
						'player': 'white',
						'moves': ['A4']
					}));
				});

				it('select blocked from starting position', () => {
					const state = fromJS({
						'figures': {
							'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
							'A4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'}
						},
						'player': 'white'
					});
					const nextState = select(state, 'A2');
					expect(nextState).to.equal(fromJS({
						'figures': {
							'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
							'A4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'}
						},
						'selected': 'A2',
						'player': 'white',
						'moves': ['A3']
					}));
				});

				it('select blocked position', () => {
					const state = fromJS({
						'figures': {
							'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
							'A4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'}
						},
						'player': 'white'
					});
					const nextState = select(state, 'A3');
					expect(nextState).to.equal(fromJS({
						'figures': {
							'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
							'A4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'}
						},
						'selected': 'A3',
						'player': 'white',
						'moves': []
					}));
				});

				it('select take enemy', () => {
					const state = fromJS({
						'figures': {
							'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
							'A4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'},
							'B4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'}
						},
						'player': 'white'
					});
					const nextState = select(state, 'A3');
					expect(nextState).to.equal(fromJS({
						'figures': {
							'A3': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
							'A4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'},
							'B4': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'}
						},
						'selected': 'A3',
						'player': 'white',
						'moves': ['B4']
					}));
				});
			});

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
				'moves': ['A3', 'A4'],
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