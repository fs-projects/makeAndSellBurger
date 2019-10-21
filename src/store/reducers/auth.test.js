/* The test runner file should have this extension on it so that ‘create-react-app’ can recognize that it is a test file and picks it up later when we run a special command to run our test cases. The test runner file is preferable be created in the same folder where the component code resides and it’s the same component you want to test for some functionality. A test uses JEST by default in ‘create-react-app’ and JEST gives us couple of methods to describe our test. One such method is ‘describe()’. We don’t need to import it in our file it is by default included in our ‘.test.js’ file once we run the testing command. It takes two arguments one is just the description and other is the testing function (a JS function) that contains actual test. It in turn contains a function ‘it()’ to define one single test. This function also contains two arguments one is just the description and other one is the testing function that takes in the code that is actually be executed once the testing command is run.

We might think that the component we are trying to test should be mounted with the whole application in order for the test scripts to run on it but it is NOT necessarily the cases because with Enzyme we do not have to mount whole component application including the component we are trying to test. We can only mount the component we are trying to test without loading the whole application. 

Enzyme needs to be connected to our react application and for that we need the help of the enzyme-adapter-react-16 that we installed using NPM */

/* ‘shallow’ function from ‘enzyme’ is used to render the component so that we can inspect on it.  */
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import * as actionTypes from '../actions/actionTypes';

import authReducer from './auth';

configure({adapter: new Adapter()});


describe('Auth Reducer suite', () => {
  
 it('should return initial state', () => {
   expect(authReducer(undefined, {})).toEqual({
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/' 
   });
  });

  it('should store token after login is success', () => {
   expect(authReducer({
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/' 
   },{
    type: actionTypes.AUTH_SUCCESS,
    idToken: 'some-token',
    userId: 'some-user-id'
   })).toEqual({
   token: 'some-token',
   userId: 'some-user-id',
   error: null,
   loading: false,
   authRedirectPath: '/' 
  })
 });

});
