import React from 'react';

import classes from './Button.css';

//the reason why we have specified '{props.children}' is that we have to make sure that this button component behaves like a normal
//html button and if something is passed in between this button component(wherever this button is used in our project) then it should
//show those children specified in it. 
const button = (props) => (
	<button 
	//'className' should always be a string, so we applied 'join()' method to make the array to string.
	className={[classes.Button, classes[props.btnType]].join(' ')}
	onClick={props.clicked}>
		{props.children}
	</button>
);

export default button;