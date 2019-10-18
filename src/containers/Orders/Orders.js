import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';

import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

/* 	Note : below state is now managed by redux
state = {
		orders: [],
		loading: true
	} */
	
	/*We are using 'componentDidMount()' because we have to load the 'Order' component only when we have fetched the Order details
	from the firebase backend. 'componentWillUpdate() is not required as there is no way to fetch the Orders from backend without 
	remounting the 'Orders' component.(you will have to mount it first)*/ 
	componentDidMount() {
/* 		Note : Handling below async call in order reducer and action creator */
	/* 	axios.get('/orders.json')
			 .then(res => {
			 	console.log('The orders fetched from FIREBASE backend is: ', res.data);
			 	const fetchedOrders = [];
			 	for(let key in res.data){
			 		fetchedOrders.push({
			 			...res.data[key],
			 			id: key
			 		});
			 	}
			 	this.setState({loading: false, orders: fetchedOrders});
			 })
			 .catch(err => {
			 	this.setState({
			 			loading: true}
			 		);
				})			  */
				this.props.onFetchOrders(this.props.token);
	}

	render() {
		let orderDetails = null;
		if(this.props.loading){
			orderDetails = <Spinner />;
		}
		if(this.props.orders.length === 0){
			orderDetails = null;
		}
		orderDetails = (
			<div>
				{
					this.props.orders.map(order => (
					<Order 
						key={order.id}
						ingredient={order.ingredients}
						price={order.price} />
					))
				}
			</div>
		);
		return orderDetails;
	}
}

const mapStateToProps = (state) => {
	return{
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));