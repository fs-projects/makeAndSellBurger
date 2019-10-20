import React, { Component } from 'react';

import Aux from '../../../hoc/Auxi/Auxi';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	//This console.log states that even though the modal was not opened, but still this OrderSummary component wrapped inside
	//the Modal component will update i.e re-render. To prevent the re-render of this OrderSummary component, the Modal Component
	//has been changed from functional to class based component and in it I have defined 'shouldComponentUpdate()' method to make
	//sure that only when the modal is opened then only the Modal should re-render otherwise it should not and hence OrderSummary
	//will also not update.
	//Note : OrderSummary was a functional component, but for debugging purpose to check whether it re-renders when there is a 
	//state change, I converted it to a class based component, let it be for now. 
	/* componentWillUpdate(){
		console.log("Inside componentWillUpdate() of [OrderSummary] Component..");
	} */

	render() {
		
		const ingredientSummary = Object.keys(this.props.ingredients)
		.map(igKey => {
		return (
			<li key={igKey}>
				<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
			</li>);
		});

		return (
			<Aux>
				<h2><u>Your Order Details!</u></h2>
				<p><i>A delicious burger with ingredients: </i></p>
					<ul>
						{ingredientSummary}
					</ul>
				<p><em><strong>What you pay:</strong></em> <strong>{this.props.price.toFixed(2)} INR</strong></p>	
				<p><i>Checkout your Burger?</i></p>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>	
			</Aux>
		);
	}
};

export default OrderSummary;