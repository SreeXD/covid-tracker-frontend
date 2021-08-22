import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

import Loading from '../../components/Loading/Loading';
import Display from '../../components/Display/Display';
import States from '../../components/States/States';
import TrackerContext from '../../contexts/TrackerContext';

const span = 90;

const features = {
    confirmed : 'Total',
    other : 'Active',
    recovered : 'Recovered',
    deceased : 'Deceased',
    vaccinated1 : 'Vaccinated',
    vaccinated2 : 'Vaccinated'
};

export const preprocess = (timeseries) => {
    for (let state in timeseries.current) {
        let dates = Object.keys(timeseries.current[state].dates).slice(-span - 7);

        for (var date of dates) {
            const sobject = timeseries.current[state].dates[date];
            sobject.total = sobject.total ?? {};
            sobject.delta = sobject.delta ?? {};
            sobject.delta7 = sobject.delta7 ?? {};
            let total = sobject.total;
            let delta = sobject.delta;

            total.other = (total.confirmed ?? 0) - (total.recovered ?? 0) - (total.deceased ?? 0) - (total.other ?? 0);
            delta.other = undefined;
        }
    }
}

const Tracker = () => {
    const [ loading, setLoading ] = useState(true);
    var daily = useRef(null);
    var timeseries = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            let res1, res2;

            try {
                let get1 = axios.get(process.env.REACT_APP_DAILY_ENDPOINT);
                let get2 = axios.get(process.env.REACT_APP_TIMESERIES_ENDPOINT);
                res1 = await get1;
                res2 = await get2;
            } 
            catch (error) {
                let get1 = axios.get(`${process.env.REACT_APP_SERVER}/fallback/daily.json`);
                let get2 = axios.get(`${process.env.REACT_APP_SERVER}/fallback/timeseries.json`);
                res1 = await get1;
                res2 = await get2;
            }

            daily.current = res1.data;
            timeseries.current = res2.data;

            for (let state in daily.current) {
                let sobject = daily.current[state];
                sobject.total = sobject.total ?? {};
                sobject.delta = sobject.delta ?? {};
                sobject.delta7 = sobject.delta7 ?? {};
                let total = sobject.total;
                let delta = sobject.delta;

                total.other = (total.confirmed ?? 0) - (total.recovered ?? 0) - (total.deceased ?? 0) - (total.other ?? 0);
                delta.other = undefined;

                for (let district in daily.current[state].districts) {
                    let dobject = daily.current[state].districts[district];
                    dobject.total = dobject.total ?? {};
                    dobject.delta = dobject.delta ?? {};
                    dobject.delta7 = dobject.delta7 ?? {};
                    let dtotal = dobject.total;
                    let ddelta = dobject.delta;

                    dtotal.other = (dtotal.confirmed ?? 0) - (dtotal.recovered ?? 0) - (dtotal.deceased ?? 0) - (dtotal.other ?? 0);
                    ddelta.other = undefined; 
                }
            }

            preprocess(timeseries);

            setTimeout(() => setLoading(false), 200);
        };

        fetchData();
    }, []);

    return ( 
        <>
            <CSSTransition in={loading} timeout={300} classNames='loading' unmountOnExit>
                <Loading />
            </CSSTransition>

            {!loading && 
                <TrackerContext.Provider value={{ daily: daily.current, timeseries: timeseries.current, span: span, features: features }}>
                    <Display />
                    <States />
                </TrackerContext.Provider>
            }
        </>
    );
}

export default Tracker;