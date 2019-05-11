import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css'; 

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';	

class ContactData extends Component {
	
	state = {
		orderForm: {
				name: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Your name please?'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				houseNumber: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Enter your house number'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				localityName: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Enter your full locality name'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				streetNumberIfAny: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Enter your street number if any'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				city: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'What is your city?'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				zip: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Enter your zip code'
					},
					value: '',
					validation: {
						required: true,
						minLength: 5,
						maxLength: 5
					},
					valid: false,
					touched: false
				},
				mobileNo: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Enter your mobile no. to recieve sms alert of this order and our offers'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Enter your email to recieve your order information and other offer updates from us'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				deliveryMethod: {
					elementType: 'select',
					elementConfig: {
						options: [
							{value:'fastest', displayValue: 'Fastest'},
							{value:'cheapest', displayValue: 'Cheapest'}
						]
					},
					value: '',
					valid: true
				},
				paymentMode: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'What is the mode of payment you prefer?'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				}
		},
		formIsValid: false,
		loading:false 
	}

	checkValidity (value, rules) {
		
		let isValid = false;

		if(rules.required) {
			isValid = value.trim() !== '';
		
			if(rules.minLength && rules.maxLength) {
				isValid = (value.length >= rules.minLength) && (value.length <= rules.maxLength)
				}	
		}
		return isValid;
	}

	orderHandler = (event) => {
		event.preventDefault(); //As the button is inside the form element so the default is to send the request and reload the page
		this.setState({loading: true});
		let formData = {};
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData  
		}

		axios.post('/orders.json', order)
			 .then(response => {
			 	this.setState({loading: false, /*purchasing: false*/});
			 	this.props.history.push('/');
			 })
			 .catch(error => {
			 	this.setState({loading: false, /*purchasing: false*/});
			 })
	} 

	/*below is very important function covering the concept of two way binding and changing the state immutabily i.e without affecting
	the original state in the process. Here is a brief description of this function as to why it was created, what it does, how it does and why
	this function is important. User is redirected to the contact data form as soon as user clicks 'CONTINUE' on the modal that comes
	when user clicks on 'ORDER NOW' button. Each form element that comes up was disabled earlier as we haven't handled the event of
	input changes in it. So to handle the event changes on it we applied a 'onChange' listener on each of the 'Input' element and 
	referenced it to a function 'inputChangedHandler' here in this file. Also we ensured using this function that any change on any
	form element will be reflected in it by passing a identifier to this function to track and respond to the change on the element
	being modified. This is called two way binding, i.e the element that is listening to the change is calling a reference to a 
	function that is defined in other element and the element that is listening to the change is causing a change in the other element
	where the effects of the change is handled. When we used the spread operator on 'updatedOrderForm' then by default spread operator
	doesn't do deep copy in case of nested object(like we have in our case of 'orderForm'). So when we spread the 'orderForm' first 
	time in 'updateOrderForm' we made a shallow copy and the pointer to the nested objects. So if we change anything in the nested
	object, we mutate the original 'orderForm' nested object which is not right, so what we did is that we made another shallow copy
	of object that corresponds to the element on which the change is being occured. Although this object itself has a nested object 
	but that's ok we are not manipulating anything inside the nested object so the value that we are manipulating is 'value' key so 
	it doesn't affect the original 'value' key in the original 'orderForm' object.*/   
	inputChangedHandler = (event, inputElementIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...this.state.orderForm[inputElementIdentifier]
		}
		updatedFormElement.value = event.target.value;

		if (inputElementIdentifier !== 'deliveryMethod') {
			updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);	
			updatedFormElement.touched = true;
		}
		
		updatedOrderForm[inputElementIdentifier] = updatedFormElement;
		let formIsValid	= true;
		for(let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;	
		}
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}

	render() {
		
		let formElementArray = [];
		
		for(let key in this.state.orderForm) {
			formElementArray.push(
				{
					id: key,
					config: this.state.orderForm[key]
				}
			)
		}

		let form = (
			//This is a dynamic form being displayed with the help of properties defined in orderForm object
			<form onSubmit={this.orderHandler}>
				{
					formElementArray.map( formElement => (
							<Input 
								key={formElement.id}
								elementType={formElement.config.elementType}
							 	elementConfig={formElement.config.elementConfig}
							 	value={formElement.config.value}
							 	invalid={!formElement.config.valid}
							 	shouldValidate={formElement.config.validation}
							 	touched={formElement.config.touched}
							 	changed={(event) => this.inputChangedHandler(event, formElement.id)} />
						)
					)
				}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);

		if(this.state.loading){
			form = <Spinner />
		}

		return(

			<div className={classes.ContactData}>
				<h3>Please share these details to deliver this burger and help you server better next time..</h3>
				{form}
			</div>	
			);
	}
}

export default ContactData;