import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import YouTube from './YouTube';

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
    	min: 0,
    	sec: 2,
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
  

  render() {
  	var sec = this.state.sec;
  	var min = this.state.min;
  	var displaySeconds = function(seconds) {
	  	if(seconds < 10){
	  		return "0"+seconds
	  	} else {
	  		return seconds;
	  	}
  	}
  	if(this.state.finished){
  		return (
  		<div>
  			<h1>Pomodoro Clock</h1>
  			<iframe width="560" height="315" src="https://www.youtube.com/embed/OpIQNxiKJoE?controls=0" frameborder="0"></iframe>
  			<h3>Restart the timer:</h3>
			<audio id="alarm" hidden>
 				<source src="pager.mp3" type="audio/mpeg" />
 			</audio>
 			
        	<button onClick={this.restartTimeShort}>Restart 5</button>
        	<button onClick={this.restartTimeLong}>Restart 25</button>
        </div>
  		)
  	} else {
	    return (
	      <div>
	      
	        <h1>Pomodoro Clock</h1>
	        <iframe width="560" height="315" src="https://www.youtube.com/embed/OpIQNxiKJoE?controls=0" frameborder="0"></iframe>
	        <h2>{min}:{displaySeconds(sec)}</h2>
	        <button onClick={this.startTime}>Start</button>
	        <button onClick={this.stopTime}>Pause</button>

	      </div>
	    );
    }
  }
}

export default Clock;