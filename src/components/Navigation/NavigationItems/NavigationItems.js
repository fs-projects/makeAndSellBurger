import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

import '../../../containers/Orders/Orders';

const navigationItems = () => (
	<div className={classes.NavigationItems}>
	{/*I have removed the 'active' class from 'Burger Builder' named nav item just below because NavigationItem component has taken care of it in it's definition*/}
		<NavigationItem link="/" exact>Burger Builder</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
	</div>
)

export default navigationItems;