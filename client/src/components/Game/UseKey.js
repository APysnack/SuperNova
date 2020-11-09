import {useEffect, useState} from 'react';

import './Game.css';

// function for detecting user keyboard input
function useKey(key) {
    const [pressed, setPressed] = useState(false)
    const match = event => key.toLowerCase() === event.key.toLowerCase()

    const onDown = event => {
        if (match(event)) {
            setPressed(true);
            setPressed(false);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", onDown)
        return () => {
            window.removeEventListener("keydown", onDown)
        }
    }, [key])

    return pressed
}

export default useKey;