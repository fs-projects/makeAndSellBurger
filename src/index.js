import React from 'react';

import ReactDOM from 'react-dom';

import burgerBuilderReducer from './store/reducers/burgerBuilder';

import orderReducer from './store/reducers/order';

import authReducer from './store/reducers/auth';

import thunk from 'redux-thunk';

//Provider allows us to inject our store to the React component.
import { Provider } from 'react-redux';

/*'combineReducers', It is a function that takes javascript object mapping our reducers to different slices of our state and merges 
them to one state and one reducer */ 
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

//if process.env.NODE_ENV === 'development' then redux dev tools will only be available in development environment
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

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
