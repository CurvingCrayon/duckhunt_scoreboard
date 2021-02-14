import React, { useState, useEffect }  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Confirm(props){
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setShow(true);
        console.log("Text property updated");
    }, [props.text]);

    useEffect(()=>{
        setShow(props.show);
        console.log("Show property updated");
    }, [props.show]);
    
    useEffect(()=>{
        setShow(false);
    },[]);
    return(
        <Modal show={show}
        onHide={()=>{setShow(false); props.onCancel()}}
        // backdrop="static"
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.text}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={()=>{setShow(false); props.onConfirm()}}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={()=>{setShow(false); props.onCancel()}}>
                    Cancel
                </Button>
                
            </Modal.Footer>
        </Modal>
    );
}

export default Confirm;