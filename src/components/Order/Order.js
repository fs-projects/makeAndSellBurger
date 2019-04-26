import React from 'react';

import classes from './Order.css';

const order = (props) => {
	
	const ingredients = []; 

	for(let ingredientName in props.ingredient){
		ingredients.push(
			{
				name: ingredientName,
				amount: props.ingredient[ingredientName]
			}
		);
	}

	const ingredientOutput = ingredients.map(ig => {
		return <span 
			style={
				{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px'  
				}
			}
			key={ig.name}>{ig.name} ({ig.amount})</span>;
		});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			{/*'toFixed' only works on numbers and by default it's output is a string so we used 'Number.parseFloat' to conver the price
			value to a number. We could have appended a '+' sign also to the prop like this 'price={+order.price}' in Orders.js file to convert
			the price to a number instead of string which is the default data type of price from the firebase response object.*/
			}
			<p>Price: <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
	);

}

export default order; 