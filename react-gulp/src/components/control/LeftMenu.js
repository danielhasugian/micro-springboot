import React from 'react'
import { Router, Route, Link } from 'react-router'

import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

//import Loading from 'react-loading-animation'
import {setLoading, LoadingAnimation} from './LoadingAnimation'

import { getMenu } from '../service/MenuService'
import logger from '../util/Logger'

let submenuIdx = 1

const SideMenuItem = ({to, iconClass, desc, children}) => {
	let idx = 'submenu'+(submenuIdx++)
	let icon = iconClass ? <i className={'fa fa-fw '+iconClass}></i> : ''
	
	logger('submenuidx = '+idx)
	return ((!children || children.length == 0) ? 
		(<li>
			<Link to={to ? to : '/'}>
				{icon} {desc}
			</Link>
		 </li>
		)
		: 
		(
			<li>
			<a href='javascript:;' data-toggle='collapse' data-target={'#'+idx}>{icon} {desc}<i className='fa fa-fw fa-caret-down'></i></a>
			<ul id={idx} className="collapse">
			{children}	    
			</ul>
			</li>
		)
	)
}

const SideMenu = ({children})=> (<LoadingAnimation eventId='sideMenu'>
									<ul className='nav navbar-nav side-nav'>
									{children}
									</ul>
								</LoadingAnimation>)

function generateChildren(children){
	let result = []
	if (!Array.isArray(children)){
		return result
	}
	let i = 0;
	for (let item of children){
		if (Array.isArray(item.children)){
			if (item.iconClass){
				result.push(<SideMenuItem key={'menu'+ (i++)} iconClass={item.iconClass} desc={item.desc}>
				{generateChildren(item.children)}
				</SideMenuItem>)
			} else {
				result.push(<SideMenuItem  key={'menu'+ (i++)} desc={item.desc}>
				{generateChildren(item.children)}
				</SideMenuItem>)
			}
		} else {
			if (item.iconClass){
				result.push(<SideMenuItem  key={'menu'+ (i++)} iconClass={item.iconClass} to={item.to} desc={item.desc}></SideMenuItem>)
			} else {
				result.push(<SideMenuItem  key={'menu'+ (i++)} to={item.to} desc={item.desc}></SideMenuItem>)
			}
		}
	}
	return result;
}

const GenSideMenu = ({items, children})=> {
	let allChildren = items ? generateChildren(items) : [];
	if (children){
		if (Array.isArray(children)){
			Array.prototype.push.apply(allChildren, children)
		} else {
			allChildren.push(children)
		}
	}
	return <SideMenu>{allChildren}</SideMenu>
}

const REFRESH = 'REFRESH'

function reducer(state, action){
	if (action.type === REFRESH){
		return {items: action.items}
	}
	if (!state){
		return {items:[]}
	}
	return state
}

const store = createStore(reducer)

function mapStateToProp(state){
	return {items: state.items}
}

function reloadMenu(){
	setLoading('sideMenu', true)
	getMenu((children)=>{
		setLoading('sideMenu', false)
		logger('In reloadMenu. Dispatching using chldren: '+children)
		store.dispatch({type: REFRESH, items: children})
	}, ()=>{setLoading('sideMenu', false)})
}

const ConnectedGenSideMenu = connect(mapStateToProp)(GenSideMenu)

const GeneratedSideMenu = React.createClass({
	componentDidMount: () => {
		logger('GeneratedSideMenu.componentDidMount')
		reloadMenu() //reload on mount
	}
	, componentWillUnmount: () => {
		setLoading('sideMenu', false)
		logger('GeneratedSideMenu.coponentWillUnmount')
		store.dispatch({type: REFRESH, items: []})//clear menu on unmount
	}
	, render: ()=> (
			<Provider store={store}><ConnectedGenSideMenu/>
			</Provider>
	)
})

export {SideMenu, SideMenuItem, GeneratedSideMenu, reloadMenu} 
