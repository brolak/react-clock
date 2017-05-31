import React from 'react';

const TimeControl = ({buttons},context) => (
	<div>
		{
			buttons.map((item,i) => <button key={i} onClick={item.handler}>{item.text}</button>	)
		}
	</div>
);
			
export default TimeControl