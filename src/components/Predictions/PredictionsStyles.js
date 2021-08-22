import styled, { keyframes } from 'styled-components';

const AnimateContainerIn = keyframes`
    to {
        transform: translateX(105%);
    }
`;

const AnimateAnimBarOpen = (x) => keyframes`
    to {
        width: ${x}%;
    }
`;

const AnimateAnimBarClose = keyframes`
    to {
        width: 0%;
    }
`;

const AnimateDate = keyframes`
    to {
        transform: translateY(0);
    }
`;

const AnimateAnimBarsOpen = keyframes`
    to {
        transform: scaleY(1);
    }
`;

const AnimateAnimBarsClose = keyframes`
    to {
        transform: scaleY(0);
    }
`;

const AnimateText = keyframes`
    to {
        transform: translateX(0);
    }
`;

const AnimateBgCircle = keyframes`
    to {
        transform: scale(0);
    }
`;

export const BgCircle = styled.div`
    position: fixed;
    height: 3px;
    width: 3px;
    left: -1.5px;
    top: -1.5px;
    background-color: var(--dark);
    border-radius: 100%;
    transform: scale(1000);
    animation: ${AnimateBgCircle} 500ms 200ms ease-out forwards;
`;

export const AnimBarContainer = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const AnimBar = styled.div`
    content: '';
    left: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: ${props => props.black ? 'rgb(235, 235, 235)' : 'var(--dark)'};
    z-index: 1;
    align-self: center;
`;

export const PredictionIntro = styled.h1`
    font: 300 calc(0.9rem + 2.25vw) roboto;
    color: rgb(215, 215, 215);
    transform: translateY(100%);
    animation: ${AnimateDate} 400ms 1150ms ease-out forwards;
    padding-left: 5px;

    @media (max-width: 500px) {
        padding-left: 0;
    }
`;

export const IntroContainer = styled.div`
    width: 25vw;
    transform: translateY(10px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    mix-blend-mode: difference;

    & ${AnimBar} {
        animation: ${AnimateAnimBarOpen(120)} 350ms 800ms ease-out forwards, ${AnimateAnimBarClose} 400ms 2800ms ease-out forwards;
    }

    @media (max-width: 1200px) {
        width: 35vw;
    }

    @media (max-width: 400px) {
        width: 45vw;
    }
`;

export const PredictionDate = styled.h1`
    position: relative;
    font: 500 calc(0.55rem + 9.2vw) roboto;
    color: rgb(225, 225, 225);
    transform: translateY(100%);
    mix-blend-mode: difference;
`;

export const DateContainer = styled.div`
    position: relative;
    width: 75vw;
    padding-top: 10px;
    padding-bottom: 40px;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        background-color: var(--dark);
        top: 1%;
        left: 0;
        height: 85%;
        width: 100%;
        transform: translateX(-105%);
        animation: ${AnimateContainerIn} 850ms 1800ms forwards ease-in-out;

        @media (max-width: 1200px) {
            top: 1.5%;
            height: 75%;
        }

        @media (max-width: 768px) {
            top: 2.5%;
            height: 70%;
        }

        @media (max-width: 500px) {
            top: 5%;
            height: 60%;
        }
    }

    & ${AnimBar} {
        animation: ${AnimateAnimBarOpen(100)} 500ms 1000ms ease-out forwards, ${AnimateAnimBarClose} 400ms 2700ms ease-out forwards;
    }

    & ${PredictionDate} {
        animation: ${AnimateDate} 500ms 1350ms ease-out forwards;
    }
`;

export const PredictionHeader = styled.h3`
    font-size: calc(0.55rem + 1.2vw);
    font-weight: 300;
    color: rgb(225, 225, 225);
    mix-blend-mode: difference;
    transform: translateX(-120%);
    animation: ${AnimateText} 500ms 3600ms ease-out forwards;
`;

export const PredictionValue = styled.h1`
    font-size: calc(0.7rem + 3.2vw);
    font-weight: 400;
    color: rgb(225, 225, 225);
    mix-blend-mode: difference;
    transform: translateX(120%);
    animation: ${AnimateText} 500ms 4600ms ease-out forwards;
`;

export const PredictionItem = styled.div`
    border-radius: 8px;
    padding: 5px 0px;
    margin-top: 5px;
    position: relative;
`;

export const AnimBar1 = styled.div`
    position: absolute;
    background: rgb(25, 25, 25);
    height: calc(0.55rem + 1.3vw);
    margin-top: 2px;
    margin-left: -3px;
    width: 0.12rem;
    left: 0;
    transform: scaleY(0);
    animation: ${AnimateAnimBarsOpen} 400ms 3200ms forwards, ${AnimateAnimBarsClose} 500ms 4100ms forwards;
`;

export const AnimBar2 = styled.div`
    position: absolute;
    margin-top: 5px;
    margin-right: -3px;
    background: rgb(25, 25, 25);
    height: calc(0.9rem + 3.5vw);
    width: 0.12rem;
    right: 0px;
    transform: scaleY(0);
    animation: ${AnimateAnimBarsOpen} 400ms 4300ms forwards, ${AnimateAnimBarsClose} 400ms 5200ms forwards;
`;

export const AnimContainer = styled.div`
    position: relative;
    margin-right: auto;
    overflow: hidden;
    padding: 3px;
    width: 17vw;

    &:nth-child(3) ${PredictionItem} {
        &:before {
            left: calc(52% - 1vw);
        }
    }

    @media (max-width: 500px) {
        width: 20vw;
    }

    @media (max-width: 350px) {
        width: 23vw;
    }
`;

export const PredictionItems = styled.div`
    display: flex;
    width: 90vw;
    margin-top: 3px;
    padding-left: 0.4vw;
`;

export const PredictionsContainer = styled.div`
    padding-left: 10vw;
    padding-top: 110px;
    height: 100vh;
    font-family: roboto;
    overflow: hidden;
`;