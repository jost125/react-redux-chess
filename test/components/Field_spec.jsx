import React from 'react/addons';
import Field from '../../src/components/Field.jsx';
import {Map, fromJS} from 'immutable'
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe('Field', () => {

	it('render white field', () => {
		const component = renderIntoDocument(
			<Field coordinate='A1' />
		);

		const field = scryRenderedDOMComponentsWithClass(component, 'black');

		expect(field.length).to.equal(0);
	});

	it('render black field', () => {
		const component = renderIntoDocument(
			<Field coordinate='B1' />
		);

		const field = scryRenderedDOMComponentsWithClass(component, 'black');

		expect(field.length).to.equal(1);
	});

	describe('piece', () => {
		it('move selected figure', () => {
			var selectedCoordinate;
			const move = (coordinate) => selectedCoordinate = coordinate;
			const component = renderIntoDocument(
				<Field coordinate='A1' move={move} />
			);

			const field = scryRenderedDOMComponentsWithClass(component, 'coll');

			Simulate.click(field[0]);
			expect(selectedCoordinate).be.equal('A1');
		});
	});

});
