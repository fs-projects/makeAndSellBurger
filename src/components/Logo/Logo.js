import React from 'react';

import classes from './Logo.css';

//This import is necessary for 2 reasons : 1. if we specify this path in the <img> tag then webpack won't be able to find that path
//as during the run time webpack creates an output folder, this folder in dev env, is created in memory and is not visble however
//in production env when the application is actually deployed for use by the users, webpack creates an output directory and stores
//all the optimized code in it that would include the image if it's path is specified correctly in the import statement like below.
//'burgerLogo' just recieves the path of the image where webpack will copy it to, i.e the path where optimized code/image is present
//this is important. 
//this import is not working, need to find out why?
//import BurgerLogo from '../../assets/images/burger-logo.png';
import BurgerLogo from './burger-logo.png';

const logo = (props) => (
	<div className={classes.Logo} style={{height:props.height}}>
		<img src={BurgerLogo} alt="Delicious Burger"/>
	</div>	
);

export default logo;