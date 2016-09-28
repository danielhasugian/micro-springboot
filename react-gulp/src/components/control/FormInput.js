import ReactDOM from 'react-dom'
import React from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

const FormInput = ({controlId, type, value, placeholder, validationState, inputLabel, help, onChange,
	onKeyUp}) => {
	  let controlLabel = inputLabel ? (<ControlLabel>{inputLabel}</ControlLabel>) : '';
	  let helpBlock = help ? (<HelpBlock>{help}</HelpBlock>) : '';
	  
	  return (<FormGroup controlId={controlId} validationState={validationState}>
		{controlLabel}
		<FormControl type={type} placeholder={placeholder} value={value}  
			onChange={onChange} onKeyUp={onKeyUp}/>
		<FormControl.Feedback/>{help}
		</FormGroup>)
}

export default FormInput;
