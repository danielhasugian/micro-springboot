import ReactDOM from 'react-dom'
import React from 'react'

import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

import deleteElementQuietly from '../util/DeleteElementQuietly'

import logger from '../util/Logger'

const SUCCESS = 'SUCCESS'
const INFO = 'INFO'
const WARNING = 'WARNING'
const DANGER = 'DANGER'
const CLEAR = 'CLEAR'

function reducer(state, action){
	const newState = state ? Object.assign({}, state) : {success:{}, info:{}, warning:{}, danger:{}}
	if (action.type === SUCCESS){
//		logger('PageMessages.reducer action = '+JSON.stringify(action))
		newState.success[action.id] = action.value
	} else if (action.type === INFO){
//		logger('PageMessages.reducer action = '+JSON.stringify(action))
		newState.info[action.id] = action.value
	} else if (action.type === WARNING){
//		logger('PageMessages.reducer action = '+JSON.stringify(action))
		newState.warning[action.id] = action.value
	} else if (action.type === DANGER){
//		logger('PageMessages.reducer action = '+JSON.stringify(action))
		newState.danger[action.id] = action.value
	} else if (action.type === CLEAR){
//		logger('PageMessages.reducer action = '+JSON.stringify(action))
		deleteElementQuietly(newState.success, action.id)
		deleteElementQuietly(newState.info, action.id)
		deleteElementQuietly(newState.warning, action.id)
		deleteElementQuietly(newState.danger, action.id)
	}
	return newState
}

const PageMessages = ({success, info, warning, danger}) => {
	let items = []
	let idx = 0;
	
	if (Array.isArray(success)){
		Array.prototype.push.apply(items, 
				success.map((item, i)=>(<ListGroupItem bsStyle='success' key={idx++}>{item}</ListGroupItem>)));
	} else if (success){
		items.push(<ListGroupItem bsStyle='success' key={idx++}>{success}</ListGroupItem>)
	}
	if (Array.isArray(info)){
		Array.prototype.push.apply(items, 
				info.map((item, i)=>(<ListGroupItem bsStyle='info' key={idx++}>{item}</ListGroupItem>)));
	} else if (info){
		items.push(<ListGroupItem bsStyle='info' key={idx++}>{info}</ListGroupItem>)
	}
	if (Array.isArray(warning)){
		Array.prototype.push.apply(items, 
				warning.map((item, i)=>(<ListGroupItem bsStyle='warning' key={idx++}>{item}</ListGroupItem>)));
	} else if (warning){
		items.push(<ListGroupItem bsStyle='warning' >{warning}</ListGroupItem>)
	}
	if (Array.isArray(danger)){
		Array.prototype.push.apply(items, 
				info.map((item, i)=>(<ListGroupItem bsStyle='danger' key={idx++}>{item}</ListGroupItem>)));
	} else if (danger){
		items.push(<ListGroupItem bsStyle='danger' key={idx++}>{danger}</ListGroupItem>)
	}
	if (items.length > 0){
		return (
				<ListGroup>
					{items}
				</ListGroup>
			)		
	}
	return null
}

const TmpEventMessages = ({eventId, state}) =>{
	logger('In TmpEventMessages eventId:'+eventId+', state='+state)
	let s = state.success && state.success[eventId] ? state.success[eventId] : null
	let i = state.info && state.info[eventId] ? state.info[eventId] : null
	let w = state.warning && state.warning[eventId] ? state.warning[eventId] : null
	let d = state.danger && state.danger[eventId] ? state.danger[eventId] : null
	return (<PageMessages success={s} info={i} warning={w} danger={d} ></PageMessages>)
}
function mapStateToProps(state){
	return {state};
}

const ConEventMessages =  connect(mapStateToProps)(TmpEventMessages)

const store = createStore(reducer)

const EventMessages = ({eventId})=> (
		<Provider store={store}>
			<ConEventMessages eventId={eventId}/>
		</Provider>)

function setSuccessMessage(eventId, message, doNotClear=false){
	if (!doNotClear){
		store.dispatch({type:CLEAR, id:eventId})
	}
	store.dispatch({type:SUCCESS, id:eventId, value:message})
}
function setInfoMessage(eventId, message, doNotClear=false){
	if (!doNotClear){
		store.dispatch({type:CLEAR, id:eventId})
	}
	store.dispatch({type:INFO, id:eventId, value:message})
}
function setWarningMessage(eventId, message, doNotClear=false){
	if (!doNotClear){
		store.dispatch({type:CLEAR, id:eventId})
	}
	store.dispatch({type:WARNING, id:eventId, value:message})
}
function setDangerMessage(eventId, message, doNotClear=false){
	if (!doNotClear){
		store.dispatch({type:CLEAR, id:eventId})
	}
	store.dispatch({type:DANGER, id:eventId, value:message})
}
function clearMessages(eventId){
	store.dispatch({type:CLEAR, id:eventId})
}

export {PageMessages, EventMessages, setSuccessMessage, setInfoMessage, setWarningMessage
	, setDangerMessage, clearMessages}

export default PageMessages