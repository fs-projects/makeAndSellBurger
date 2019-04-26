//The purpose of this code is to create a modal that will be displayed when 'ORDER NOW!' button is clicked. 
//It is a wrapper around the child elements that provides some modal type styling to the children.

import React, { Component } from 'react';

import classes from './Modal.css';

//The reason for this import is, when we show the modal we have to show the backdrop also and adjacent elements in a JSX cannot
//be rendered unless they are wrapped in a higher order component or they are returned as in the form an array of JSX elements
//like we do when we return a set of JSX elements in the form of an array. 
import Aux from '../../../hoc/Auxi/Auxi';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
	
	//We could have used 'PureComponent' instead of extending 'Component', but 'PureComponent' does extra checks which we don't
	//know and that might cause strict checks that can decrease the performance. So to be specific we used 'Component'.
	//The second OR condition was added to handle the 'orderSummary' object that we are passing inside the 'Modal' component in 'Burger
	//Builder.js' file. If we don't specify this second OR then the Modal won't show the loading spinner.  
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	componentWillUpdate(){
		console.log("Inside componentWillUpdate() of [Modal] Component..");
	}

	render() {
		
		return(
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div 
					className={classes.Modal}
					style={{
						//vh is called 'viewport height'. translateY(0) is a position defined in Modal.css. -100vh, slide outside of screen 
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</Aux>			
		);
	}
}

export default Modal;