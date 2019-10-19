import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';

import Button from '../../components/UI/Button/Button';

import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

class Auth extends Component {

 state = {
  
  controls: {
   
   email: {
    elementType: 'input',
    elementConfig: {
     type: 'email',
     placeholder: 'Your email?'
    },
    value: '',
    validation: {
     required: true,
     isEmail: true
    },
    valid: false,
    touched: false
   },

   password: {
    elementType: 'input',
    elementConfig: {
     type: 'password',
     placeholder: 'Your password?'
    },
    value: '',
    validation: {
     required: true,
     minLength: 8,
    },
    valid: false,
    touched: false
   }

  },
  formIsValid:true,
  isSignup: true

 }

 componentDidMount(){
   //In below if condition we are trying to reach Checkout even though not building the burger.
   if(!this.props.buildingBurger && this.props.authRedirect !== '/'){
    this.props.onSetAuthRedirectPath();
   }
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
 
 inputChangedHandler = (event,controlName) => {
  const updatedControls = {
   ...this.state.controls,
   [controlName]:{
    ...this.state.controls[controlName],
    value: event.target.value,
    valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
    touched: true
   } 
  };
  this.setState({controls:updatedControls});
 }

 onSubmitHandler = (event) => {
  event.preventDefault();
  this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
 }

 switchAuthModeHandler = () => {
  this.setState((prevState) => {
   return {isSignup: !prevState.isSignup}
  })
 }

 render(){
  let formElementArray = [];
		
		for(let key in this.state.controls) {
			formElementArray.push(
				{
					id: key,
					config: this.state.controls[key]
				}
			)
  }

  let form = formElementArray.map(formElement => (
   <Input 
    key={formElement.id}
    elementType={formElement.config.elementType}
    elementConfig={formElement.config.elementConfig}
    value={formElement.config.value}
    invalid={!formElement.config.valid}
    shouldValidate={formElement.config.validation}
    touched={formElement.config.touched}
    changed={(event) => this.inputChangedHandler(event, formElement.id)}
   />
  ));

  if(this.props.loading){
   form = <Spinner />
  }

  let errorMessage = null;

  if(this.props.error){
   errorMessage = (
    <div className={classes.Error}>
     <h2>Request failed! <i>"{this.props.error.response.data.error.message}"</i></h2>
     <h4>Error Code : <i>{this.props.error.response.data.error.code}</i></h4>
    </div>
   );
  }

  let authRedirect = null;

  if(this.props.isAuthenticated){
   authRedirect = <Redirect to={this.props.authRedirect}/>
  }
  
  return(
   <div className={classes.Auth}>
    {authRedirect}
    {errorMessage}
    <form onSubmit={this.onSubmitHandler}>
     {form}
     <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
    </form>
     <Button
       clicked = {this.switchAuthModeHandler} 
       btnType="Danger">Switch to {this.state.isSignup ? 'SIGNIN': 'SIGNUP'}
     </Button>
   </div>
  );

 }

}

const mapStateToProps = (state) => {
 return{
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirect: state.auth.authRedirectPath
 }
}

const mapDispatchToProps = (dispatch) => {
 return{
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);