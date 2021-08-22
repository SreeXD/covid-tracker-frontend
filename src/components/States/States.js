import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, VerticalBarSeries } from 'react-vis';

import TrackerContext from '../../contexts/TrackerContext';
import Map from '../../components/Map/Map';
import { StatesBody, StatesContainer, State, StateViewer, StateSelect, StateOption, StateDataContainer, StateDataList, StateData, StateDataItem, DataItemHeader, DataItemValue, DataItemDelta, 
         Plots, Plot, PlotHeading, PlotHeadingType, PlotValue, PlotDate, PlotMarker,
         Districts, District, DistrictHead, DistrictDefinition, DefinitionValue, DefinitionDelta } from './StatesStyles';

import StateCodes from '../../assets/stateCodes.json';

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const plotStyle = {
    overflowX: 'visible'
};

const gridStyle = {
    stroke: "rgb(33 33 37)",
}

const lineSeriesStyle = {
    fill: "none",
    strokeWidth: "2px"
}

const barSeriesStyle = {
    strokeWidth: "1px",
    opacity: 0.65
}

const axisStyle = {
    line: {
        strokeWidth: "1px",
        stroke: "rgba(235, 235, 235, 0.9)"
    }, 

    text: {
        stroke: "none",
        fill: "var(--light)",
        fontFamily: "roboto",
        fontSize: "0.56rem",
        fontWeight: 400
    }
};

const formatYTick = (val, index, scale, tickTotal) => {
    var sval = null;

    if (val >= 1e8) {
        val /= 1e9;
        sval = val.toFixed(2).toString() + "Cr";
    }

    else if (val >= 1e5) {
        val /= 1e5;
        sval = val.toFixed(1).toString() + "L";
    }

    else if (val >= 1e3) {
        val /= 1e3;
        sval = val.toFixed(1).toString() + "K";
    }

    else sval = val.toString();

    return sval;
};

const formatXTick = (val, index, scale, tickTotal) => {
    const date = new Date(val * 86400000);
    return `${months[date.getMonth()]} ${date.getFullYear() % 100}`;
}

const indices = {};
const pathMap = {};
Object.keys(StateCodes).forEach((x, i) => indices[x] = i);

const States = () => {
    const context = useContext(TrackerContext);
    const daily = context.daily; 
    const timeseries = context.timeseries;
    const span = context.span;
    const [ state, setState ] = useState('AN');
    const features = context.features;

    const selectState = (e) => {
        const stateCode = e.target.options[e.target.selectedIndex].value;
        setState(stateCode);

        const prev = document.getElementsByClassName('active-state')[0];
        if (prev !== undefined)
            prev.classList.toggle('active-state');

        pathMap[stateCode].classList.toggle('active-state');
    }

    useEffect(() => {
        var map = document.getElementById('map');
        var paths = map.getElementsByTagName('path');

        for (var i = 0; i < paths.length; ++i) {
            paths[i].onclick = (e) => {
                const curState = e.target.id;
                const stateSelect = document.getElementById('stateSelect');
                setState(curState);
                stateSelect.selectedIndex = indices[curState];

                const prev = document.getElementsByClassName('active-state')[0];
                prev.classList.toggle('active-state');
                e.target.classList.toggle('active-state');
            };

            const stateCode = paths[i].id;
            pathMap[stateCode] = paths[i];

            if (stateCode == 'AN') 
                paths[i].classList.add('active-state');
        }
    }, []);    

    const getPlot = (state, feature) => {
        const ts_state = timeseries[state].dates;
        const dates = Object.keys(ts_state).slice(-span - 7);
        const priorWeek = Object.keys(ts_state).slice(-span - 7, -span);
        let dailyPlot = [] 
        let weeklyPlot = []
        let xticks = []
        let dailyMax = 0;
        let weeklyAvg = 0;

        if (feature == 'other') {
            for (let x of priorWeek) {
                let val = ts_state[x].total[feature] ?? 0;
                weeklyAvg += val; 
            }
        }

        dates.forEach((x, i) => {
            if (i < 7) return;

            let date = new Date(x);
            const days = date.getTime() / 86400000;

            if (date.getDate() == 1) 
                xticks.push(days);

            let val = (feature === 'other' ? ts_state[x].total[feature] : ts_state[x].delta[feature]) ?? 0; 

            dailyMax = Math.max(dailyMax, val);
            dailyPlot.push({ x: days, y: val });

            if (feature === 'other') {
                let xp = dates[i - 7]; 
                let pval = ts_state[xp].total[feature] ?? 0;
                weeklyAvg += val;
                weeklyAvg -= pval;
            }

            else weeklyAvg = ts_state[x].delta7[feature] ?? 0;

            weeklyPlot.push({ x: days, y: weeklyAvg / 7 });
        });

        return [ dailyPlot, dailyMax, weeklyPlot, xticks ];
    };

    return (
        <StatesContainer>
            <State>
                <StateViewer>
                    <StateDataContainer>
                        <StateDataList>
                            <StateSelect id='stateSelect' onChange={selectState}>
                                {Object.keys(StateCodes).map((x, i) => (
                                    <StateOption key={i} value={x}>
                                        {StateCodes[x]}
                                    </StateOption>
                                ))}
                            </StateSelect>

                            {Object.keys(features).map((x, i) => (
                                <StateData key={i}>
                                    <StateDataItem>
                                        <DataItemHeader data-content={ i < 4 ? "" : `dose ${i-3}` }>{features[x]}</DataItemHeader>

                                        <DataItemValue>{daily[state].total[x].toLocaleString()}</DataItemValue>

                                        {i < 4 && daily[state].delta[x] !== undefined &&
                                            <DataItemDelta>+{daily[state].delta[x].toLocaleString()}</DataItemDelta>
                                        }
                                    </StateDataItem>
                                </StateData>
                            ))}
                        </StateDataList>
                    </StateDataContainer>
                    
                    <Map />
                </StateViewer>

                <Plots>
                    {Object.keys(features).map((x, i) => {
                        const [ dailyPlot, dailyMax, weeklyPlot, xticks ] = getPlot(state, x);                        

                        const lx = new Date(dailyPlot[span-1].x * 86400000);
                        const lxf = `${lx.getDate()} ${months[lx.getMonth()]} ${lx.getFullYear() % 100}`;
                        const lxk = lx.toISOString().slice(0, 10);
                        const ly = (x === 'other' ? daily[state].total[x] : timeseries[state].dates[lxk].delta[x]) ?? 0;

                        return (
                            <Plot key={i}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <PlotHeading data-content={ i < 4 ? null : `dose ${i-3}`}>{features[x]}</PlotHeading>
                                        <PlotHeadingType>{ i == 1 ? 'total' : 'new' }</PlotHeadingType>
                                    </div>

                                    <div>
                                        <PlotValue id={`plotv-${x}`}>{ly.toLocaleString()}</PlotValue>
                                        <PlotDate id={`plotd-${x}`}>{lxf}</PlotDate>
                                    </div>
                                </div>

                                <FlexibleXYPlot
                                    id={x}
                                    style={plotStyle}
                                    yDomain={[ 0, dailyMax ]}
                                    onMouseLeave={e => {
                                        for (let x in features) {
                                            const plotDate = document.getElementById(`plotd-${x}`);
                                            const plotVal = document.getElementById(`plotv-${x}`);
                                            const plotMarker = document.getElementById(`plotm-${x}`);
                                            const y = (x === 'other' ? daily[state].total[x] : timeseries[state].dates[lxk].delta[x]) ?? 0;

                                            plotDate.innerHTML = lxf;
                                            plotVal.innerHTML = y.toLocaleString();
                                            plotMarker.style.opacity = 0;
                                        }
                                    }}>

                                    <HorizontalGridLines style={gridStyle} />
                                    <VerticalGridLines style={gridStyle} />

                                    <VerticalBarSeries
                                        animation
                                        color="rgb(54 54 58)"
                                        style={barSeriesStyle}
                                        data={dailyPlot}
                                        onNearestX={(val, { event, innerX, index }) => {
                                            for (let x in features) {
                                                const plotDate = document.getElementById(`plotd-${x}`);
                                                const plotVal = document.getElementById(`plotv-${x}`);
                                                const plotMarker = document.getElementById(`plotm-${x}`);

                                                const date = new Date(val.x * 86400000);
                                                const sdate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() % 100}`
                                                const kdate = date.toISOString().slice(0, 10);
                                                const ts_state = timeseries[state].dates;
                                                let y = (x == 'other' ? ts_state[kdate].total[x] : ts_state[kdate].delta[x]) ?? 0;

                                                plotDate.innerHTML = sdate;
                                                plotVal.innerHTML = y.toLocaleString();
                                                plotMarker.style.opacity = 1;
                                                plotMarker.style.left = `${innerX + 41}px`;
                                            }
                                        }} />

                                    <LineSeries 
                                        animation
                                        color="var(--grey)"
                                        style={lineSeriesStyle}
                                        data={weeklyPlot} />
                                
                                    <PlotMarker id={`plotm-${x}`} />

                                    <XAxis style={axisStyle} tickFormat={formatXTick} tickValues={xticks} />
                                    <YAxis style={axisStyle} tickFormat={formatYTick} tickTotal={4} />
                                </FlexibleXYPlot>
                            </Plot>
                        );
                    })} 
                </Plots>
            </State>

            <Districts>
                <thead>
                    <District>
                        <DistrictHead>District</DistrictHead>

                        {Object.keys(features).map((x, i) => (
                            <DistrictHead data-content={i < 4 ? null : `dose ${i-3}`} key={i}>
                                {features[x]}
                            </DistrictHead>                        
                        ))}
                    </District>
                </thead>

                <tbody>
                    {Object.keys(daily[state].districts).map((x, i) => (
                        <District key={i}>
                            <DistrictHead>{x}</DistrictHead>

                            {Object.keys(features).map((y, j) => {
                                const district = daily[state].districts[x];

                                return (
                                    <DistrictDefinition key={j}>
                                        <DefinitionValue>{(district.total[y] ?? '-').toLocaleString()}</DefinitionValue>

                                        {j < 4 && district.delta[y] !== undefined &&
                                            <DefinitionDelta>+{district.delta[y].toLocaleString()}</DefinitionDelta>
                                        }
                                    </DistrictDefinition>
                                );
                            })}
                        </District>
                    ))}
                </tbody>
            </Districts>
        </StatesContainer>
    );
};

export default States;