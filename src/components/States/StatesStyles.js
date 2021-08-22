import styled, { css } from 'styled-components';

const animateSequence = (animationName, duration, delay, offset, timingFunc, start, end) => {
    let style = "";
    for (let i = start; i <= end; ++i) {
        style += `
            &:nth-child(${i}) {
                animation: ${animationName} ${duration}ms ${delay + i * offset}ms ${timingFunc} forwards;
            } 
        `;
    }
    
    return css`${style}`;
}

export const StatesContainer = styled.div`
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    color: var(--light);
    background-color: rgb(11 11 14);
    overflow: hidden;

    @media (max-height: 500px) {
        padding-top: 30px;
    }
`;

export const StateViewer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'roboto';
    padding-bottom: 16px;

    @media (max-width: 1350px) {
        width: 50%;
    }

    @media (max-width: 1240px) {
        margin: 0 30px;
    }

    @media (max-width: 1075px) {
        margin-left: 0;
    }

    @media (max-width: 1000px) {
        width: 100%;
    }
`;

export const State = styled.div`
    display: flex;

    @media (max-width: 1075px) {
        transform: scale(0.95);
    }

    @media (max-width: 1000px) {
        transform: scale(1);
        flex-direction: column;
    }
`;

export const StateSelect = styled.select`
    align-self: left;
    margin-bottom: 18px;
    padding: 10px;
    font-size: 0.86rem;
    color: var(--light);
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: rgb(17 17 20);
    grid-column: span 6;
    width: 50%;
    transform: translateX(-150%);
    animation: animate-state-select 500ms 600ms ease-out forwards;

    &:focus {
        background-color: rgb(20 20 23);
    }

    &:hover {
        background-color: rgb(20 20 23);
    }

    @media (max-width: 1240px) {
        width: 100%;
        grid-column: span 4;
    }

    @media (max-width: 1000px) {
        width: 50%;
        grid-column: span 6;
    }

    @media (max-width: 700px) {
        grid-column: span 3;
        width: 100%;
        margin-bottom: 0px;
    }
`;

export const StateOption = styled.option`

`;

export const StateDataContainer = styled.div`
    width: 100%;

    @media (max-width: 700px) {
        width: auto;
    }
`;

export const StateDataList = styled.ul`
    list-style: none;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(6, auto);
    grid-template-rows: repeat(2, auto);
    align-items: flex-start;

    @media (max-width: 1240px) {
        grid-template-columns: repeat(4, auto);
        grid-template-rows: repeat(3, auto);
    }

    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 10%;
    }

    @media (max-width: 865px) {
        width: 100%;
        padding: 0 2.5%;
    }

    @media (max-width: 700px) {
        grid-template-columns: repeat(3, auto);
        grid-template-rows: repeat(3, auto);
        grid-gap: 11px;
        padding: 0;
    }
`;

export const StateData = styled.div`
    opacity: 0;
    transform: scale(0);
    ${animateSequence('animate-state-item', 500, 400, 150, 'ease-in-out', 1, 7)}
`;

export const StateDataItem = styled.li`
    width: 105px;
    height: 80px;    
    padding: 11px 2px 7px 2px;
    background-color: rgb(17 17 20);
    border-radius: 4px;
    transition: 150ms;

    &:hover {
        transform: scale(1.1);
        background-color: rgb(20 20 23);
    }

    @media (max-width: 1420px) {
        width: 90px;
        height: 70px;    
    }

    @media (max-width: 1000px) {
        padding-top: 12px;
        width: 105px;
        height: 80px;    
    }
    
    @media (max-width: 700px) {
        width: 110px;
        height: 82px;    
        padding-top: 14px;
    }

    @media (max-width: 350px) {
        width: 95px;
        height: 74px;    
    }
`;

export const DataItemHeader = styled.h4`
    text-align: center;
    font-size: 0.675rem;
    font-weight: 400;
    margin-bottom: 4px;

    &:after {
        content: attr(data-content);
        color: rgb(195 195 195);
        font-size: 0.55rem;
        margin-left: 2px;
    }

    @media (max-width: 1420px) {
        font-size: 0.645rem;
        margin-bottom: 4px;

        &:after {
            font-size: 0.505rem;
        }
    }
`;

export const DataItemValue = styled.h2`
    margin-top: 3px;
    text-align: center;
    font-size: 1.05rem;
    font-weight: 400;

    @media (max-width: 1420px) {
        font-size: 1rem;
    }
`;

export const DataItemDelta = styled.h4`
    margin-top: 5px;
    font-size: 0.58rem;
    font-weight: 400;
    letter-spacing: 0.03rem;
    text-align: center;

    @media (max-width: 1420px) {
        font-size: 0.565rem;
    }
`;

export const PlotHeading = styled.h3`
    margin-left: 6px;
    font-size: 0.730rem;
    font-weight: 400;
    color: rgb(205 205 205);

    &:after {
        content: attr(data-content);
        font-size: 0.55rem;
        color: rgb(205 205 205);
        margin-left: 2px;
    }

    @media (max-width: 1420px) {
        font-size: 0.735rem;
    }

    @media (max-width: 700px) {
        margin-left: 8px;
        margin-top: 4px;
        font-size: 0.8rem;
    }
`;

export const PlotHeadingType = styled.h4`
    margin-left: 7px;
    font-size: 0.65rem;
    font-weight: 400;
    color: rgb(185 185 185);

    @media (max-width: 1420px) {
        font-size: 0.61rem;
    }

    @media (max-width: 700px) {
        margin-left: 9px;
        font-size: 0.67rem;
    }
`;

export const PlotValue = styled.h3`
    font-size: 0.73rem;
    font-weight: 400;
    text-align: end;

    @media (max-width: 1420px) {
        font-size: 0.7rem;
    }

    @media (max-width: 700px) {
        font-size: 0.82rem;
    }
`;

export const PlotDate = styled.h3`
    font-size: 0.57rem;
    font-weight: 400;
    text-align: end;
    margin-top: 2px;

    @media (max-width: 1420px) {
        font-size: 0.55rem;
    }

    @media (max-width: 700px) {
        font-size: 0.63rem;
    }
`

export const PlotMarker = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: var(--light);
    position: absolute;
    left: -2px;
    bottom: 26px;
    opacity: 0;

    @media (max-width: 1420px) {
        width: 7px;
        height: 7px;
        bottom: 28px;
    }

    @media (max-width: 700px) {
        bottom: 22px;
        width: 8px;
        height: 8px;
    }
`;

export const Plot = styled.div`
    padding: 5px;
    padding-bottom: 18px;
    background-color: rgb(16 16 19);
    border-radius: 5px;
    width: 20vw;
    height: 195px;
    position: relative;
    font-family: 'roboto';
    opacity: 0;
    transform: translateX(50px);

    ${animateSequence('animate-plots', 500, 800, 200, 'ease-out', 1, 6)}

    @media (max-width: 1240px) {
        width: 23.5vw;
    }

    @media (max-width: 1000px) {
        width: 36vw;
    }

    @media (max-width: 700px) {
        width: 75vw;
    }

    @media (max-width: 500px) {
        width: 80vw;
    }

    @media (max-width: 400px) {
        width: 90vw;
    }
`;

export const Plots = styled.div`
    width: 100%;
    padding: 0 23px;
    margin-top: 64px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, auto);
    grid-column-gap: 50px;
    grid-row-gap: 44px;
    justify-content: center;

    @media (max-width: 1280px) {
        grid-column-gap: 35px;
    }

    @media (max-width: 1240px) {
        grid-column-gap: 45px;
    }

    @media (max-width: 1110px) {
        grid-column-gap: 30px;
        grid-row-gap: 50px;
    }

    @media (max-width: 1000px) {
        margin-top: 70px;
        margin-left: 0;
        grid-column-gap: 60px;
        grid-row-gap: 46px;
    }

    @media (max-width: 700px) {
        margin-top: 50px;
        grid-template-columns: repeat(1, auto);
        grid-template-rows: repeat(6, auto);
    }

    @media (max-width: 350px) {
        margin-top: 5px;
    }
`;

export const DefinitionValue = styled.p` 

`;

export const DefinitionDelta = styled.p`
    font-size: 0.65rem;
    margin-top: 1px;

    @media (max-width: 500px) {
        font-size: 0.56rem;

        &:after {
            font-size: 0.5rem;
        }
    }

    @media (max-width: 425px) {
        font-size: 0.47rem;

        &:after {
            font-size: 0.40rem;
        }
    }

    @media (max-width: 350px) {
        font-size: 0.4rem;

        &:after {
            margin-left: 1px;
            font-size: 0.34rem;
        }
    }
`;

export const DistrictDefinition = styled.td`
    font-size: 0.825rem;
    text-align: center;

    @media (max-width: 700px) {
        font-size: 0.75rem;
    }

    @media (max-width: 500px) {
        font-size: 0.68rem;
    }

    @media (max-width: 425px) {
        font-size: 0.55rem;
    }

    @media (max-width: 350px) {
        font-size: 0.47rem;
    }
`;

export const DistrictHead = styled.th`
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    background-color: rgb(19 19 23);
    padding-top: 15px;
    padding-bottom: 21px;
    width: 14.5%;

    &:after {
        position: absolute;
        top: 59%;
        left: 0;
        width: 100%;
        text-align: center;
        content: attr(data-content);
        font-size: 0.66rem;
        margin-left: 3px;
    }

    @media (max-width: 700px) {
        font-size: 0.78rem;
        
        &:after {
            font-size: 0.63rem;
        }
    }

    @media (max-width: 500px) {
        font-size: 0.65rem;
        
        &:after {
            font-size: 0.57rem;
        }
    }

    @media (max-width: 425px) {
        font-size: 0.52rem;
        
        &:after {
            font-size: 0.45rem;
        }
    }

    @media (max-width: 350px) {
        font-size: 0.47rem;
        
        &:after {
            font-size: 0.41rem;
        }
    }
`;

export const District = styled.tr`
    background-color: rgb(15 15 18);
    color: rgb(210 210 210);

    &:hover {
        background-color: rgb(16 16 20);
    }
`;

export const Districts = styled.table`
    width: 92vw;
    margin: 20px;
    margin-top: 75px;
    font-family: roboto;
    align-self: center;
    border-spacing: 0.24rem;

    @media (max-width: 426px) {
        margin-top: 65px;
        border-spacing: 0.19rem;
    }

    @media (max-width: 376px) {
        width: 97vw;
    }
`;