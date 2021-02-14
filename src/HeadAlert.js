import React, { useState, useEffect }  from 'react';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';
import Collapse from 'react-bootstrap/Collapse';



import './HeadAlert.css';



function HeadAlert(props){
    const [open, setOpen] = useState(false);

    var variant = props.variant || "success";

    useEffect(()=>{
        setOpen(true);
    },[props.text]);

    useEffect(()=>{
        setOpen(false);
    },[]);

    return (
        <div className="headAlert" style={{display: open ? 'block' : 'none'}}>
            <Alert variant={variant} onClose={()=>setOpen(false)} dismissible>
                {props.text}
            </Alert>
        </div>
    );
}

export default HeadAlert;