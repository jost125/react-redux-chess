import React from 'react/addons';
import Figure from '../../src/components/Figure.jsx';
import {Map, fromJS} from 'immutable'
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe('Figure', () => {

	it('render not selected figure', () => {
		let figure = fromJS({
			"type": "pawn",
			"player": "white"
		});
		const component = renderIntoDocument(
			<Figure figure={figure} selected={false} />
		);

		const renderedFigure = scryRenderedDOMComponentsWithClass(component, 'figure-pawn-white');
		const selected = scryRenderedDOMComponentsWithClass(component, 'selected');

		expect(renderedFigure.length).to.equal(1);
		expect(selected.length).to.equal(0);
	});

	it('render selected figure', () => {
		let figure = fromJS({
			"type": "pawn",
			"player": "white"
		});
		const component = renderIntoDocument(
			<Figure figure={figure} selected={true} />
		);

		const renderedFigure = scryRenderedDOMComponentsWithClass(component, 'figure-pawn-white');
		const selected = scryRenderedDOMComponentsWithClass(component, 'selected');

		expect(renderedFigure.length).to.equal(1);
		expect(selected.length).to.equal(1);
	});

	it('select figure', () => {
		let figure = fromJS({
			"type": "pawn",
			"player": "white"
		});
		var selectedCoordinate = 'A1';
		const select = (coordinate) => selectedCoordinate = coordinate;
		const component = renderIntoDocument(
			<Figure figure={figure} selected={false} coordinate="B2" select={select} />
		);

		const renderedFigure = scryRenderedDOMComponentsWithClass(component, 'figure-pawn-white');
		Simulate.click(renderedFigure[0]);

		expect(selectedCoordinate).to.equal("B2");
	});

});
