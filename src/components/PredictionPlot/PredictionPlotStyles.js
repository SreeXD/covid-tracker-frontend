import styled, { keyframes } from 'styled-components';

const AnimatePlot = keyframes`
    to {
        stroke-dashoffset: 0;
    }
`;

export const Plot = styled.div`
    margin-right: auto;
    mix-blend-mode: difference;

    g {
        path {
            animation: ${AnimatePlot} 4500ms 5000ms forwards;
        }

        &:nth-of-type(2) {
            path {
                animation: ${AnimatePlot} 1000ms 9200ms ease-out forwards;
            }
        }
    }

    @media (max-width: 768px) {
        path {
            stroke-width: 3.5px;
        }
    }

    @media (max-width: 400px) {
        path {
            stroke-width: 4.5px;
        }
    }
`;