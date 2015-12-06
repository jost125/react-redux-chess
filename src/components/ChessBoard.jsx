import React from 'react';
import {Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreator.js';
import Field from './Field.jsx';
import Figure from './Figure.jsx';

const rows = [8, 7, 6, 5, 4, 3, 2, 1];
const colls = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const ChessBoard = React.createClass({
	mixins: [PureRenderMixin],
	getFigures: function() {
		return this.props.board.get('figures');
	},
	getSelected: function() {
		return this.props.board.get('selected');
	},
	render: function() {
		return <div className="chessboard">
			{rows.map((row) =>
				<div key={row} className="row">
					{colls.map((coll) => {
						let coordinate = coll.toString() + row.toString();
						return <Field key={coordinate} coordinate={coordinate} move={() => this.props.move(coordinate)}>
							{this.renderFigure(coordinate)}
						</Field>
					})}
				</div>
			)}
		</div>;
	},
	renderFigure: function(coordinate) {
		return this.getFigures().has(coordinate)
			? <Figure
				figure={this.getFigures().get(coordinate)}
				selected={this.getSelected() == coordinate}
				select={() => this.props.select(coordinate)}
				coordinate={coordinate}/>
			: null
	}
});

function mapStateToProps(state) {
	return {
		board: state.get('board')
	};
}

export const ChessBoardContainer = connect(
	mapStateToProps,
	actionCreators
)(ChessBoard);
