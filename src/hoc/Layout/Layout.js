/* We have kept this file inside 'hoc' folder because Layout Component is wrapping the BurgerBuilder Component inside of it although Layout component is a stateful component, so one can argue to keep it inside the 'containers' folder but since it only has one state and in greater way it is a higher order wrapping Component, I decided to keep it inside the 'hoc' folder. */

import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from '../Auxi/Auxi';

import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	
	state = {
		showBackdrop: false
	}

	backDropClosedHandler = () => {
		this.setState({showBackdrop: false});
	}

	//this is the best and clean way to toggle the state inside setState when the state to be changed depends on the old state.
	sideDrawerToggleHandler = () => {
		this.setState( ( prevState ) => {
			return { showBackdrop: !prevState.showBackdrop };	
		});
	}

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuth}/>
				<SideDrawer 
					backdropToggle={this.state.showBackdrop}
					closed={this.backDropClosedHandler}
					isAuthenticated={this.props.isAuth}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		isAuth: state.auth.token !== null
	}
	
}

export default connect(mapStateToProps, null)(Layout);