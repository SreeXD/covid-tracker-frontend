import styled, { css, keyframes } from 'styled-components';

const LoadingFadeIn = keyframes`
    to {
        opacity: 1;
    }
`;

const LoadingAnimation = keyframes`
    to {
        transform: rotateZ(360deg);
    }
`;

export const LoadingContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: var(--dark);
    z-index: 2; 

    &.loading-exit {
        opacity: 1;
    }

    &.loading-exit-active {
        opacity: 0;
        transition: 300ms;
    }
`;

export const LoadingAnim = styled.div`
    background-color: rgb(22 22 25);
    background-color: var(--dark);
    position: absolute;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 150px;
    height: 150px;
    animation: ${LoadingAnimation} 1000ms infinite linear;

    &:after {
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        width: 50%;
        height: 100%;
        background-color: rgb(220 220 220);
        opacity: 0;
        animation: ${LoadingFadeIn} 1000ms forwards;
    } 

    &:before {
        content: '';
        position: absolute;
        background-color: var(--dark);
        border-radius: 100%;
        width: 95%;
        height: 95%;
        z-index: 2;
    }

    @media (max-width: 768px) {
        width: 125px;
        height: 125px;

        &:before {
            width: 95%;
            height: 95%;
        }
    }
`;