import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility';

const INGREDIENTS_PRICES = {
	salad: 8.34,
	cheese: 15.56,
	meat: 40.44,
	bacon: 20.23
}

const initialState = {
	ingredients: null,
	totalPrice: 10.6,
	fetchIngredientsError: false
};


const addIngredient = (state, action) => {
			const updatedIngredient = {
				//below is the new ES6 feature to dynamically add a property to an object. From burger perspective we are overriding a property name value with the new value dynamically.
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1
			};
			const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
			}
			return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
			const updatedIng = {
				//below is the new ES6 feature to dynamically add a property to an object. From burger perspective we are overriding a property name value with the new value dynamically.
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1
			};
			const updatedIngs = updateObject(state.ingredients, updatedIng);
			const updatedSt = {
				ingredients: updatedIngs,
				totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
			}
		return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
			const updatedIngredientItems = {
				cheese: action.ingredients.cheese,
				salad: action.ingredients.salad,
				bacon: action.ingredients.bacon,
				meat: action.ingredients.meat
			}
			const updatedIngredientsItems = updateObject(state.ingredients, updatedIngredientItems);
			const updatedStateItems = {
				ingredients: updatedIngredientsItems,
				fetchIngredientsError: false,
				totalPrice: 10.6	
			}
			return updateObject(state, updatedStateItems);
}

const fetchIngredientsFailed = (state, action) => {
			return updateObject(state, {fetchIngredientsError: true});
}



const burgerBuilderReducer = (state = initialState, action) => {

	switch (action.type) {

			case actionTypes.ADD_INGREDIENT:
				return addIngredient(state, action);
			
			case actionTypes.REMOVE_INGREDIENT:
					return removeIngredient(state, action);

			case actionTypes.SET_INGREDIENTS:
					return setIngredients(state, action);

			case actionTypes.FETCH_INGREDIENTS_FAILED:
					return fetchIngredientsFailed(state, action);

			default: 
				return state;	
		}
	
}

export default burgerBuilderReducer;