import styled from 'styled-components';

export const Cursor = styled.div`
    position: fixed;
    right: 100%;
    top: -100%;
    width: ${props => 2 * props.r}vw;
    height: ${props => 2 * props.r}vw;
    border-radius: 100%;
    background-color: var(--light);
    mix-blend-mode: difference;
    transition: 300ms ease-out;
`;

export const PredictorWrapper = styled.div`
    background-color: var(--white);
`;