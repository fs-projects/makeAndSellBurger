import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

	/* Note : Below 'state' object is not required because of the implementation of redux store. 
	state = {
		ingredients: null,
		totalPrice: 0
	} */

	/*Initally I use 'componentDidMount' but now as we have 'ContactData' child component being rendered and we are passing the 
	ingredients property of our state to it. If we use 'componentDidMount' then the render() method is called before the
	componentDidMount() and that causes an issue as the 'ingredients' are required by 'ContactData' component to be rendered
	in the burger are still null.*/
	
	/*Note : The reason why below lifecycle is not required anymore is that we are now NOT passing 'ingredients' and 'totalPrice' as query parameters from 'BurgerBuilder.js' when this 'Checkout' path is loaded. The reason being that we now have store to get these two items directly from there and hence we don't have to worry about setting a separate state in this component and setting up the 'ingredients' and 'totalPrice' before the component mounts*/

	/* componentWillMount() {
		console.log('The props coming to [Checkout] component is', this.props);
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		console.log('The search property under location property when run through URLSearchParams in [Checkout] component looks like this', query);
		for(let param of query.entries()){
			//param will be an array in the form of ["bacon", "1"] and so on.. '+' is prefixed before 'param[1]' to convert the 
			//string value to a number as it denotes the quantity of the ingredient.
			if(param[0] === 'price'){
				price = param[1];
			}
			else{
				ingredients[param[0]] = +param[1];	
			}
			
		}
		this.setState({ingredients: ingredients, totalPrice:price});
	}
 */

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () =>  {
		this.props.history.replace('/checkout/contact-data');
	}
	
	render(){
		
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.props.ings} 
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinue={this.checkoutContinueHandler}/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
				{/* the props below are the 'props' that are passed to render method from the 'Route' component. A concept point to take away from here is that we are not rendering the component in this way "component = {}" instead we are rendering it as "render = {anonymous function without props}" if we pass 'props' to the inner anyonymous function and then distribute the same to our ContactData component as we have done below already and then we should be able to recieve the history, location and match objects from this Checkout component passed to Contact Data. Another way is that we can wrap Contact Data in 'withRouter' so that react-router ensures that Contact Data recieves all props from Checkout component.
				
				Note : We also don't need to send the 'ingredients' and 'totalPrice' to 'ContactData' as with the availibility of store we can now let this 'ContactData' subscribe to the store and get these two items directly from there and doesn't depend on below way of getting the two items
								render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/> */}
			</div>	 
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	}
}

export default connect(mapStateToProps, null)(Checkout);