import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">SuperNova</h1>

                {/* input fields: takes the input and changes the Name and Room variables to the user's input  */}
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                
                {/* takes the name and room variables and passes them through the url */}
                <Link onClick={event => (!name || !room) ? event.preventDefault : null} to={`/game?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;