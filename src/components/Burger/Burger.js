import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import { withRouter } from 'react-router-dom';

const burger = (props) => {
		/* Object.keys tranforms an Object with key value pairs to an array that will contain the keys that are there in the Object. Values of the keys are not part of the resulting array. This is an important method implementation to see how a Javascript Object is converted to a an array of keys and then for each key we are again returning an array with length equivalent to the number of ingredients associated to that key. Post that for each ingredient quantity we are returning a 'BurgerIngredient' component. */ 
		let tranformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			/* Array() is default javascript concept, nothing related to React. Spread operator is allowing us to create a new array here props.ingredients[igKey] is a number that represent the quantity of the ingredients i.e '1', '2' etc and spread operator is creating a new array with that many number of elements as the quantity associated to a given ingredient and returning it back. The '_' in below map method denotes that we are not interested in the value of the element at a given index, we just consider it as a blank, however we are interested in the index 'i' so we passed it as a second argument.   */
			return [...Array(props.ingredients[igKey])].map(( _, i) => {
				/* Since we are returning a component in the form of an array, in React we have to specify/generate a unique key so that React doesn't complain and is able to identify the component using the unique keys. */
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});  
		})
		/* the second argument passed to the reduce function is the intial value of the accumulator. Remember we are concatinating arrays so the elements of the array to be concatinated will go inside the array, the array to which that array is being concatenated to. This reduce method was required because if all the ingredients are empty in the state then we have to show to the user that he/she should start adding ingredients. To display such a message we need to make sure that the burger is empty, to find that out we reduced the 'tranformedIngredients' array of arrays to a single array with JSX objects that will be present only when there are ingredients in the state else the reduced array will be empty. We can thus make use of length of this reduced array to display our message. */
		.reduce((accumulator, currentElemValue) => {
			return (accumulator.concat(currentElemValue))
		}, []);

		if (tranformedIngredients.length === 0){
			tranformedIngredients = <p style={{textAlign: 'center'}}><strong>Please start adding your favourite ingredients!</strong></p>;
		}

	return(
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{tranformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default withRouter(burger);