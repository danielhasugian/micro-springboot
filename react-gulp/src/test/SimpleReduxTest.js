import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import FormInput from '../components/control/FormInput.js'
import Button from 'react-bootstrap/lib/Button'
import Table from 'react-bootstrap/lib/Table'

/* ACTION TYPES */
const PLUS = 'PLUS';
const MINUS = 'MINUS';
const DELTA = 'DELTA';
const CLEAR_HISTORY = 'CLEAR_HISTORY';
const PREVIEW_SIGN = 'PREVIEW_SIGN';

/* ACTIONS */
function createPlus(){
	let r = { type: PLUS}
	console.log('in createPlus: '+JSON.stringify(r))
	return r
} 

function createMinus(){
	let r = { type: MINUS}
	console.log('in createMinus: '+JSON.stringify(r))
	return r
}

function createPreviewSign(sign){
	let r = { type: PREVIEW_SIGN, sign}
	console.log('in createPreviewSign: '+JSON.stringify(r))
	return r
}

function createClearHistory(){
	let r = { type: CLEAR_HISTORY}
	console.log('in createClearHistory: '+JSON.stringify(r))
	return r	
}

const createHistoryAction = (x, op, y, type)=>({x, op, y, type})

function createDelta(d){
	let r = { type: DELTA, delta: d}
	console.log('in createMinus: '+JSON.stringify(r))
	return r
}

/* REDUCER */
function calculatorReducer(state, action){
		let r
		if (!state){
			 r = { value: 0, sign:'+', delta: 0}
		} else if (action.type == PLUS){
			let v = Number.isNaN(state.value) === false? parseFloat(state.value) : 0
			let d = Number.isNaN(state.delta) === false? parseFloat(state.delta) : 0
			r = { value: v+d, sign:'+', delta: state.delta}
		} else if (action.type == MINUS){
			let v = Number.isNaN(state.value) === false? parseFloat(state.value) : 0
			let d = Number.isNaN(state.delta) === false? parseFloat(state.delta) : 0
			r = { value: v-d, sign:'-', delta: state.delta}
		} else if (action.type == DELTA){
			r = { value: state.value, sign: state.sign, delta: action.delta}
		} else if (action.type == CLEAR_HISTORY){
			r = { value: state.value, sign: state.sign, delta: state.delta}
		} else {
			r = state;
		}
		console.log('in calculatorReducer state-> '+JSON.stringify(state)
				+', action-> '+JSON.stringify(action)
				+', return-> '+JSON.stringify(r))
		return r
	}

function historyReducer(state, historyAction){
	console.log('begin historyReducer action-> '+JSON.stringify(historyAction))
	if (!state){
		if (!historyAction || historyAction.type == CLEAR_HISTORY){
			return { history: []}
		}
		return { history: [historyAction] }
	}
	if (!historyAction){
		return { history: state.history };
	}
	
	if (historyAction.type == CLEAR_HISTORY){
		return { history:[] }
	}
	let newArray = state.history.slice()
	newArray.push(historyAction)
	
	let newState = { history:newArray }
	console.log('in historyReducer state-> '+JSON.stringify(newState))
	return newState;
}

function previewSignReducer(state, previewAction){
	if (!state){
		return {sign:'+'}
	}
	if (previewAction.type == PREVIEW_SIGN){
		return {sign: previewAction.sign} 
	}
	return state;
}

function combineCalcAndHistoryReducer({calc, hist, preview}){
	return (state, action) => {
		let newState = {}
		console.log('begin combineCalcAndHistoryReducer => '+JSON.stringify(action))
		if (!state){
			state = {calc:null, hist:null, preview:null};
		}
		newState.preview = preview(state.preview, action)
		newState.calc = calc(state.calc, action)
		if (action.type == PLUS || action.type == MINUS || action.type == CLEAR_HISTORY){
			let histAction = histAction = 
				createHistoryAction(
						state.calc ? state.calc.value : 0
						, newState.calc.sign, newState.calc.delta, action.type)
			newState.hist = hist(state.hist, histAction)
		} else {
			newState.hist = hist(state.hist, null);
		}
		console.log('in combineCalcAndHistoryReducer => '+JSON.stringify(newState))
		return newState
	}
}

/* use combine reducers */
let store = createStore(
		combineCalcAndHistoryReducer(
			{calc:calculatorReducer, hist:historyReducer, preview:previewSignReducer}
		)) //we assign calculatorReducer as 'calc', and historyReducer as hist

/* SCREEN COMPONENTS */
const FIELD = (props)=>{
	console.log('Render FIELD => '+JSON.stringify(props))
	return (
	props.readOnly ? <FormInput value={props.value} readOnly='readOnly'
		onChange={typeof props.onChange === 'function'? props.onChange : undefined}/>
		: <FormInput value={props.value} 
		onChange={typeof props.onChange === 'function'? props.onChange : undefined}/>
	)
}
const RESULT = ({value})=>(<div>{value}</div>)
const SIGN = ({sign})=>(<div>{sign}</div>)
const PLUS_BTN = ({onClick, onMouseOver})=>(<Button bsStyle='primary' onClick={onClick} onMouseOver={onMouseOver}>Plus</Button>)
const MINUS_BTN = ({onClick, onMouseOver})=>(<Button bsStyle='primary' onClick={onClick} onMouseOver={onMouseOver}>Minus</Button>)
const CLEAR_BTN = ({onClick})=>(<Button bsStyle='primary' onClick={onClick}>Clear</Button>)
const HISTORY_LIST = 
		({history})=> {
			
			let items = history
				.filter((item) => (typeof item !== 'undefined' && typeof item.op === 'string'))
				.map(({x, op, y}, i)=>(<tr><td>{i+1}</td><td>{x} {op} {y} = {eval(x+op+y)} </td></tr>))
			if (!items || items.length == 0){
				items = [(<tr><td colSpan='2'>No data found</td></tr>)]
			}
			return (
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
					{items}
					</tbody>
				</Table>
			)
		}

/* STATE TO PROPS */
const mapStateToDisplayProp = (state)=> ({ value:  state.calc.value, readOnly: true })
const mapStateToSignProp = (state)=> ({ sign: state.preview.sign })
const mapStateToDeltaProp = (state)=> ({ value: state.calc.delta, readOnly: false })
const mapStateToHistoryProp = (state)=> ({ history: state.hist.history})

/* DISPATCH TO PROPS */
const mapPlusDispatchToProp = (dispatch)=>
	({
		onClick: ()=>{
			dispatch(createPlus())
		}
		, onMouseOver: ()=> {
			dispatch(createPreviewSign('+'))
		}
	})
const mapMinusDispatchToProp = (dispatch)=>
	({
		onClick: ()=>{
			dispatch(createMinus())
		}
		, onMouseOver: ()=>{
			dispatch(createPreviewSign('-'))
		}
	})
const mapClearDispatchToProp = (dispatch)=>
	({
		onClick: ()=>{
			dispatch(createClearHistory())
		}
	})
	
const mapDeltaDispatchToProp = (dispatch)=>
	({
		onChange: (evt)=>(
				dispatch(createDelta(evt.target.value)))
	})

const Display = connect(mapStateToDisplayProp)(RESULT)
const Delta = connect(mapStateToDeltaProp, mapDeltaDispatchToProp)(FIELD)
const Sign = connect(mapStateToSignProp)(SIGN)
const Plus = connect(undefined, mapPlusDispatchToProp)(PLUS_BTN)
const ClearHistory = connect(undefined, mapClearDispatchToProp)(CLEAR_BTN)
const Minus = connect(undefined, mapMinusDispatchToProp)(MINUS_BTN)
const Hist = connect(mapStateToHistoryProp)(HISTORY_LIST)

const Calculator = ()=> (
	<div>
		Please click plus, minus, or clear <br/>
		<Sign/> <Delta/> = <Display/> <Plus/> <Minus/> <ClearHistory/>
		<br/>
		<Hist/>
	</div>
)

const CalculatorApp = () => <Provider store={store}><Calculator/></Provider>

export default CalculatorApp
