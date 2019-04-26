//Motive of the code in this file is to define one single 'BuildControl' component, this 'BuildControl' component we can use multiple times
//in our 'BuildControls' component to render mulitple 'BuildControls' in the form of an array in the screen. 


import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
	<div className={classes.BuildControl}>
		<div className={classes.Label}>{props.label}</div>
		<button 
			className={classes.Less} 
			onClick={props.removed} 
			disabled={props.disabled}>Less</button>
		<button 
			className={classes.More} 
			onClick={props.added}>More</button>
	</div>
);

export default buildControl;