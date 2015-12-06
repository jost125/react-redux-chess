import React from 'react';
import {List, Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const rowsIndex = new Map(new List([8, 7, 6, 5, 4, 3, 2, 1]).zip(new Array(8).keys()));
const collsIndex = new Map(new List(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']).zip(new Array(8).keys()));

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div
			className={
				(this.isCoordinateBlack(this.props.coordinate) ? "black " : "") +
				"coll"
			}
			onClick={() => this.props.move(this.props.coordinate)}
		>
			{this.props.highlighted
				? <div className="highlighted">{this.props.children}</div>
				: this.props.children}
		</div>;
	},
	isCoordinateBlack: function(coordinate) {
		let collNumber = collsIndex.get(coordinate[0]);
		let rowNumber = rowsIndex.get(parseInt(coordinate[1]));
		return (rowNumber % 2 == 0 && collNumber % 2 == 0) || (rowNumber % 2 == 1 && collNumber % 2 == 1);
	}
});
