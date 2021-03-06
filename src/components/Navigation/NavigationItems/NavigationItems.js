import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

import '../../../containers/Orders/Orders';

const navigationItems = (props) => (
	<div className={classes.NavigationItems}>
	{/*I have removed the 'active' class from 'Burger Builder' named nav item just below because NavigationItem component has taken care of it in it's definition*/}
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		{props.isAuthenticated 
				? <NavigationItem link="/orders">Orders</NavigationItem>
				: null
		}
		{props.isAuthenticated 
				? <NavigationItem link="/logout">Logout</NavigationItem>
				: <NavigationItem link="/auth">Login</NavigationItem>
			}
	</div>
)

export default navigationItems;