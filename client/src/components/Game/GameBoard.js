import React, { useEffect, useState } from 'react'
import TopShip from './TopShip'
import BottomShip from './BottomShip'
import useKey from './UseKey'
import TopMissile from './TopMissile'
import BotMissile from './BotMissile'

import './Game.css';

function GameBoard(props){

    // returns true if the user is pressing a key (left arrow, right arrow, "f", etc.)
    const rightPressed = useKey("ArrowRight");
    const leftPressed = useKey("ArrowLeft");
    const firePressed = useKey("f");

    // this can be changed, but the bottom ship is mapped to different keys than the top ship for now so they can both be operated with 1 keyboard
    const pPressed = useKey("p");
    const iPressed = useKey("i");
    const oPressed = useKey("o");

    // state changes for the top ship/missile
    const [topDirection, setTopDirection] = useState('RIGHT'); 
    const [topMissileFire, setTopMissileFire] = useState(false);
    const [topShipLoc, setTopShipLoc] = useState([0,0]);
    const [topLives, setTopLives] = useState(3);

    // state changes for the bottom ship/missile
    const [bottomDirection, setBottomDirection] = useState('LEFT'); 
    const [botMissileFire, setBotMissileFire] = useState(false);
    const [botShipLoc, setBotShipLoc] = useState([0,0]);
    const [botLives, setBotLives] = useState(3);

    // when the user presses a key, checks the key they pressed and performs actions
    useEffect(() => {
        checkPressTop();
        checkPressBot();
        updateLives();
    },[rightPressed, leftPressed, firePressed, pPressed, iPressed, oPressed,topLives,botLives]);

    // initiates triggers for firing or movement
    const checkPressTop = () => {
        if (rightPressed){
            setTopDirection('RIGHT');
        }
        else if(leftPressed){
            setTopDirection('LEFT');
        }
        if (firePressed){
            setTopMissileFire(true);
        }
    }

    
     // sets the top missile fire to false and ends the trigger
     const topFinishFire = () => {
        setTopMissileFire(false);
    }

    // gets the location of the top ship's head for missile positioning
    const changeTopShipLoc = (currTopShipLoc) => {
        setTopShipLoc(currTopShipLoc);
    }

    
    const topShipHit = () => {
        setTopLives(prevTopLives => prevTopLives - 1);
    }

    const botShipHit = () => {
        setBotLives(prevBotLives => prevBotLives - 1);
    }

    // initiates triggers for firing or movement
    const checkPressBot = () => {
        if (pPressed){
            setBottomDirection('RIGHT');
        }
        else if(iPressed){
            setBottomDirection('LEFT');
        }
        if (oPressed){
            setBotMissileFire(true);
        }
    }

    // sets the bottom missile fire to false and ends the trigger
    const botFinishFire = () => {
        setBotMissileFire(false);
    }

    const updateLives = (topNum, botNum) =>{
        props.updateLives(topLives, botLives);
    }

    // gets the location of the bottom ship's head for missile positioning
    const changeBotShipLoc = (currBotShipLoc) => {
        setBotShipLoc(currBotShipLoc);
    }

    // returns the game area to the calling component
    return(
        <div className = "game-area">
                <BottomShip currDirection={bottomDirection} changeBotShipLoc={changeBotShipLoc}/>
               
                <BotMissile botMissileFire={botMissileFire} botFinishFire={botFinishFire} 
                            topShipLoc={topShipLoc} botShipLoc={botShipLoc}
                            topShipHit={topShipHit}/>

                <TopShip currDirection={topDirection} changeTopShipLoc={changeTopShipLoc}/>

                <TopMissile topMissileFire={topMissileFire} topFinishFire={topFinishFire} 
                            topShipLoc={topShipLoc} botShipLoc={botShipLoc}
                            botShipHit={botShipHit}/>
        </div>
    )
}

export default GameBoard;
