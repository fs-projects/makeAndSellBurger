import React from 'react';

import ReactDOM from 'react-dom';

import burgerBuilderReducer from './store/reducers/burgerBuilder';

import thunk from 'redux-thunk';

//Provider allows us to inject our store to the React component.
import { Provider } from 'react-redux';

/*'combineReducers', It is a function that takes javascript object mapping our reducers to different slices of our state and merges 
them to one state and one reducer */ 
import { createStore, applyMiddleware, compose } from 'redux';

import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>		
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
