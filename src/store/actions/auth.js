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
 localStorage.removeItem('token');
 localStorage.removeItem('expirationDate');
 localStorage.removeItem('userId');
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
   //here we are getting the current time in milliseconds and adding the expiry time(after converting to milliseconds)in it. Multiplying it by 1000 because JS time works in milliseconds. Now we are passing the value to 'new Date' that takes in that combined time in millisecond and gives us a new Date that we can take as expiration Date.
   const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
   localStorage.setItem('token', response.data.idToken);
   localStorage.setItem('expirationDate', expirationDate);
   localStorage.setItem('userId', response.data.localId);
   dispatch(authSuccess(response.data.idToken, response.data.localId));
   dispatch(checkAuthTimeout(response.data.expiresIn));
  })
  .catch(err => {
   dispatch(authFail(err));
  });
 }
}

/* This function is used to set a redirect path that we can use to redirect a user to a given page after a certain operation is done. Like for example */
export const setAuthRedirectPath = (path) => {
 return{
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
 }
}

/*This function is created to run everytime 'App' component is mounted. This function will ensure that if the browser's local storage has the token, expirationDate and userId then let's not logout the user when the application is reloaded. Instead make sure that user is logged in for the time token is expired.*/
export const authCheckState = () => {
 return dispatch => {
  const token = localStorage.getItem('token');
  if(!token){
   dispatch(logOut());
  }
  else{
   //Reason for wrapping new Date around 'localStorage.getItme('expirationDate')' is that because former value corresponds to a string, so we need to convert that string into a valid date object. 
   const expirationDate = new Date(localStorage.getItem('expirationDate'));
   if(expirationDate >= new Date()){
    const userId = localStorage.getItem('userId');
    dispatch(authSuccess(token, userId));
    //getTime() will give correct time in milliseconds. Converted to seconds as we convert this time to millisecond in in our 'checkAuthTimeout()' action creator. 
    dispatch(checkAuthTimeout(((expirationDate.getTime() - new Date().getTime())/1000)));
   }
   else{
    dispatch(logOut());
   }   
  }
 }
}