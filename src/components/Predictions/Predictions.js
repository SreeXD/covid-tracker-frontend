import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import PredictorContext from '../../contexts/PredictorContext';
import { PredictionsContainer, BgCircle, IntroContainer, PredictionIntro, DateContainer, AnimContainer, AnimBarContainer, AnimBar, AnimBar1, AnimBar2, PredictionDate, PredictionHeader, PredictionValue, PredictionItem, PredictionItems } from './PredictionsStyles';
import PredictionPlot from '../PredictionPlot/PredictionPlot';

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Predictions = () => {
    const context = useContext(PredictorContext);
    const outputs = context.outputs;
    const timeseries = context.timeseries;
    const prediction = context.prediction[0];

    const date = new Date(prediction.date);
    const sdate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    return (
        <PredictionsContainer>
            <BgCircle />

            <IntroContainer>
                <PredictionIntro>
                    Prediction for 
                </PredictionIntro>
                <AnimBar black={true}/>
            </IntroContainer>

            <DateContainer>
                <AnimBarContainer>
                    <PredictionDate>
                        {sdate} 
                    </PredictionDate>

                    <AnimBar black={false}/>
                </AnimBarContainer>
            </DateContainer>

            <PredictionItems>
                {Object.keys(outputs).map((x, i) => (
                    <AnimContainer key={i}>
                        <PredictionItem>
                            <div>
                                <AnimBar1/>
                                <PredictionHeader>
                                    {outputs[x]}
                                </PredictionHeader>
                            </div>

                            <div>
                                <AnimBar2 />
                                <PredictionValue>
                                    {Math.round(prediction[x]).toLocaleString()}
                                </PredictionValue>
                            </div>
                        </PredictionItem>

                        <PredictionPlot 
                            type={x} 
                            pre={ [date, Math.round(prediction[x])] } 
                            act={Object.keys(timeseries.TT.dates).slice(-29).map(d => [new Date(d), timeseries.TT.dates[d].delta[x]])} />
                    </AnimContainer>
                ))}
            </PredictionItems>
        </PredictionsContainer>
    );
};

export default Predictions;