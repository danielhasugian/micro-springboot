import ReactDOM from 'react-dom';
import React from 'react';
import MyForm from '../test_components.js';
import FormInput from '../control/FormInput.js';

import DatePicker from "react-bootstrap-date-picker";

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import MainWNavBarTop from '../layout/MainWNavBarTop.js'; 

var validator = function(v, h){
	if (v.value.length > 10 ){
		return "success";
	} else if (v.value.length > 0){
		return "warning";
	} else {
		return "error";
	}
}


var TestMainPage = React.createClass(
{ 
	render: function(){
		var obj = (
		<Grid>
		<Row className="show-grid">
			<Col xs={1} sm={2} md={3}>
				<MyForm.TitleSubtitle docTitle="Test" pollInterval={2000}>From Hello Coder to Hero React Coder</MyForm.TitleSubtitle>
			</Col>
		</Row>
		<Row className="show-grid">
			<Col xs={1} sm={2} md={3}>
				<DatePicker value={new Date().toISOString()} dateFormat="DD/MM/YYYY"/>
			</Col>
		</Row>
		<Row className="show-grid">
		<Col xs={1} sm={2} md={3}>
			<FormInput controlId="Control ID1" validation={validator} placeholder="Please enter something 1" value="A value"/>
		</Col>
		</Row>
		<Row className="show-grid">
		<Col xs={1} sm={2} md={3}>
			<FormInput type="password" controlId="Control ID1" validation={validator} placeholder="Please enter something 1" value="A value"/>
		</Col>
		</Row>
		<Row className="show-grid">
		<Col xs={1} sm={2} md={3}>
			<FormInput inputLabel="Enter something" type="email" controlId="Control ID1" validation={validator} placeholder="Please enter something 1" value="A value"/>
		</Col>
		</Row>
		<Row className="show-grid">
		<Col xs={1} sm={2} md={3}>
			<FormInput inputLabel="Enter something 2" type="email" controlId="Control ID3" placeholder="Please enter something 3" value="A value"/>
		</Col>
		</Row>
		<Row className="show-grid">
			<Col xs={1} sm={2} md={3}>
				<MyForm.DocTable url='data.json' pollInterval={2000} />
			</Col>
		</Row>
		</Grid>);
		return obj;
	}
});

export default TestMainPage;
