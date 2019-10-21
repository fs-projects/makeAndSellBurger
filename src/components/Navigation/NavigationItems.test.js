/* The test runner file should have this extension on it so that ‘create-react-app’ can recognize that it is a test file and picks it up later when we run a special command to run our test cases. The test runner file is preferable be created in the same folder where the component code resides and it’s the same component you want to test for some functionality. A test uses JEST by default in ‘create-react-app’ and JEST gives us couple of methods to describe our test. One such method is ‘describe()’. We don’t need to import it in our file it is by default included in our ‘.test.js’ file once we run the testing command. It takes two arguments one is just the description and other is the testing function (a JS function) that contains actual test. It in turn contains a function ‘it()’ to define one single test. This function also contains two arguments one is just the description and other one is the testing function that takes in the code that is actually be executed once the testing command is run.

We might think that the component we are trying to test should be mounted with the whole application in order for the test scripts to run on it but it is NOT necessarily the cases because with Enzyme we do not have to mount whole component application including the component we are trying to test. We can only mount the component we are trying to test without loading the whole application. 

Enzyme needs to be connected to our react application and for that we need the help of the enzyme-adapter-react-16 that we installed using NPM */

import React from 'react';

/* ‘shallow’ function from ‘enzyme’ is used to render the component so that we can inspect on it.  */
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import NavigationItems from './NavigationItems/NavigationItems';

import NavigationItem from './NavigationItems/NavigationItem/NavigationItem';

/* we are rendering ‘NavigationItems’ component that in turn contains ‘NavigationItem’ component. ‘shallow’ ensures that it only renders ‘Navigationitems’ component only and for ‘NavigationItem’ it only renders some place holders. This ensures isolation testing.  */
describe('<NavigationItems /> Suite', () => {
 
 let wrapper;
 //'beforeEach() is the method provided by Jest that runs before the test cases are executed
 beforeEach(() => {
  wrapper = shallow(<NavigationItems />);
 })
 
 
 it('should check if only two navigation buttons i.e BurgerBuilder and Login should be displayed if the user is not authenticated', ()=> {
    //notice that we passed a reference to a function inside the 'find' function, so JEST is checking if there are two such types of function call when this test case is executed.
  expect(wrapper.find(NavigationItem)).toHaveLength(2); 
 });

 it('should check if only three navigation buttons i.e BurgerBuilder and Logout and Orders should be displayed if the user is authenticated', ()=> {
  //setProps is the function provided by Enzyme to set props to a component. It takes in a JS object with key value pairs of props.
  wrapper.setProps({isAuthenticated: true})
  expect(wrapper.find(NavigationItem)).toHaveLength(3); 
 });

 it('should check if Logout button is rendered in the DOM if user is authenticated', ()=> {
  wrapper.setProps({isAuthenticated: true})
  //'contains' takes a real NODE as an argument to it unlike 'find' that can take function reference, CSS selectors etc.
  expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true); 
 });


});