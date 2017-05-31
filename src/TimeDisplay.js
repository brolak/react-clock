import React from 'react';

const displaySeconds = (seconds) => 
	(seconds < 10 ? `0${seconds}` : seconds)

const TimeDisplay = ({min,sec},context) => 
	(<h2>{min}:{displaySeconds(sec)}</h2>)


export default TimeDisplay;
