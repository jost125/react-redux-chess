import React from 'react/addons';
import {ChessBoard} from '../../src/components/ChessBoard.jsx';
import {Map, fromJS} from 'immutable'
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass} = React.addons.TestUtils;

describe('ChessBoard', () => {

	it('render figures', () => {
		const board = fromJS({
			figures: {
				'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
				'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
			}
		});
		const component = renderIntoDocument(
			<ChessBoard board={board} />
		);

		const renderedFigures = scryRenderedDOMComponentsWithClass(component, 'figure');
		const selectedFigure = scryRenderedDOMComponentsWithClass(component, 'selected');

		expect(renderedFigures.length).to.equal(2);
		expect(selectedFigure.length).to.equal(0);
	});

	it('selected figure', () => {
		const board = fromJS({
			figures: {
				'A2': {type: 'pawn', player: 'white', 'id': 'pawn-1-white'},
				'B2': {type: 'pawn', player: 'white', 'id': 'pawn-2-white'}
			},
			selected: 'B2'
		});
		const component = renderIntoDocument(
			<ChessBoard board={board} />
		);

		const renderedFigures = scryRenderedDOMComponentsWithClass(component, 'figure');
		const selectedFigure = scryRenderedDOMComponentsWithClass(component, 'selected');

		expect(renderedFigures.length).to.equal(2);
		expect(selectedFigure.length).to.equal(1);
	});

});
