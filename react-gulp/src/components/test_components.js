import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Table} 
	from 'react-bootstrap';
//import axios from 'axios';
	
var MyForm = {};

MyForm.InputForm = 
	React.createClass({
	changeTitle : function(evt){
		var oldSubtitle = this.state.subtitle;
		this.setState({title: evt.target.value, subtitle: oldSubtitle})
		this.props.updateTitleSubtitle(evt.target.value, oldSubtitle)
	},
	validateTitle: function() {
	    var length = this.state.title.length;
	    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else return 'error';
	},			
	changeSubTitle : function(evt){
		var oldTitle = this.state.title;
		this.setState({title: oldTitle, subtitle: evt.target.value})
		this.props.updateTitleSubtitle(oldTitle, evt.target.value)
	},
	validateSubtitle: function() {
	    var length = this.state.subtitle.length;
	    if (length > 10) return 'success';
	    else if (length > 5) return 'warning';
	    else return 'error';
	},			
	reset: function(evt){
		this.setState({title: '', subtitle: ''})
	},
	getInitialState: function() {
		return {title: '', subtitle: ''};
	},
	  
	render: function(){
		return (
		<Grid>
			<Row className="show-grid">
			<Col xs={1} sm={2} md={3}>
			<FormGroup controlId="formTitle" validationState={this.validateTitle()}>
				<FormControl type="text" placeholder="Write your Title" onChange={this.changeTitle} value={this.state.title}/>
				<FormControl.Feedback/>
			</FormGroup>
			</Col>
			<Col xs={1} sm={2} md={3}>
			<FormGroup controlId="formSubtitle" validationState={this.validateSubtitle()}>
				<FormControl type="text" placeholder="Write your Subtitle" onChange={this.changeSubTitle} value={this.state.subtitle}/>
				<FormControl.Feedback/>
			</FormGroup>
			</Col>
			<Col xs={1} sm={2} md={3}>
			<Button bsStyle="success" onClick={this.reset}>Reset</Button>
				</Col>
				</Row>
			</Grid>
			);
	}});

MyForm.TitleSubtitle = 
	React.createClass({
	  updateTitleSubtitle: function(title1, subtitle1){
		this.setState({title: title1, subtitle: subtitle1})
	  },
	  getInitialState: function() {
		return {data: ''};
  },
render: function(){
	return (
		<div>
			<h1>{this.props.docTitle} {this.state.title}</h1>
			<h2>{this.state.subtitle}</h2>
			<MyForm.InputForm updateTitleSubtitle={this.updateTitleSubtitle}/>
			</div>
		);
	}});
	
MyForm.DocTableItem = 
	React.createClass({
	render: function(){
		return (
			<tr><td>{this.props.itemKey+1}</td><td>{this.props.itemText}</td></tr>
		);
	}});
	
MyForm.DocTable = 
	React.createClass({
  loadCommentsFromServer: function() {
	  $.ajax({
		  url: this.props.url,
		  dataType: 'json',
	  cache: false,
	  success: function(data) {
		this.setState({data: data});
	  }.bind(this),
	  error: function(xhr, status, err) {
		//console.error(this.props.url, status, err.toString());
	  }.bind(this)
	});
//	  axios.get(this.props.url)
//	  .then(response => {
//		  console.log(response.data);
//		  this.setState({data: response.data});
//	  });
  },
  getInitialState: function() {
	return {data: []};
  },
  componentDidMount: function() {
	this.loadCommentsFromServer();
	setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
render: function(){
	var items = this.state.data.map(
		function(item, i){
			return (<MyForm.DocTableItem itemText={item} key={i} itemKey={i} />);
			}
		);
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
		);
	}});
	
export default MyForm;
