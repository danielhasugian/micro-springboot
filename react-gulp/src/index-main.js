import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import {Router, Route, IndexRoute} from 'react-router'

import { pageHistory } from './components/service/PageHistory'

import MainWNavBarTop from './components/layout/MainWNavBarTop'
import MainLayout from './components/layout/MainLayout'
import LoginLayout from './components/layout/LoginLayout'
import LoginPage from './components/page/LoginPage'
import TestMainPage from './components/page/TestMainPage'
import HelloWorld from './components/page/HelloWorld'
import ChickenEdit from './components/page/ChickenEdit'
import Calculator from './test/SimpleReduxTest'
import ChickenListPage from './components/page/ChickenListPage'

const App = () => (
		  <Router history={pageHistory}>
		    <Route component={LoginLayout}>
		      <Route path="/" component={LoginPage} />
		    </Route>
		    <Route component={MainLayout}>
		      <Route path="/hello" component={HelloWorld}/>
		      <Route path="/calc" component={Calculator}/>
		      <Route path="/main" component={TestMainPage} />
		      <Route path="/chicken" component={ChickenListPage} />
		      <Route path="/chickenEdit/:id" component={ChickenEdit}/>
		      <Route path="/chickenEdit" component={ChickenEdit}/>
		    </Route>
		  </Router>	    
		)
				
render(
	(
		<App/>
	), 
	document.getElementById('mainDiv'));
