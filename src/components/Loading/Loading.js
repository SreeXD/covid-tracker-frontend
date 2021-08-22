import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingContainer, LoadingAnim } from './LoadingStyles';

const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingAnim />
        </LoadingContainer>
    );
}

export default Loading;