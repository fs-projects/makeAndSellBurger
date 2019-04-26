import React, { Component } from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

	state = {
		orders: [],
		loading: true
	}
	
	/*We are using 'componentDidMount()' because we have to load the 'Order' component only when we have fetched the Order details
	from the firebase backend. 'componentWillUpdate() is not required as there is no way to fetch the Orders from backend without 
	remounting the 'Orders' component.(you will have to mount it first)*/ 
	componentDidMount() {
		axios.get('/orders.json')
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
			 })			 
	}

	render() {

		return(

			<div>
				{
					this.state.orders.map(order => (
					<Order 
						key={order.id}
						ingredient={order.ingredients}
						price={order.price} />
					))
				}
			</div>

		);
	}
}

export default withErrorHandler(Orders, axios);