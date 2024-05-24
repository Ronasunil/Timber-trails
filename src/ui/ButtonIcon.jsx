import styled from "styled-components";

const ButtonIcon = styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  background: none;
  border: none;
  gap:7px;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
