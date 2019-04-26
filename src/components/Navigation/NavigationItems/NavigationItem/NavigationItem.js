import React from 'react';

//The reason why we don't use 'Link' instead of 'NavLink' is that we have to style the active component i.e the navigation component
//that is active. 
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
	
		<li className={classes.NavigationItem}>
			{/*NavLink by default attaches 'active' class feature so we don't have to specify that explicitly*/}
			<NavLink 
				to={props.link}
				/*We are just keeping exact to the 'Burger Builder' named nav item so that it only gets active when clicked and not
				others. See the 'NavigationItem.js file for the exact prop from 'Burger Builder' named nav sent to this file. */
				exact={props.exact} 
				/* 'activeClassName' was required to override the default 'active' style imposed by 'NavLink'. */
				activeClassName={classes.active}>{props.children}
			</NavLink>
		</li>
);

export default navigationItem;