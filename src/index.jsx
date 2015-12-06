import React from 'react';
import ReactDOM from 'react-dom';
import {ChessBoardContainer} from './components/ChessBoard';
import {Map, fromJS} from 'immutable';
import makeStore from './store.js';
import {setState} from './actionCreator';
import {Provider} from 'react-redux';

export const store = makeStore();

store.dispatch(setState(fromJS({
	board: {
		figures: {
			'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
			'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'},
			'C2': {type: 'pawn', player: 'white', 'id': 'pawn-3-white'},
			'D2': {type: 'pawn', player: 'white', 'id': 'pawn-4-white'},
			'E2': {type: 'pawn', player: 'white', 'id': 'pawn-5-white'},
			'F2': {type: 'pawn', player: 'white', 'id': 'pawn-6-white'},
			'G2': {type: 'pawn', player: 'white', 'id': 'pawn-7-white'},
			'H2': {type: 'pawn', player: 'white', 'id': 'pawn-8-white'},
			'A1': {type: 'rook', player: 'white', 'id': 'rook-1-white'},
			'B1': {type: 'knight', player: 'white', 'id': 'knight-1-white'},
			'C1': {type: 'bishop', player: 'white', 'id': 'bishop-1-white'},
			'D1': {type: 'queen', player: 'white', 'id': 'queen-white'},
			'E1': {type: 'king', player: 'white', 'id': 'king-white'},
			'F1': {type: 'bishop', player: 'white', 'id': 'bishop-2-white'},
			'G1': {type: 'knight', player: 'white', 'id': 'knight-2-white'},
			'H1': {type: 'rook', player: 'white', 'id': 'rook-2-white'},
			'A7': {type: 'pawn', player: 'black', 'id': 'pawn-1-black'},
			'B7': {type: 'pawn', player: 'black', 'id': 'pawn-2-black'},
			'C7': {type: 'pawn', player: 'black', 'id': 'pawn-3-black'},
			'D7': {type: 'pawn', player: 'black', 'id': 'pawn-4-black'},
			'E7': {type: 'pawn', player: 'black', 'id': 'pawn-5-black'},
			'F7': {type: 'pawn', player: 'black', 'id': 'pawn-6-black'},
			'G7': {type: 'pawn', player: 'black', 'id': 'pawn-7-black'},
			'H7': {type: 'pawn', player: 'black', 'id': 'pawn-8-black'},
			'A8': {type: 'rook', player: 'black', 'id': 'rook-1-black'},
			'B8': {type: 'knight', player: 'black', 'id': 'knight-1-black'},
			'C8': {type: 'bishop', player: 'black', 'id': 'bishop-1-black'},
			'D8': {type: 'queen', player: 'black', 'id': 'queen-black'},
			'E8': {type: 'king', player: 'black', 'id': 'king-black'},
			'F8': {type: 'bishop', player: 'black', 'id': 'bishop-2-black'},
			'G8': {type: 'knight', player: 'black', 'id': 'knight-2-black'},
			'H8': {type: 'rook', player: 'black', 'id': 'rook-2-black'}
		},
		player: 'white'
	}
})));

ReactDOM.render(
	<Provider store={store}>
		<ChessBoardContainer board={store.getState().get('board')} />
	</Provider>,
	document.getElementById('app')
);
