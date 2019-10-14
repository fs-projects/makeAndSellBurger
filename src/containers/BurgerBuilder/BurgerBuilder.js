import React, { Component } from 'react';

/*It is a function that takes in some configuration and returns a function that takes a component(the reason for two brackets after it in the export statement*/
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi/Auxi';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index'; //Importing every actions via a single index file so we don't have to include multiple import statement for different types of actions and hence keep the code leaner.


class BurgerBuilder extends Component {
	
	/*
	this is also a way of setting the state, something which is more used. 
	constructor(){
		super(props);
		this.state(....);
	}*/

	state = {

		//ingredients : null -> commented as handled in our 'store'
		//totalPrice: 10.6, -> commented as handled in our 'store'
		// purchasable: false, -> commented as I have setup the updatePurchaseState to return true/false basis the combined quantity value of ingredients quantify in our ingredients object inside our state in store in reducer. Earlier this function used to set this property basis the combined quantity value of ingredients. Now since we are not managing the state here so we cannot update 'purchasable' property. Also since this is Local UI state so moving it to our reducer is also NOT a good option. Hence manipulating the 'updatePurchaseState' to return true/false and sending that information directly to our BuildControls component is a good idea.
		purchasing: false,
		loading: false,
		fetchIngredientsError: false

	};

	componentDidMount() {
		/*BurgerBuilder component is loaded via a route. So it will have access to 'location', history', 'match' etc parameter passed by browser router. However 'Burger' component that is a child to 'BurgerBuilder' will NOT receive the 'history', 'match', 'location' etc parameter. This is the reason why we wrapped 'Burger' component with 'withRouter' before exporting it.'withRouter' is a higher order component that will eject the parameters out of parent component.  */
		
		/*commented out this code as we are pulling the ingredients from 'store' as we have implemented 'Redux' in our
		project. Also we can update our 'store' ingredients by calling firebase also but since as of 12/05 we haven't
		studied async calls in 'Redux' so we are pulling the ingredients from the 'store' only.
		console.log('The props coming to [BurgerBuilder] component is', this.props);
		axios.get('https://the-burger-builder-proje-928d4.firebaseio.com/ingredients.json')
			 .then(response => {
			 	this.setState({ingredients: response.data, fetchIngredientsError: true});
			 })
			 .catch(error => {
			 	this.setState({fetchIngredientsError: true});
			 })*/
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey];
		})
		.reduce((accumulator, currentValue) => {
			return accumulator + currentValue;
		}, 0);
		return sum > 0;
	}

	/* 	
	Note : As we are updating the burger ingredients as well as totalPrice upon ingredient addition or removal in our Reducer so I have commented about below block of code that was used when the state was not managed by Redux instead was managed in this BurgerBuilder Component.

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]; 
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			//this is the way of updating the state of our ingredients object in immutable way i.e by distributing the existing ingredients
			//objects to a new object('updatedIngredients') and using this new object to replace the old 'ingredients' object
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPriceOfBurger = this.state.totalPrice;
		const newPriceOfBurger = oldPriceOfBurger + priceAddition;
		this.setState({totalPrice: newPriceOfBurger, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		//I have handled the price of the burger in this function as removing the ingredients will also affect the price of the burger
		const oldCount = this.state.ingredients[type]; 
		const updatedCount = oldCount - 1;
		if(updatedCount >= 0){
			const updatedIngredients = {
				//this is the way of updating the state of our ingredients object in immutable way i.e by distributing the existing ingredients
				//objects to a new object('updatedIngredients') and using this new object to replace the old 'ingredients' object
				...this.state.ingredients
			}
			updatedIngredients[type] = updatedCount;
			const priceDeduction = INGREDIENTS_PRICES[type];
			const oldPriceOfBurger = this.state.totalPrice;
			const newPriceOfBurger = oldPriceOfBurger - priceDeduction;
			this.setState({totalPrice: newPriceOfBurger, ingredients: updatedIngredients});
			this.updatePurchaseState(updatedIngredients);
		}
		else if (updatedCount < 0){
			return;
		}	
	} 
	*/

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {

		this.props.history.push('/checkout');

		/*Note: Below block of code is commented because we don't need query paramters logic to pass our ingredients to 'Checkout' compnonent as we have the redux in play and we can directly access the ingredients in the 'Checkout' component by making it to subscribe to our store instead of sending the ingredients from our state in query parameters to 'Checkout' component.*/

		/* This queryParams array was created to create a string that will send the ingredient and it's component to the checkout page so that the burger in the checkout page displays correct number of ingredients to the customer.
		const queryParams = [];
		//prior to redux 'i' was iterated over 'this.state.ingredients'
		for(let i in this.state.ingredients){
			//prior to encodeURIComponent was was passed 'this.state.ingredients'
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push("price=" + this.state.totalPrice);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
			});
			*/
	}
	

	render() {
		const disabledInfo = {
			...this.props.ings //prior to redux it was 'this.state.ingredients'
		};
		
		//function that will set value of keys in disabledInfo array(which is just a copy of the state) to 'true' or 'false' depending on 
		//whether the value of the key associated to it is 0/lessthanzero or not.
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.fetchIngredientsError ? <p>Ingredients can't be fetched!</p> : <Spinner />;

		//prior to redux if condition was 'this.state.ingredients'
		if(this.props.ings) {
			burger = 
			(
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls 
					ingredientAdded={this.props.onIngredientAdded}//prior to 'redux' was handled by addIngredientHandler() method
					ingredientRemoved={this.props.onIngredientRemoved}//prior to 'redux' was handled by removeIngredientHandler() method
					disabled={disabledInfo}
					price={this.props.price}
					purchasable = {this.updatePurchaseState(this.props.ings)}
					ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={this.props.ings} //prior to redux it was 'this.state.ingredients'
							purchaseCancelled={this.purchaseCancelHandler}
							purchaseContinued={this.purchaseContinueHandler}
							price={this.props.price}/>;
		}

		if(this.state.loading){
			orderSummary = <Spinner />;
		}

		return(
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}	
			</Aux>
		);
	}
}

	const mapStateToProps = state => {
		
		return {
			ings: state.ingredients,
			price: state.totalPrice
		};

	}

	const mapDispatchToProps = dispatch => {
		
		return {
			onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
			onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
		};

	}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));