import React from 'react';

import Logo from '../../Logo/Logo';
 
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css';

import Aux from '../../../hoc/Auxi/Auxi';

import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer, classes.Close];

	if (props.backdropToggle){
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return(
		<Aux>
			<Backdrop show={props.backdropToggle} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuthenticated}/>
				</nav>
			</div>
		</Aux>
	);
}

export default sideDrawer;