import styled, { keyframes, css } from 'styled-components';

const animateSequence = (animationName, duration, delay, offset, timingFunc, n) => {
    let style = '';
    for (let i = 1; i <= n; ++i) {
        style += `
            &:nth-child(${i}) {
                animation: ${animationName} ${duration}ms ${delay + i * offset}ms ${timingFunc} forwards;
            } 
        `;
    }

    return css`${style}`;
}

export const DisplayContainer = styled.div`
    background-color: rgb(11 11 14);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 75vh;
    overflow: hidden;
    margin-bottom: -1px;

    @media (max-width: 1280px) and (max-height: 750px) {
        height: 85vh;
    }

    @media (max-width: 700px) and (max-height: 750px) {
        height: 94vh;
        padding-top: 30px;
    }

    @media (max-width: 500px) and (max-height: 750px) {
        height: 90vh;
        padding-top: 30px;
    }

    @media (max-height: 500px) {
        height: 100vh;
    }

    @media (max-height: 400px) {
        height: 120vh;
    }
`;

export const DisplayGrid = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 20px;
    color: var(--light);
    font-family: 'roboto';
    padding-left: 0;
    margin: auto;

    @media (max-width: 1280px) {
        grid-gap: 25px;
        grid-template-columns: repeat(3, auto);
        grid-template-rows: repeat(2, auto);
    }

    @media (max-width: 700px) {
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(3, auto);
        grid-column-gap: 55px;
        grid-row-gap: 45px;
    }

    @media (max-width: 500px) {
        grid-gap: 5px;
        grid-row-gap: 24px;
    }

    @media (max-width: 350px) {
        grid-column-gap: 8px;
        grid-row-gap: 48px;
    }
`;

export const DisplayItem = styled.li`
    padding: 33px;
    opacity: 0;
    transform: translateY(25px);

    ${animateSequence('animate-display', 400, 300, 100, 'ease-in-out', 6)}

    &:hover {
        background-color: rgba(19, 19, 22, 0.8);
        transition: 300ms;
    }

    @media (max-width: 1280px) {
        padding: 30px;
    }

    @media (max-width: 700px) {
        padding: 18px;
    }

    @media (max-width: 350px) {
        padding: 12px;
    }
`;

export const ItemHeader = styled.h3`
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 7px;

    &:after {
        content: attr(data-content);
        font-size: 0.65rem;
        margin-left: 4px;
    }

    @media (max-width: 1280px) {
        font-size: 0.825rem;
        margin-bottom: 6px;
    }

    @media (max-width: 700px) {
        font-size: 0.8rem;
        margin-bottom: 5px;
    }

    @media (max-width: 350px) {
        margin-bottom: 3px;
        font-size: 0.75rem;
    }
`;

export const ItemData = styled.h1`
    font-size: 1.55rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    color: rgb(227 227 227);

    @media (max-width: 1280px) {
        font-size: 1.5rem;
    }

    @media (max-width: 700px) {
        font-size: 1.4rem;
    }

    @media (max-width: 350px) {
        font-size: 1.2rem;
    }
`;

export const ItemDelta = styled.h3`
    font-weight: 500;
    font-size: 0.85rem;
    letter-spacing: 0.04rem;
    text-align: center;
    margin-top: 6px;
    color: var(--grey-3);

    @media (max-width: 1280px) {
        font-size: 0.75rem;
        margin-top: 5px;
    }

    @media (max-width: 700px) {
        font-size: 0.71rem;
        margin-top: 5px;
    }

    @media (max-width: 350px) {
        font-size: 0.62rem;
        margin-top: 5px;
    }
`;

const AnimateDate = keyframes`
    to {
        transform: translateY(0);
    }
`;

export const DisplayDate = styled.h2`
    font: 500 13px roboto;
    color: var(--light);
    text-align: center;
    position: relative;
    margin-left: auto;
    top: 24px;
    right: 24px;
    transform: translateY(-42px);
    animation: ${AnimateDate} 300ms 300ms forwards ease-out;

    @media (max-width: 768px) {
        font-size: 13px;
        text-align: center;
        width: 100%;
        top: 26px;
        right: 6px;
    }

    @media (max-width: 700px) {
        top: -4px;
        left: 4px;
    }

    @media (max-width: 380px) {
        font-size: 12px;
        top: 74px;
        left: 2px;
        transform: translateY(-20px);
    }
`;