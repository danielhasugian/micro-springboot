import React from 'react'

import Loading from 'react-loading-animation'

import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import deleteElementQuietly from '../util/DeleteElementQuietly'

import logger from '../util/Logger'

const SET_INPROGRESS = 'SET_INPROGRESS'
	
function reducer(state, action){
	const newState = state ? Object.assign({}, state) : {}
	if (action.type === SET_INPROGRESS && action.id){
		if (action.isLoading === true){
			newState[action.id] = action.isLoading
		} else {
			deleteElementQuietly(newState, action.id)
		}
	}
	return newState;
}

function mapStateToProps(state){
	logger('LoadingAnimationService.mapStateToProps: '+state)
	return {state: state}
}

const LoadingExt = ({eventId, state, children})=> {
	logger('LoadingExt.eventId='+eventId+', state='+state+', children='+children)
	let loading = state[eventId] === true;
	return (<Loading isLoading={loading}>{children}</Loading>)
}

const RawConLoading = connect(mapStateToProps)(LoadingExt)

const store = createStore(reducer)

const LoadingAnimation = ({eventId, children})=>
	(<Provider store={store}>
		<RawConLoading eventId={eventId}>{children}</RawConLoading>
	</Provider>)

function setLoading(eventId, loading){
	store.dispatch({type:SET_INPROGRESS, id:eventId, isLoading: loading})
}

export {setLoading, LoadingAnimation}
