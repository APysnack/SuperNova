import React, { useEffect, useState } from 'react'
import GameBoard from './GameBoard'
import queryString from 'query-string';
import io from 'socket.io-client'

import './Game.css';
import Input from './Input/Input'
import Messages from './Messages/Messages'

var socket;

function Game({ location }){

    const [topLives, setTopLives] = useState(3);
    const [botLives, setBotLives] = useState(3);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000'

    // style for the header (lives tracker)
    const hStyle = {
        margin: '20px auto',
        position: 'relative',
        textAlign: 'center',
        fontSize: 'x-large'
    };

    // parses name/room from url and sends data to server socket
    useEffect(() => {
        // parses name/room for the url
        const { name, room } = queryString.parse(location.search)

        // creates a client socket
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // calls the join function on server side, passing name & room
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
        });

    }, [ENDPOINT, location.search]);

    // when the user hits enter, triggers sendMessage, which triggers 
    // this use effect to add the message to the array of messages
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    // triggered by enter key, sends the message to the back end which returns to the room
    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const updateLives = (topNum, botNum) => {
        setTopLives(topNum);
        setBotLives(botNum);
    }

    return(
        <div>
            <div>
                <h1 style={hStyle}>P1: Lives Left: {topLives}</h1>
                <GameBoard updateLives={updateLives} socket={socket}/>
                <h1 style={hStyle}>P2: Lives Left: {botLives}</h1>
            </div>
            <div>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Game;