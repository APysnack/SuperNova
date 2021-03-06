import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Game from './components/Game/Game';

const App = () => {
    return(
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/game" component={Game} />
        </Router>
    )
}

export default App;