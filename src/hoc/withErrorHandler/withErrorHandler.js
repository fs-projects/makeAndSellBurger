import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

import Aux from '../Auxi/Auxi';

const withErrorHandler = (WrappedComponent, axios) => {
	//'props' below refer to the 'props' that this 'WrappedComponent' might recieve, so we don't want to loose that, hence distributing
	//'props' to the 'WrappedComponent' using the spread operator. 'axios' is sent to this function because we have to show the error 
	//inside a Modal whenever the 'axios' calls req/resp returns error.
	return class extends Component {
		
		state = {
			error: null
		}

		//A very important point to note here is that when the get url to fetch the ingredients from 'firebase' database is modified to
		//make it invalid, then the below interceptors won't be able to catch the error returned from the 'firebase' and hence the Modal
		//to show the error will never pop up. The reason for this behaviour is that, 'componentDidMount()' runs after the 'render' method
		//is called and all the child components(implying that 'componentDidMount()') are rendered inside the 'render()' method. Now since 
		//'WrappedComponent' which is the 'BurgerBuilder' component is a child component that will get rendered first as per the life 
		//cycle methods and the reason mentioned just above. When this happens then the 'error' will not be handled by 'componentDidMount()'
		//which is a method yet to be executed. So I have changed below 'componentDidMount()' to 'componentWillUpdate()'. There will be
		//no effect on the overall functionality as we are not doing any side effect(calling external API's to fetch/post data). 


		//A better lifecycle hook will be constructor instead of 'componentWillMount()' as 'componentWillMount()' will be removed in future versions of React.
		componentWillMount() {
			//These interceptors are setup to intercept the errors and show the error message in the 'error' object inside the Modal
			this.reqInterceptor = axios.interceptors.request.use(request=> {	
				this.setState({error: null});
				return request;
			});

			//Look at the first argument to 'use' function. In first argument we are returning the response of the 'axios' call, which
			//is necessary otherwise the response will be blocked for further use. In above function we explicitly wrote 'return request'
			//whereas below we did the same thing in first argument of the 'use' function.
			this.resInterceptor = axios.interceptors.response.use(response=>response, error => {
				this.setState({error: error});
			});

		}

		//Again this is also a very important concept we have used. We used 'componentWillUnmount()' below to make sure that our interceptors
		//are removed from the memory when the 'withErrorHandler' component is NOT present in the DOM anymore. This is done to prevent any 
		//memory leaks and out of the fly errors that would come when there are live interceptors present in the memory although they aren't
		//required. Coming to a point that our 'withErrorHandler' higher order component is not limited to be wrapped around the 
		//'BurgerBuilder' component, to which it is currently tied to. However if we tie this higher order component to other component then 
		//we will call 'componentWillMount()' again and again, this would cause multiple interceptors in our application and also attaching those
		//to same 'axios' instance. The problem we will have in future will be, mentioned routing will lead to the problem when we have more pages
		//with 'withErrorHandler', we ofcourse will create mulitple instance of class returned from the 'withErrorHandler', therefore all the old
		//interceptors we setup when we wrapped with another component which might not be needed anymore, still exist, so we
		//will have a lot of dead interceptors in memory that aren't dead but still react to our requests/response and lead to error and do somehow change the state of the applications. But more importantly they lead to leakage in memory because these are dead interceptors that is code still running when not required.   

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}
		
		errorConfirmedHandler = () => {
			this.setState({error: null});
		}
		render() {
			return (
				<Aux>
					<Modal 
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props}/>
				</Aux>
			);
		}
	}
}

export default withErrorHandler;