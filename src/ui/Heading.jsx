import styled from "styled-components";
import {css} from "styled-components";


const Heading = styled.h1`
    line-height:1.4;

    ${prop => prop.as === 'h1-center' && css`
        font-size:3rem;
        font-weight:700;
        text-align:center;
        
    `}

    ${prop => prop.as === "h1" && css`

        font-size: 3rem;
        font-weight: 600;
    
    `}

    ${prop => prop.as === "h2" && css`
        font-size:2rem;
        font-weight:600;
    `}

    ${prop => prop.as === "h3" && css`
    
        font-size:2rem;
        font-weight:500

    `}

    ${prop => prop.as === 'h4' && css`
    
        font-size:1.4rem;
        font-weight:400;
        
    
    `}

    ${prop => prop.as === 'h5' && css`
        
        font-size:1rem;
        font-weight:300;

    `}

    ${prop => prop.as === "h6" && css`
        
        font-size:0.8rem;
        font-weight:200rem;

    `}
`

Heading.defaultProps = {
    as: 'h1'
}

export default Heading