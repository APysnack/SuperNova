import React, { useState } from 'react'
import { useEffect } from 'react'

import './Game.css';

// Top missile
function TopMissile(props){

    // note that smaller values are faster
    const missileSpeed = 50;

    // states for the top missile
    const [missileOpacity, setMissileOpacity] = useState(0);
    const [mLocation, setMLocation] = useState([50,20]);
    const [moving, setMoving] = useState(false);
    const [missileHitSuccess, setMissileHitSuccess] = useState(false);

    // continues to check to see if the user has hit the "f" key
    useEffect(() => {
            if (!moving)
            {
                checkFire();
            }
        
        // moves the missile at an interval defined by the speed
        const interval = setInterval(() => {
            moveMissile();
            checkEndFire();
        }, missileSpeed);
        return () => clearInterval(interval);

    },);

    // checks to see if the trigger for the missile has been activated
    const checkFire = () => {
        // if user has selected the "f" key
        if (props.topMissileFire === true){

            // sets the missile's status to "moving"
            setMoving(true);

            // makes the missile visible
            setMissileOpacity(1);

            // calls the function to fire missile
            fireMissile();
        }
    }

    // calls the parent to set topMissileFire to false 
    const topFinishFire = () => {
        props.topFinishFire();
    }

    const botShipHit = () => {
        props.botShipHit();
    }

    // activates when user hits the "f" key
    const fireMissile = () => {

        // sets the parent variable that trigger the fire to false
        topFinishFire(); 

        // sets initialLoc to the coordinates of the ship's head
        let initialLoc = [props.topShipLoc[10][0], props.topShipLoc[10][1] + 2]

        // sets the missile location to the current head of the ship
        setMLocation(initialLoc);
    }

    // checks each pixel of opponent ship to see if it matches missile coords
    const checkHit = (oppShipLoc) => {
        if (oppShipLoc[0] === mLocation[0] && oppShipLoc[1] === mLocation[1]){
            setMissileHitSuccess(true)
        }
    }

    // checks conditions for ending the firing trigger
    const checkEndFire = () => {

        // if missile is out of range of the gameboard, firing complete
        if (mLocation[1] > 96){
            setMissileOpacity(0);
            setMLocation([0,0]);
            setMoving(false);
        }

        props.botShipLoc.map(checkHit)

        if (missileHitSuccess){
            setMissileOpacity(0);
            setMLocation([0,0]);
            setMoving(false);
            botShipHit();
            setMissileHitSuccess(false);
        }
    }

    // if movement is active, moves the missile downward at the set interval
    const moveMissile = () => {
        if (moving){
            let location = {...mLocation}
            location = [location[0], location[1]+2]
            setMLocation(location);
        }
    }

    // returns the missile component to the calling component
    return(
        <div>
            {mLocation.map((dot, i)=>{const style = {
            opacity: `${missileOpacity}`,
            left: `${mLocation[0]}%`,
            top: `${mLocation[1]}%`
        }
        return (<div className="missile" key={i} style={style}></div>)
        })}  
        </div>
    )
}

export default TopMissile