import React from 'react';
import {Link} from "react-router-dom";

const Submitted=()=>{
    return(
        <div className="container">
        <header className="App-header">
            <p>発注を受け付けました</p>
        </header>
        <Link to={`/`}>Back to Home</Link>
        </div>
    );
}

export {Submitted};