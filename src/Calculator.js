import React from 'react';

export default React.createClass({
	getInitialState: function() {
		return {inputValue: null, averageGrade: null, totalWeightPoints: null}
	},
	handleChange: function(e) {
		this.setState({inputValue: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.calculateAverage(this.state.inputValue);
		this.setState({inputValue: ''});
		this.setState({showResults: !this.state.score ? false : true}); 
	},
	getGrade: function(input) {
		var match = input.match(/[a-f]/i);
		return !match ? null : Math.abs(match[0].toUpperCase().charCodeAt(0) - 70);
	},
	getWeightPoints: function(input) {
		var match = input.match(/\d+(\.|,)?\d*/g);
		return !match ? null : Number(match[0].replace(',','.'));
	},
	numberScoreToLetter: function(score) {
		switch(Math.round(score)) {
			case 5:
				return 'A';
			case 4:
				return 'B';
			case 3:
				return 'C';
			case 2:
				return 'D';
			case 1:
				return 'E'
			default:
				return ''
		}
	},
	calculateAverage: function(input) {
		var weightPoints = this.getWeightPoints(input);
		var grade = this.getGrade(input)
		if (!weightPoints || !grade)
			return;
		var newTotalWeightPoints = this.state.totalWeightPoints + weightPoints;
		var newAverage = (this.state.averageGrade*this.state.totalWeightPoints + grade*weightPoints)/newTotalWeightPoints;
		newAverage = newAverage.toFixed(2);

		this.setState({totalWeightPoints: newTotalWeightPoints, averageGrade: newAverage});
	},
	render() {
		return (
			<div className="calc-container">
				<form className="calc-form" onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} value={this.state.inputValue}/>
					<button className="btn" type="submit">Calc!</button>
				</form>
				<div>
					<p>Gjennomsnitt: {this.numberScoreToLetter(this.state.averageGrade)} ({this.state.averageGrade})</p>
					<p>Totalt antall studiepoeng: {this.state.totalWeightPoints}</p>
				</div>
			</div>
		)
	}
})