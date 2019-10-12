import * as actionTypes from './actions';

const INGREDIENTS_PRICES = {
	
	salad: 8.34,
	cheese: 15.56,
	meat: 40.44,
	bacon: 20.23
}

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		meat: 0,
		cheese: 0
	},
	totalPrice: 10.6
};

const reducer = (state = initialState, action) => {

	switch (action.type) {

		case actionTypes.ADD_INGREDIENT:
			return {
			...state,
			ingredients: {
					...state.ingredients,
					//below is the new ES6 feature to dynamically add a property to an object. From burger perspective we are overriding a
					//property name value with the new value dynamically.
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
			totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
			};
		
		case actionTypes.REMOVE_INGREDIENT:	
			return {
			...state,
			ingredients: {
					...state.ingredients,
					//below is the new ES6 feature to dynamically add a property to an object. From burger perspective we are overriding a
					//property name value with the new value.
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
			totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
			};

		default: 
			return state;	
	}
	
}

export default reducer;