import { apiResolver } from 'next/dist/next-server/server/api-utils';
import React, { useState, useEffect }  from 'react';
import Table from 'react-bootstrap/Table';

import scoreAPI from './scoreAPI.js';


function ListItems(props){
    const data = props.data;
    
    
    const items = data.map((item) =>
    <>
        <tr>
            <td>{item.rank}</td>
            <td>{item.name}</td>
            <td>{item.score}</td>
        </tr>
    </>);
    return items;
}


function Scores(){
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({success: false});
    //const [success, setSuccess] = useState(false);
    
    useEffect(()=>{ //Begin loading of lists
        console.log("asdf");
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