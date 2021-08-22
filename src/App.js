import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Tracker from './pages/Tracker/Tracker';
import Predictor from './pages/Predictor/Predictor';
import './App.css';


const App = () => {
    const cursorRadius = 4;

    const moveCursor = (e) => {
        const cursor = document.querySelector('#cursor');

        if (cursor) {
            cursor.style.left = `calc(${e.clientX}px - ${cursorRadius}vw)`;
            cursor.style.top = `calc(${e.clientY}px - ${cursorRadius}vw)`;
        }
    };

    return (
        <Router>
            <div className='App' onMouseMove={moveCursor}>
                <Navbar />

                <div className='content'>
                    <Switch>
                        <Route exact path='/'>
                            <Tracker />
                        </Route>

                        <Route path='/predictor'>
                            <Predictor />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;