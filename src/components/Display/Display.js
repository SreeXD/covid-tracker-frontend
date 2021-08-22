import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import TrackerContext from '../../contexts/TrackerContext';
import { DisplayContainer, DisplayGrid, DisplayItem, DisplayDate, ItemHeader, ItemData, ItemDelta } from './DisplayStyles';

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const Display = () => {
    const context = useContext(TrackerContext);
    const daily = context.daily;
    const nationData = daily.TT;
    const features = context.features;
    const date = new Date(nationData?.meta?.date);

    return (
        <DisplayContainer>
            {nationData &&
                <DisplayDate>
                    {`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
                </DisplayDate>
            }

            <DisplayGrid>
                {Object.keys(features).map((x, i) => {
                    const delta = nationData.delta[x];

                    return (
                        <DisplayItem key={i}>
                            <ItemHeader data-content={ i < 4 ? "" : `dose ${i-3}` }>{features[x]}</ItemHeader>
                            <ItemData>{nationData.total[x].toLocaleString()}</ItemData>

                            {i < 4 && delta !== undefined &&
                                <ItemDelta>+{delta.toLocaleString()}</ItemDelta>
                            }
                        </DisplayItem>
                    );
                })}
            </DisplayGrid>
        </DisplayContainer>
    );
};

export default Display;