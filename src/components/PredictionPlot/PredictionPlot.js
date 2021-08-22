import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import { Plot } from './PredictionPlotStyles';

const PredictionPlot = (props) => {
    const id = `plot-${props.type}`;

    useEffect(() => {
        let width = 200;
        let height = 100;
        const act = props.act;
        const pre = [act[act.length - 1], props.pre];
        const margin = { h: 1, v: 13 }; 

        const svg = d3.select('#' + id)
            .append('svg')
            .attr('viewBox', `0 0 ${width + 2 * margin.h} ${height + 2 * margin.v}`)

        const x = d3.scaleTime()
            .domain([act[0][0], props.pre[0]])
            .range([margin.h, margin.h + width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max([...act, props.pre], d => d[1])])
            .range([margin.v + height, margin.v]);

        const p1 = svg.append('g')
            .append('path')

        p1.datum(act)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(225, 225, 225)')
            .attr('stroke-width', 2.5)
            .attr('d', d3.line()
                .x(d => x(d[0]))
                .y(d => y(d[1]))
                .curve(d3.curveBasis))
            .attr('stroke-dasharray', Math.round(p1.node().getTotalLength()))
            .attr('stroke-dashoffset', Math.round(p1.node().getTotalLength()));
            
        const p2 = svg.append('g')
            .append('path')

        p2.datum(pre)
            .attr('fill', 'none')
            .attr('stroke', 'rgb(5, 180, 160)')
            .attr('stroke-width', 2.5)
            .attr('d', d3.line()
                .x(d => x(d[0]))
                .y(d => y(d[1]))
                .curve(d3.curveBasis))
            .attr('stroke-dasharray', Math.round(p2.node().getTotalLength()))
            .attr('stroke-dashoffset', Math.round(p2.node().getTotalLength()));
    }, []);

    return (
        <Plot id={id}>
        </Plot>
    );
};

export default PredictionPlot;