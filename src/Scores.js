import { apiResolver } from 'next/dist/next-server/server/api-utils';
import React, { useState, useEffect }  from 'react';
import Table from 'react-bootstrap/Table';

import scoreAPI from './scoreAPI.js';

import App from './App.js';
import Global from './Global.js';


function canEdit(){
    return true;
    if(window.location.pathname.search("edit") != -1){
        return true;
    }
    return false;
}
function Score(props){
    const [exists, setExists] = useState(true);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(props.name);
    const [targetName, setTargetName] = useState(props.name);
    function attemptEdit(e){      
        if(canEdit()){
            setEdit(!edit);
        }
        if(e !== undefined){
            e.preventDefault();
        }
    }

    function confirmName(){
        if(targetName != name){
            scoreAPI.updateName(props.id, targetName).then(success=>{
                if(success){
                    setName(targetName); //Update name on list
                    //Create success alert
                    Global.setAlertType("success");
                    Global.setAlert("Successfully updated name to " + targetName); 
                }
                else{
                    Global.setAlertType("danger");
                    Global.setAlert("Failed to update name to " + targetName); 
                }
                attemptEdit(); //Close editing box
            });
        } 
        
    }
    function cancelName(){
        setTargetName(name); 
        attemptEdit();
    }

    function attemptDelete(e){
        Global.confirm("Are you sure you want to delete this score?",
        function(){ //Confirm
            scoreAPI.deleteScore(props.id).then(success=>{
                if(success){
                    Global.setAlertType("success");
                    Global.setAlert("Successfully deleted score."); 
                    setExists(false);
                }
                else{
                    Global.setAlertType("danger");
                    Global.setAlert("Failed to delete score for " + props.name);
                }
            });
        },
        function(){ //Cancel
            //console.log("Cancelled")
        });
        if(e !== undefined){
            e.preventDefault();
        }
    }
    function handleKey(e){
        if(e.keyCode == 13){ //Enter
            confirmName();
        }
        else if(e.keyCode == 27){ //Escape
            cancelName();
        }
    }
    return (<>
        {
            exists ? 
            <tr>
                <td>{props.rank}</td>
                
                <td onContextMenu={attemptEdit}>
                    {edit ?
                    <>
                        <input type="text" onKeyDown={handleKey} value={targetName} onChange={event=>setTargetName(event.target.value)} />
                        <span onClick={confirmName} >✔️</span>
                        <span onClick={cancelName}>❌</span>
                    </> 
                    :
                    name
                }</td>
                
                
                <td onContextMenu={attemptDelete}>{props.score}</td>
            </tr>
        :
        <></>
        }
        </>
        
    );
}
function ListItems(props){
    const data = props.data;
    
    
    const items = data.map((item) =>
        <Score rank={item.rank} name={item.name} score={item.score} id={item._id} />
    );
    return items;
}


function Scores(){
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({success: false});
    //const [success, setSuccess] = useState(false);
    
    useEffect(()=>{ //Begin loading of lists
        scoreAPI.getScores().then(res => {
            setData(res);
            setLoaded(true);
            
        });
    }, []);

    return  (
        <>
        {loaded ? <>
            {
                data.success ? <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ListItems data={data.scores} />
                                    </tbody>
                                </Table>
                :
                <h3>Loading failed</h3>
            }
            </>
             :
            <h3>Loading</h3>
        }
        </>
    );
}

export default Scores;