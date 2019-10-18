import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
 return{
  type: actionTypes.AUTH_START
 }
}

export const authSuccess = (token, userId) => {
 return{
  type:actionTypes.AUTH_SUCCESS,
  token: token,
  userId: userId
 }
}

export const authFail = (error) => {
 return{
  type: actionTypes.AUTH_FAIL,
  error:error
 }
}

export const logOut = () => {
 return{
  type: actionTypes.AUTH_LOGOUT
 }
}

export const checkAuthTimeout = (expirationTime) => {
 return dispatch => {
  setTimeout(() => {
   dispatch(logOut());
  }, expirationTime*10000);
 }
}

export const auth = (email, password, isSignUp) => {
 return dispatch => {
  dispatch(authStart());
  const authData = {
   email: email,
   password: password,
   returnSecureToken: true
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtNbMbBnruVof6R-TsEe8XNXNGC49FXt4';
  if(!isSignUp){
   url = 
   'https://cors-anywhere.herokuapp.com/https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtNbMbBnruVof6R-TsEe8XNXNGC49FXt4';
  }
  axios.post(url, authData)
  .then(response => {
   console.log(response);
   dispatch(authSuccess(response.data.idToken, response.data.localId));
   dispatch(checkAuthTimeout(response.data.expiresIn));
  })
  .catch(err => {
   console.log(err);
   dispatch(authFail(err));
  });
 }
}