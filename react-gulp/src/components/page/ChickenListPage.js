import React from 'react'
import ReactDOM from 'react-dom'

import { Provider, connect } from 'react-redux'
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'

import { Link } from 'react-router'

import { createStore } from 'redux'

import logger from '../util/Logger'

//import Loading from 'react-loading-animation'
import {setLoading, LoadingAnimation} from '../control/LoadingAnimation'
import {EventMessages, setWarningMessage, clearMessages, setSuccessMessage} from '../control/PageMessages'

import {getChicken, deleteChick} from '../service/ChickenService'
import { pageHistory } from '../service/PageHistory'

const REFRESH = 'REFRESH'

function reducer(state, action){
	if (action.type === REFRESH){
		logger('In Chicken reducer REFRESH = '+action.list)
		return {list: action.list}
	}
	return !state ? {list:[]} : state
}

function mapStateToProps(state){
	return {list: state.list}
}

function deleteItem(id){
	setLoading('chickenList', true)
	deleteChick(id
		, (d)=>{
			setLoading('chickenList', false)
			setSuccessMessage('chickenList', 'Successfully deleted '+d.name)
			store.dispatch({type:'REFRESH', list:[]})
			callGetChicken()
		}, (e)=>{
			setLoading('chickenList', false)
			setWarningMessage('chickenList', e)
		})
}

const ChickenList = ({list}) =>{
	logger('In ChickenList with list = '+list)
	let items = Array.isArray(list) && list.length > 0 ? list.map((c, i)=>
		(<tr key={i}>
			<td>{i+1}</td>
			<td><Link to={'/chickenEdit/'+c.id} >{c.id}</Link></td>
			<td>{c.name}</td>
			<td>{c.weight}</td>
			<td><Button bsStyle='warning' bsSize='small' onClick={ ()=>{deleteItem(c.id)} }>Delete</Button></td>
		</tr>)) 
		: (<tr><td colSpan='5'>No chicken found</td></tr>)
	return (
		<Table striped bordered condensed hover>
			<thead>
				<tr>
					<th>#</th>
					<th>ID</th>
					<th>Name</th>
					<th>Weight</th>
					<th> </th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</Table>
	)
}

const ConnectedChickenList = connect(mapStateToProps)(ChickenList)

function newChick(){
	pageHistory.push('/chickenEdit')
}

function callGetChicken(){
	setLoading('chickenList', true)
	getChicken((l)=>{
		setLoading('chickenList', false)			
		if (l.length > 0){
			logger('ChickenListPage: dispatch REFRESH '+l)
			store.dispatch({type: REFRESH, list: l})
		}
	}, (error)=>{
		setLoading('chickenList', false)
		setWarningMessage('chickenList', error)
	})
}

const store = createStore(reducer)

const ChickenListPage = React.createClass({
	componentDidMount: callGetChicken
	, componentWillUnmount: ()=>{
		setLoading('chickenList', false)
		clearMessages('chickenList')
		logger('ChickenListPage.componentWillUnmount')
		store.dispatch({type:REFRESH, list:[]})//clear chicken list
	}
	, render: ()=>(
		<div>
			<h2>Chicken List</h2>
			<EventMessages eventId='chickenList'/>
			<LoadingAnimation eventId='chickenList'>
				<Provider store={store}>
					<ConnectedChickenList/>
				</Provider>
				<Button bsStyle='primary' onClick={newChick} >Add New</Button>
			</LoadingAnimation>
		</div>
	)
})

export default ChickenListPage
