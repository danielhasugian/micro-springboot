import ReactDOM from 'react-dom'
import React from 'react'

import Table from 'react-bootstrap/lib/Table'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import FormInput from '../control/FormInput'
import {EventMessages, setSuccessMessage, setInfoMessage, setWarningMessage
	, setDangerMessage, clearMessages} from '../control/PageMessages'

import { pageHistory } from '../service/PageHistory'

//import Loading from 'react-loading-animation'
import {setLoading, LoadingAnimation} from '../control/LoadingAnimation'

import {getChick, saveChick} from '../service/ChickenService'

import Button from 'react-bootstrap/lib/Button'

import logger from '../util/Logger'

const REFRESH = 'REFRESH'
const CLEAR = 'CLEAR'
function reducer(state, action){
	if (action.type === CLEAR){
		return {id:null, name:null, weight:0}
	}
	if (action.type === REFRESH){
		const newState = state ? Object.assign({}, state) :{id:null, name:null, weight:0}
		if (action.id !== undefined){
			newState.id = action.id
		}
		if (action.name !== undefined){
			newState.name = action.name
		}
		if (action.weight !== undefined){
			newState.weight = action.weight
		}
		return newState;
	}
	if (!state){
		return {id:null, name:null, weight:0}
	}
		
	return state;
}

function mapStateToIdProp(state){
	return {value: state.id}
}
const IdDisplay = connect(mapStateToIdProp)(
		({value})=> (value ? <tr><td>ID</td><td>{value}</td></tr> : null)
	)

function mapStateToNameProp(state){
	//logger('mapStateToNameProp: '+JSON.stringify(state))
	return {
		value: state.name
		, validationState: state.name && state.name.length > 0 ? '' : 'error'
		, help: state.name && state.name.length > 0 ? undefined : 'Name must be provided'}
}
function mapDispatchToNameProp(dispatch){
	return {
		onChange: (evt)=>{
			logger('mapDispatchToNameProp: '+evt.target.value)
			clearMessages('chickenEdit')
			dispatch({type:REFRESH, name:evt.target.value}) 
		}
	}
}
const NameInput = connect(mapStateToNameProp, mapDispatchToNameProp)(FormInput)

function mapDispatchToWeightProp(dispatch){
	return {
		onChange: (evt)=>{ 
			logger('mapDispatchToWeightProp: '+evt.target.value)
			clearMessages('chickenEdit')
			dispatch({type:REFRESH, weight:evt.target.value}) 
		}
	}
}
function mapStateToWeightProp(state){
	//logger('mapStateToWeightProp: '+JSON.stringify(state))
	return {value: state.weight
		, help: state.weight > 0 ? undefined : 'Weight must be greater than 0'		
		, validationState: state.weight > 0 ? '' : 'error'}
}
const WeightInput = connect(mapStateToWeightProp, mapDispatchToWeightProp)(FormInput)

function onClickSave(){
	clearMessages('chickenEdit')
	const state = store.getState()
	if (!state || !state.name || !state.weight || !(state.weight > 0)){
		setWarningMessage('chickenEdit', 'Please provide valid entries!')
	} else {
		setLoading('chickenEdit', true)
		saveChick(store.getState()
			, (c)=>{
				setLoading('chickenEdit', false)
				setSuccessMessage('chickenList', 'Chicken '+c.name+' is successfully edited')
				pageHistory.push('/chicken')
			}
			, (error)=>{
				setLoading('chickenEdit', false)
				setDangerMessage('chickenEdit',error)
			})
	}
}

const ChickenEdit = ()=> (
			<Table striped bordered condensed hover>
				<IdDisplay/>
				<tr>
					<td>Name</td>
					<td><NameInput type="text" controlId="inputName" placeholder="Name" /></td>
				</tr>
	        	<tr>
	        		<td>Weight</td>
	        		<td><WeightInput type="text" controlId="inputWeight" placeholder="Weight"/></td>
	        	</tr>
	        	<tr>
	        		<td> </td>
	        		<td>
		        		<Button bsStyle='primary' onClick={onClickSave} >Save</Button>
			        </td>
	        	</tr>
	        </Table>
	    )
	        
const store = createStore(reducer)

const ChickenEditPage = React.createClass({
	componentDidMount: function(){
		//logger('in ChickenEditPage this.props = '+JSON.stringify(this.props))
		clearMessages('chickenEdit')
		if (this.props.params.id){
			setLoading('chickenEdit', true)
			getChick(this.props.params.id, (c)=>{
				setLoading('chickenEdit', false)			
				if (c){
					//logger('ChickenEditPage: dispatch REFRESH '+ JSON.stringify(c))
					store.dispatch(Object.assign({type: REFRESH}, c))
				}
			}, (error)=>{
				setLoading('chickenEdit', false)
				setDangerMessage('chickenEdit', error)
			})
		} else {
			store.dispatch({type: CLEAR})
		}
	}
	, componentWillUnmount: ()=>{
		setLoading('chickenEdit', false)
		logger('ChickenEditPage.componentWillUnmount')
		store.dispatch({type:REFRESH, id:null, weight:null, name:null})//clear chicken list
	}, render: ()=> (
			<div>
		        <h2>Chicken Edit</h2>
				<EventMessages eventId='chickenEdit'></EventMessages>
				<LoadingAnimation eventId='chickenEdit'>
				<Provider store={store}>
					<ChickenEdit />
				</Provider>
				</LoadingAnimation>
			</div>)
		
})

export default ChickenEditPage