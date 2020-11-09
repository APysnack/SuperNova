import React, { useState } from 'react';
import { useEffect } from 'react';

import './Game.css';

// bottom ship component
function BottomShip(props){

    // controls the movement speed of the ship
    const speed = 150;

    // the initial build of the ship (positioned at the bottom right)
    const shipBuild = [
    [90,96], [98,96],
    [90,94], [92,94], [94,94],
    [96,94], [98,94], [92,92], [94,92], [96,92], [94,90]]
    
    // bottom left build of the ship coordinates
    const shipBuildLeft = [ [0,96], [8,96],
    [0,94], [2,94], [4,94], [6,94], [8,94],
    [2,92], [4,92], [6,92],
    [4,90]]

    // Bottom ship states
    const [shipLoc, setShipLoc] = useState(shipBuild);
    const [shipDirection, setDirection] = useState(props.currDirection);
    const [active, setActive] = useState(true);
    const [stuckLocation, setStuckLoc] = useState('INIT');

    // listens for user input and changes the direction according to user's input
    useEffect(() => {
        setNewDirection();

        // moves ship at a speed as defined above
        const interval = setInterval(() => {
            moveShip();
        }, speed);
        return () => clearInterval(interval);

    },[shipLoc, active,]);

    // checks to ensure the ship is within the game area
    const checkBounds = () => {
        if (shipLoc[0][0] <= 6) {
            setActive(false);    
            setStuckLoc('LEFT');
            setDirection('STUCKLEFT');
        }
        else if(shipLoc[1][0] >= 92){
            setActive(false);    
            setStuckLoc('RIGHT');
            setDirection('STUCKRIGHT');
        }
        else{
            setActive(true);
            setStuckLoc('INIT');
        }
    }

    // tracks the current location of the ships head and passes to the parent
    const changeBotShipLoc = (currBotHeadLoc) => {
        props.changeBotShipLoc(currBotHeadLoc);
    }

    // changes the direction of the ship 
    const setNewDirection = () => {
        if (active) {
            setDirection(props.currDirection);
        }
        else if (props.currDirection !== stuckLocation){
            setActive(true);
        }
    }

    // changes the coordinates of the ship to the right
    const shiftRight = ([x,y]) => {
        return([x+2, y]);
    }

    // changes the coordinates of the ship to the left
    const shiftLeft = ([x,y]) => {
        return([x-2, y]);
    }

    // moves the ship to the left or right depending on input
    const moveShip = () => {
        let location;

        switch (shipDirection){
            case 'RIGHT':
                location = shipLoc.map(shiftRight)
                break;
            case 'LEFT':
                location = shipLoc.map(shiftLeft)
                break;
            case 'STUCKLEFT':
                location = shipBuildLeft;
                break;
            case 'STUCKRIGHT':
                location = shipBuild;
                break;
        }

        setShipLoc(location);
        changeBotShipLoc(shipLoc);
        checkBounds();
    }

    // returns the ship build to the calling component
    return(
    <div>
        {shipLoc.map((dot, i)=>{
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`
            }

            return(
                <div className="pixel" key={i} style={style}></div>
            )
        })}
    </div>
    )
}

export default BottomShip;