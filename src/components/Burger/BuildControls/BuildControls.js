//Motive of the code in this file is to show 'BuildControl' components multiple times in the form of an array. 

import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Meat', type: 'meat'},
	{label: 'Cheese', type: 'cheese'}
]

const buildControls = (props) => (
	
	<div className = {classes.BuildControls}>
		<p>Price of your Burger : <strong>{props.price.toFixed(2)}</strong></p>
		{controls.map(element => (
			<BuildControl 
			label={element.label} 
			key={element.label} 
			added={() => props.ingredientAdded(element.type)}
			removed={() => props.ingredientRemoved(element.type)}
			disabled={props.disabled[element.type]}			/>
		))}
		{
		//to disable this button we have to check if none of the burger ingredient is added. Check the logic for this implemented in the function updatePurchaseState(ingredients) in 'BurgerBuilder.js' file. 
		}
		<button 
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW!' : 'SIGNUP TO ORDER!'}
		</button>
	</div>
);

export default buildControls;