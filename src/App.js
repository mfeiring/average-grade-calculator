import React from 'react';
import Calculator from './Calculator';

export default React.createClass({
	render() {
		return (
			<div className="heading">
				<h1>Average Grade Calculator</h1>
				<Calculator/>
			</div>
		)
	}
})