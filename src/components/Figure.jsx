import React from 'react';
import {List, Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		return <div
			className={
				"figure " +
				"figure-" + this.props.figure.get("type") + "-" + this.props.figure.get("player") +
				(this.props.selected ? " selected" : "")
			}
			onClick={() => this.props.select(this.props.coordinate)}
		></div>;
	}
});
