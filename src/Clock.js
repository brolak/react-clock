import React from 'react';
import ElevationBorder from './ElevationBorder';

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
    	date: new Date()
    };
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  componentDidMount() {
  	this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
  	clearInterval(this.timerId);
  }

  render() {
  	var date = this.state.date;
  	if (date.getMonth() > 5 && date.getFullYear() >= 2017){
    return null;
  	}
    return (
      <div>
        <h1>Hello, Cohort 4!</h1>
        <ElevationBorder>
        	<h2>It is {date.toLocaleTimeString()}.</h2>
        </ElevationBorder>
      </div>
    );
  }
}

export default Clock;