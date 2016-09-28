import ReactDOM from 'react-dom'
import React from 'react'

import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import FormInput from '../control/FormInput'
import {EventMessages, setSuccessMessage, setInfoMessage, setWarningMessage
	, setDangerMessage, clearMessages} from '../control/PageMessages'
import { reloadMenu } from '../control/LeftMenu'

import { doLogin } from '../service/LoginService'
import { pageHistory } from '../service/PageHistory'

//import Loading from 'react-loading-animation'
import {setLoading, LoadingAnimation} from '../control/LoadingAnimation'

import Button from 'react-bootstrap/lib/Button'

import {config} from '../service/ConfigService'

import logger from '../util/Logger'

const SET_USER = 'SET_USER'
const SET_PASSWORD = 'SET_PASSWORD'
const SET_USER_VALID = 'SET_USER_VALID'
const SET_PASSWORD_VALID = 'SET_PASSWORD_VALID'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

//create actions
function createSetUser(user){ 
	return {type: SET_USER, value: user}
}
function createSetPassword(password){ 
	return {type: SET_PASSWORD, value: password} 
}
function createSetUserValid(valid){
	return {type: SET_USER_VALID, value: valid}
}
function createSetPasswordValid(valid){
	return {type: SET_PASSWORD_VALID, value: valid}
}
//function createSetErrorMessage(msg){
//	logger('createSetErrorMessage value='+msg)
//	return {type: SET_ERROR_MESSAGE, value: msg}
//}

//reducer
function reducer(state, action){
	if (!state){
		state = {user:null,password:null,userValid:false, passwordValid:false}
	}
	if (action.type == SET_USER){
		return {user:action.value, password:state.password, 
			userValid:(action.value && action.value.length > 0), 
			passwordValid:state.passwordValid}
	} 
	if (action.type == SET_PASSWORD){
		return {user:state.user, password:action.value, userValid:state.userValid, 
			passwordValid:(action.value && action.value.length > 0)}
	}
	if (action.type == SET_USER_VALID){
		return {user:state.user, password:state.password, userValid:action.value, passwordValid:state.passwordValid}
	}
	if (action.type == SET_PASSWORD_VALID){
		return {user:state.user, password:state.password, userValid:state.userValid, passwordValid:action.value}
	}
//	if (action.type == SET_ERROR_MESSAGE){
//		return {user:state.user, password:'', userValid:state.userValid, passwordValid:false, msg: action.value}
//	}
	return state;
}

const store = createStore(reducer)

//Props mappers
const userPropsMapper = (state)=>({value: state.user 
	, validationState: state.userValid ? '': 'warning' 
	})
const passwordPropsMapper = (state)=>({value: state.password
	, validationState: state.passwordValid ? '': 'warning'
	})
//const pageMessagesPropsMapper = (state) => {
//	if (state.msg && state.msg.length > 0){
//		return {danger: state.msg}
//	} else if (!state.userValid || !state.passwordValid){
//		return {warning: 'Please provide user name and password'}
//	}
//	return {}
//}

//Dispatch mappers
const userDispatchMapper = (dispatch)=>({ 
	onChange: (evt)=>{ 
		clearMessages('login')
		dispatch(createSetUser(evt.target.value))}
	, onKeyUp: (evt)=>{
		if (evt.keyCode == 13){
			onClickSignIn()
		}
	}
})
const passwordDispatchMapper = (dispatch)=>({
	onChange: (evt)=>{ 
		clearMessages('login')
		dispatch(createSetPassword(evt.target.value))}
	, onKeyUp: (evt)=>{
		if (evt.keyCode == 13){
			onClickSignIn()
		}
	}
})

//const ErrorMsg = connect(pageMessagesPropsMapper)(PageMessages)
const UserInput = connect(userPropsMapper, userDispatchMapper)(FormInput)
const PasswordInput = connect(passwordPropsMapper, passwordDispatchMapper)(FormInput)
function onClickSignIn(){
	let state = store.getState()
	clearMessages('login')
//	logger('onClickSignIn -> state='+JSON.stringify(state))
	if (state && state.userValid && state.passwordValid){
		let result = {}
		setLoading('login', true)		
		doLogin((data)=>{
			setLoading('login', false)		
			pageHistory.push(config.landingPage)
		},  (data)=> {
			setLoading('login', false)		
			if (typeof data === 'string'){
				logger('Login failure data = '+data)
				setDangerMessage('login', data)
			} else {
				logger('Login failure data.description = '+data.description)
				setDangerMessage('login', data.description)
			}
		},
		state.user, state.password);
	} else {
		setWarningMessage('login', 'Please provide username and password')
	}
}

const LoginForm = ()=> (<div>
			<EventMessages eventId='login'/>
			<form className="form-signin" action="index.html">
	        <h2 className='form-signin'>Please sign in</h2>
	        <label for="inputUser" className="sr-only">User name</label>
	        <UserInput type="text" controlId="inputUser" placeholder="User name" />
	        <label for="inputPassword" className="sr-only">Password</label>
	        <PasswordInput type="password" controlId="Control ID1" placeholder="Password"/>
	        <div className="checkbox">
	          <label className="form-signin">
	            <input type="checkbox" value="remember-me"/> Remember me
	          </label>
	        </div>
	        <LoadingAnimation eventId='login'>
	        	<Button className="btn btn-lg btn-primary btn-block" onClick={onClickSignIn} >Login</Button>
	        </LoadingAnimation>
	      </form>
	      </div>)

export default ()=>(<Provider store={store}><LoginForm/></Provider>)