import React, { useState } from 'react';
import { useEffect } from 'react';

import './Game.css';

// Top Ship component
function TopShip(props){

    const speed = 150;

    // Ship build for the initial state (top left)
    const shipBuild = [ [0,2], [8,2],
    [0,4], [2,4], [4,4], [6,4], [8,4],
    [2,6], [4,6], [6,6],
    // head is index 10
    [4,8]]

    // Ship build for the top right position 
    const shipBuildRight = [ [90,2], [98,2],
    [90,4], [92,4], [94,4], [96,4], [98,4],
    [92,6], [94,6], [96,6],
    // head is index 10
    [94,8]]

    // component state variables
    const [shipLoc, setShipLoc] = useState(shipBuild);
    const [shipDirection, setDirection] = useState(props.currDirection);
    const [active, setActive] = useState(true);
    const [stuckLocation, setStuckLoc] = useState('INIT');

    // Waits for user to select a direction and sets ship movement in that direction
    useEffect(() => {
        setNewDirection();

        // moves the ship at an interval defined by the speed
        const interval = setInterval(() => {
            moveShip();
        }, speed);
        return () => clearInterval(interval);

    },[shipLoc, active]);

    // checks to ensure the ship stays inside the game play area
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

    // Gets the location of the top ship's head and passes to the parent component
    const changeTopShipLoc = (currTopShipLoc) => {
        props.changeTopShipLoc(currTopShipLoc);
    }

    // Sets the ship in a new direction
    const setNewDirection = () => {
        if (active) {
            setDirection(props.currDirection);
        }
        else if (props.currDirection !== stuckLocation){
            setActive(true);
        }
    }

    // changes the location coordinates of the ship to the right
    const shiftRight = ([x,y]) => {
        return([x+2, y]);
    }

    // changes the location coordinates of the ship to the left
    const shiftLeft = ([x,y]) => {
        return([x-2, y]);
    }

    // waits for user input and moves the ship in the designated direction
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
                location = shipBuild;
                break;
            case 'STUCKRIGHT':
                location = shipBuildRight;
                break;
        }
        
        // sets the ship location to the new coordinates
        setShipLoc(location);

        // updates location of the ship's head forparent component (who passes info to missile)
        changeTopShipLoc(shipLoc);

        // ensures the ship is in the bounds of the game area
        checkBounds();
    }


    // returns the ship build to the parent component
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

export default TopShip;