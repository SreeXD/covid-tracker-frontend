import { NavLink as NLink } from 'react-router-dom';
import styled, { css, keyframes } from "styled-components";

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

const AnimateIcon = keyframes` 
    to {
        opacity: 1;
        transform: translateY(-8px);
    }
`;

export const NavLink = styled(NLink)`
    display: block;
    text-decoration: none;
    font-family: 'roboto';
    font-weight: 500;
    letter-spacing: 0.035rem;
    font-size: 0.715rem;
    color: var(--grey-2);
    transition: transform 300ms;

    &:hover {
        color: var(--grey);
    }

    &.active {
        color: var(--light);
        cursor: default;
    }

    @media (min-width: 769px) {
        &:not(.active):hover {
            transform: translateY(-5px);
            padding-bottom: 5px;
        }
    }   
 
    @media (max-width: 768px) {
        font-weight: 400;
        font-size: 2.8rem;
        color: var(--light);
        transition: transform 300ms, font-size 300ms;
    
        &:not(.active) {
            color: var(--grey-2);
            font-size: 1.75rem;
        }
    }

    @media (max-width: 500px) {
        font-size: 2.05rem;

        &:not(.active) {
            font-size: 1.35rem;
        }
    }

    @media (max-width: 320px) {
        font-size: 1.75rem;

        &:not(.active) {
            font-size: 1.15rem;
        }
    }
`;

export const NavItem = styled.li`
    margin: 0.9rem 1.6rem;
    text-align: center;
    transition: 300ms, order 0ms;
    
    @media (max-width: 768px) {
        ${ props => props.theme.toggled && css`
            ${NavLink}:not(.active) {
                &:hover {
                    color: var(--grey);
                    transform: translateX(12px);
                }
            }
        `}
    }

    @media (max-width: 768px) {
        opacity: 0;
        margin: 1.75rem;
        margin-left: 3.8rem;
        transform: translateY(30px);

        &:nth-child(1) {
            transition: 300ms 100ms;
        }

        &:nth-child(2) {
            transition: 300ms 200ms;
        }
    }

    @media (max-width: 500px) {
        margin-left: 2.75rem;
    }
    
    @media (max-width: 320px) {
        margin-left: 2rem;
    }
`;

export const NavTogglerBar = styled.span`
    display: block;
    width: 60%;
    height: 8%;
    margin: 2px 0;
    background-color: var(--light);
    border-radius: 20px;
    transition: transform 400ms 100ms;
`;

export const NavToggler = styled.button`
    border: none;
    outline: none;
    position: fixed;
    top: -30px;
    right: 30px;
    height: 40px;
    width: 40px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: top 300ms;
    background: none;
    cursor: pointer;
    z-index: 3;
    transition: right 300ms;

    @media (max-width: 768px) {
        top: 18px;
    }

    @media (max-width: 500px) {
        top: 16px;
        right: 30px;

        ${props => props.theme.toggled && css`
            right: 20px;
        `}
    }

    ${props => props.theme.toggled && css`
        & ${NavTogglerBar}:nth-child(1) {
            transform: translateY(3px) rotate(45deg);
        }
       
        & ${NavTogglerBar}:nth-child(2) {
            transform: translateY(-4px) rotate(-45deg);
        }

        &:hover ${NavTogglerBar} {
            background-color: var(--grey);
        }
    `}
`;

export const NavList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: auto;
    margin-top: 14px;

    @media (max-width: 768px) {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0;
        left: 100%;
        height: 100vh;
        width: 100vw;
        transition: 500ms 500ms ease-in-out;
        background-color: var(--dark);
        border-top-left-radius: 100%;
        border-bottom-left-radius: 100%;

        & ${NavItem}:nth-child(2) {
            order: 1;
        }

        & ${NavItem}:nth-child(1) {
            order: 2;
        }

        & ${NavItem}:nth-child(3) {
            order: 3;
        }

        ${props => props.theme.toggled && css`
            left: 0%;
            border-top-left-radius: 0%;
            border-bottom-left-radius: 0%;
            transition: 500ms ease-in-out;

            & ${NavItem}:nth-child(2) {
                opacity: 1;
                transform: translateY(0);
                transition: 300ms 500ms ease-out, order 0ms;
            }

            & ${NavItem}:nth-child(1) {
                opacity: 1;
                transform: translateY(0);
                transition: 300ms 650ms ease-out, order 0ms;
            }

            & ${NavItem}:nth-child(3) {
                opacity: 1;
                transform: translateY(0);
                transition: 300ms 800ms ease-out, order 0ms;
            }
        `}
    }
`;

export const NavSocialLink = styled.a`
    cursor: pointer;
`;

export const NavSocialItem = styled.li` 
    margin: 25px 14px;
    transform: translateY(-50px);

    ${animateSequence('animate-nav', 300, 0, 100, 'ease-out', 3)}

    svg {
        width: 22px;
        height: 22px;
        fill: var(--grey);
        transition: transform 200ms;

        &:hover {
            transform: translateY(-5px);
            fill: var(--light);
        }

        @media (max-width: 768px) {
            ${props => props.theme.toggled && css`
                &:hover {
                    transform: none;
                }
            `}
        }
    }
   
    &:before {
        position: absolute;
        content: " ";
        left: 50%;
        top: 50%;
        height: 0;
        width: 0;
        border-radius: 100%;
        background-color: var(--light);
        transition: 250ms;
        z-index: -1;
    }
  
    @media (max-width: 768px) {
        ${ props => props.theme.toggled && css`
            margin: 11px 14px;

            svg {
                transition: 250ms;
            }

            &:hover {
                &:before {
                    top: -4px;
                    left: -5px;
                    height: 31px;
                    width: 31px;
                    transform: scale(1.15);
                    background-color: var(--light);
                }

                svg {
                    fill: var(--dark);
                }
            }
        `}
    }

    @media (max-width: 500px) {
        margin-left: 5px;

        ${props => props.theme.toggled && css`
            margin-right: 8px;
        `}
    }

    @media (max-width: 350px) {
        margin-left: 4px;
        margin-right: 12px;
    }
`;

export const NavSocial = styled.ul`
    list-style: none;
    padding: 0;
    margin-left: 20px;
    margin-right: 26px;
    position: absolute;
    display: flex;

    @media (max-width: 768px) {
        ${ props => props.theme.toggled && css`
            flex-direction: column;
            margin-bottom: 15px;
            margin-left: 0;
            position: fixed;

            svg {
                fill: var(--light);
            }

            & ${NavSocialItem}:nth-child(1) {
                opacity: 0;
                transform: translateY(28px);
                animation: ${AnimateIcon} 500ms 500ms forwards;
            }
            
            & ${NavSocialItem}:nth-child(2) {
                opacity: 0;
                transform: translateY(28px);
                animation: ${AnimateIcon} 500ms 535ms forwards;
            } 
            
            & ${NavSocialItem}:nth-child(3) {
                opacity: 0;
                transform: translateY(28px);
                animation: ${AnimateIcon} 500ms 570ms forwards;
            }
        `}
    }
`

export const Nav = styled.nav`
    position: absolute;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    transition: height 0ms 800ms;

    @media (max-width: 768px) {
        ${ props => props.theme.toggled && css`
            height: 100vh;
            justify-content: flex-end;
            align-items: flex-end;
            transition: none;
        `}
    }

    overflow: hidden;
    mix-blend-mode: difference;
    z-index: 3;
`