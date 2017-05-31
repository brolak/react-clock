import React, {Component} from 'react';
import Video from './Video';
import TimeDisplay from './TimeDisplay';
import TimeControl from './TimeControl';

class App extends Component {
  constructor() {
    super();
    this.state = {
    	min: 25,
    	sec: 0,
    	finished: false
    }
    this.startTime = this.startTime.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.restartTimeShort = this.restartTimeShort.bind(this);
    this.restartTimeLong = this.restartTimeLong.bind(this);
  }

  tick() {
  	if(this.state.sec == 1 && this.state.min == 0){
  		this.setState({
      		min: 0,
      		sec: 0,
      		finished: true
    	})
    	const alarm = document.getElementById('alarm');
    	alarm.play(); 
    	this.stopTime();
  	} else if(this.state.sec == 0){
  		this.setState({
      		min: this.state.min -=1,
      		sec: 59
    	})
  	} else {
	    this.setState({
	      sec: this.state.sec -=1
	    })
	}
  }

  startTime() {
  	this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  stopTime() {
  	clearInterval(this.timerId);
  }

  restartTimeShort() {
  	this.setState({
  		min: 5,
  		sec: 0,
  		finished: false
  	})
  	this.startTime();
  }

  restartTimeLong() {
  	clearInterval(this.timerId);
  	this.setState({
  		min: 25,
  		sec: 0,
  		finished: false
  	})
  	this.startTime();
  }
  
  renderFinishedState() {
  	var {sec,min} = this.state;

  		return (

  		<div>
  			<h1>Pomodoro Clock</h1>
  			<Video />
  			<TimeDisplay min={min} sec={sec}/>
  			<h3>Restart the timer:</h3>
			<audio id="alarm" hidden>
 				<source src="pager.mp3" type="audio/mpeg" />
 			</audio>
 			<TimeControl buttons={this.getButtons()}/>
        </div>
  		)
  }

  getButtons() {
  	return this.state.finished ?
  		[{handler: this.restartTimeShort, text: "Start 5 min break"},
  		{handler: this.restartTimeLong, text: "Start 25 min work session"}]:

  		[{handler: this.startTime, text: "start"},
  		{handler:this.stopTime, text: "pause"}]
  }

  renderStartState() {
  	var {sec,min} = this.state;
  	var props = {sec, min};
  	return (
  		<div>
	      	<h1>Pomodoro Clock</h1>
	        <Video />
	        <TimeDisplay {...props}/>
	        <TimeControl buttons={this.getButtons()}/>
	    </div>
  	)
  }

  render() {
	  	return this.state.finished ? 
		  	this.renderFinishedState() : 
		  	this.renderStartState()	;
  }
}



export default App;