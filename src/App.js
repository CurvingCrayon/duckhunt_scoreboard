import React, { useState, useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Global from './Global.js';
import Scores from './Scores.js';
import HeadAlert from './HeadAlert.js';
import Confirm from './Confirm.js';

import './App.css';





function App(){ 
	//Alert box
	const [text, setText] = useState("");
	const [type, setType] = useState("success");

	//COnfirm box
	const [showConfirm, setShowConfirm] = useState(false);
	const [confirmText, setConfirmText] = useState("");
	
	function updateAlert(text, type){
		setType(type);
		setText(text);
	}

	
	function updateConfirm(text){
		//var d = new Date();
		//setConfirmText(d.getSeconds());
		setConfirmText(text);
		setShowConfirm(true);
		console.log("Attempting update");
	}

	useEffect(()=>{
		Global.subAlert(updateAlert);
		Global.subConfirm(updateConfirm);
	},[]);
	

	return (
	
	<Container className="p-3">
		<Confirm show={showConfirm} text={confirmText} onConfirm={function(){setShowConfirm(false);Global.confirmClick();}} onCancel={function(){setShowConfirm(false);Global.cancelClick();}} />
		<HeadAlert text={text} variant={type} />
		<Jumbotron>
			<h1 className="display-3">Duck Hunter High Scores</h1>
			<h3>by The UTS Electrical Society</h3>
		</Jumbotron>
		<Scores alertFunction={text=>updateAlert} />
	</Container>
	);
}

export default App;
