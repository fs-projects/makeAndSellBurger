import React, { Component } from 'react';

import Aux from '../../hoc/Auxi/Auxi';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
	
	salad: 8.34,
	cheese: 15.56,
	meat: 40.44,
	bacon: 20.23
}

class BurgerBuilder extends Component {
	
	/*
	this is also a way of setting the state, something which is more used. 
	constructor(){
		super(props);
		this.state(....);
	}*/

	state = {

		ingredients : null,
		totalPrice: 10.6,
		purchasable: false,
		purchasing: false,
		loading: false,
		fetchIngredientsError: false

	};

	componentDidMount() {
		//BurgerBuilder component is loaded via a route. So it will have access to 'location', history', 'match' etc parameter passed
		//by browser router. However 'Burger' component that is a child to 'BurgerBuilder' will NOT receive the 'history', 
		//'match', 'location' etc parameter. This is the reason why we wrapped 'Burger' component with 'withRouter' before exporting it.
		//'withRouter' is a higher order component that will eject the parameters out of parent componet.  
		console.log('The props coming to [BurgerBuilder] component is', this.props);
		axios.get('https://the-burger-builder-proje-928d4.firebaseio.com/ingredients.json')
			 .then(response => {
			 	this.setState({ingredients: response.data, fetchIngredientsError: true});
			 })
			 .catch(error => {
			 	this.setState({fetchIngredientsError: true});
			 })
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey];
		})
		.reduce((accumulator, currentValue) => {
			return accumulator + currentValue;
		}, 0);
		this.setState({purchasable: sum > 0});
	}

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

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		/*This queryParams array was created to create a string that will send the ingredient and it's component to the checkout
		page so that the burger in the checkout page displays correct number of ingredients to the customer.*/
		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push("price=" + this.state.totalPrice)
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
			});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		
		//function that will set value of keys in disabledInfo array(which is just a copy of the state) to 'true' or 'false' depending on 
		//whether the value of the key associated to it is 0/lessthanzero or not.
		for(let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.fetchIngredientsError ? <p>Ingredients can't be fetched!</p> : <Spinner />;

		if(this.state.ingredients) {
			burger = 
			(
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable = {this.state.purchasable}
					ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={this.state.ingredients}
							purchaseCancelled={this.purchaseCancelHandler}
							purchaseContinued={this.purchaseContinueHandler}
							price={this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);