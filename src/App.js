import React, { Component } from 'react';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

//As we are lazily loading 'Checkout' component therefore commenting out below import statement. 
//import Checkout from './containers/Checkout/Checkout';

import { Route, Switch } from 'react-router-dom';

//As we are lazily loading 'Checkout' component therefore commenting out below import statement. 
//import Orders from './containers/Orders/Orders';

//As we are lazily loading 'Checkout' component therefore commenting out below import statement. 
//import Auth from './containers/Auth/Auth';

import Logout from './containers/Auth/Logout/Logout';


/* import Orders from './containers/Orders/Orders'; -- Just a note that, when we import like this then webpack understand that this is a dependency and it add it as a global dependency when compiling the application's code. However when we import like we did just below using asyncComponent, we are telling webpack to load the dependency only when requested.
 */

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout'); /* special dynamic import syntax that means whatever is specified inside the import() is only imported when the outer anonymous function is executed AND that outer anonymous function will be executed only when we render 'AsyncNewPost' component on to the screen. On bundling the application, webpack will encounter this dynamic syntax due to the build workflow setup we are using, therefore it will create a new bundle with new post components and all potential child components that were exclusive to that compononent if any. But it will not add to the main bundle instead it will include this new extra bundle when we actually need new posts component.  */
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');  
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }


    return (
      <div>
      	<Layout>
          {routes}
            {
            /*<Route path="/checkout" render = {() => <Checkout />}/>
            <Route path="/orders" render={() => <Orders />}/>
            <Route path="/" exact render={() => <BurgerBuilder />}/>*/
            }
      	</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
