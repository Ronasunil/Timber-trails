import styled from "styled-components";

const StyledVerticalDiv = styled.div`
    display:flex;
    flex-direction:column;
    gap:0.5rem;
`

const Label = styled.label`
    font-weight:500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


 function FormRowVertical({children, label, error}) {
    return <StyledVerticalDiv>
                {label && <Label>{label}</Label>}
                {children}
                {error && <Error>{error}</Error>}
            </StyledVerticalDiv>
}

export default FormRowVertical;