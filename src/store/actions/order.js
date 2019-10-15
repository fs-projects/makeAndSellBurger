import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseInit = () => {
 return {
  type:actionTypes.PURCHASE_INIT
 }
}

export const resetTotalPrice = () => {
  return {
   type: actionTypes.RESET_TOTAL_PRICE_AFTER_PURCHASE,
  };
}

export const purchaseBurgerSuccess = (id, orderData) => {
 return {
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData
 };
}

export const purchaseBurgerSuccessCase = (id, orderData) => {
 return dispatch => {
  dispatch(purchaseBurgerSuccess(id, orderData));
  dispatch(resetTotalPrice());
 }
}

export const purchaseBurgerFailure  = (error) => {
 return {
  type: actionTypes.PURCHASE_BURGER_FAILURE,
  error: error
 };
}

export const purchaseBurgerStart = () => {
 return {
  type: actionTypes.PURCHASE_BURGER_START
 }
}

export const purchaseBurger = (orderData) => {
 return dispatch => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', orderData)
			 .then(response => {
     console.log(response.data);
     dispatch(purchaseBurgerSuccessCase(response.data.name, orderData));
			 })
			 .catch(error => {
			 	dispatch(purchaseBurgerFailure(error));
			 })
 }
}