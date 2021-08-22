import React, { useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import { preprocess } from '../Tracker/Tracker';
import Loading from '../../components/Loading/Loading';
import PredictorContext from '../../contexts/PredictorContext';
import Predictions from '../../components/Predictions/Predictions';
import { Cursor, PredictorWrapper } from './PredictorStyles';

const outputs = {
    confirmed: 'Confirmed',
    recovered: 'Recovered',
    deceased: 'Deceased'
};

const Predictor = () => {
    const [ loading, setLoading ] = useState(true);
    const prediction = useRef(null);
    const timeseries = useRef(null);
    const cursorRadius = 5;


    useEffect(() => {
        const fetchData = async () => {
            let res1;

            try {
                res1 = await axios.get(process.env.REACT_APP_TIMESERIES_ENDPOINT);
            }
            catch (error) {
                res1 = await axios.get(`${process.env.REACT_APP_SERVER}/fallback/timeseries.json`);
            }

            timeseries.current = res1.data;

            const dates = Object.keys(timeseries.current.TT.dates);
            const date = new Date(dates[dates.length - 1]);
            date.setDate(date.getDate() + 1);

            const res2 = await axios.get(`${process.env.REACT_APP_SERVER}/prediction/${date.toISOString()}`);
            prediction.current = res2.data;

            preprocess(timeseries);

            setTimeout(() => setLoading(false), 200);
        };

        fetchData();
    }, []); 

    return (
        <PredictorWrapper>
            <Cursor id={'cursor'} r={cursorRadius}/>

            <CSSTransition in={loading} classNames={'loading'} timeout={300} unmountOnExit>
                <Loading />
            </CSSTransition>

            { !loading && 
                <PredictorContext.Provider value={{ outputs: outputs, timeseries: timeseries.current, prediction: prediction.current }}>
                    <Predictions />
                </PredictorContext.Provider>
            }
        </PredictorWrapper>
    );
}

export default Predictor;