//import axios from 'axios';
import { createStore, combineReducers } from 'redux'

import { pageHistory } from './PageHistory'

import {config, resolveUrl} from '../service/ConfigService'
import ajax from '../util/Ajax' 

import {clearAllMessages} from '../control/PageMessages'

import logger from '../util/Logger'

const SAVE_SESSION = 'SAVE_SESSION'
	
const REMOVE_SESSION = 'REMOVE_SESSION'

/* CREATE ACTIONS */
function createSaveSession(token){
	return {
		type: SAVE_SESSION
		, value: token
	}
}
function createRemoveSession(){
	return {
		type: REMOVE_SESSION
	}
}

/* REDUCER */
function sessionReducer(state, action){
	if (action.type === SAVE_SESSION){
		logger('sessionReducer -> '+action.type)
		return {token:action.value}
	} else if (action.type === REMOVE_SESSION){
		logger('sessionReducer -> '+action.type)
		return {token:null}
	}
	if (!state){
		return {token:null}
	}
	return {token:state.token}
}

const store = createStore(sessionReducer)
	
function doLogin(doOnSuccess, doOnError, user, passwd){
	logger('Try to login. username='+user+', password='+passwd)
	
	ajax({
	  url: '/LoginServlet',
	  login: true,
	  method: 'POST',
	  data: {username: user, password: passwd},
	  success: (token) => {
		store.dispatch(createSaveSession(token))
		doOnSuccess(token)
	  }
	  ,error: doOnError	
	})
}

function doLogout(){
	clearAllMessages()
	store.dispatch(createRemoveSession())
}

function isLogin(){
	let state = store.getState();
	if (state && state.token && state.token.value){
		return true;
	}
	return false;
}

function getToken(){
	let state = store.getState();
	if (state && state.token && state.token.value){
		return state.token;
	}
	pageHistory.push(config.loginPage)
	return {value:null, username:null}
}

export { doLogin, doLogout, getToken }