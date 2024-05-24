import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"
import {css} from "styled-components";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";


const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => props.active && css`var(--color-brand-50)`};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;



function Pagination({size}) {

  const [searchParams, setSearchParams] = useSearchParams();

  const maxPage = Math.ceil(size / PAGE_SIZE) ;
  const currentPage = Number.parseInt(searchParams.get('page')) || 1;

  const handleNext = function() {
    const nextPage = currentPage === maxPage ? currentPage : currentPage + 1; 

    searchParams.set('page', nextPage);
    setSearchParams(searchParams);
  }

  const handlePrev = function() {
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prevPage)
    setSearchParams(searchParams)
  }

  return <StyledPagination>
            <P>
              Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span>{size <= currentPage * PAGE_SIZE ? size  : currentPage * PAGE_SIZE}</span> of <span>{size }</span> results
            </P>
            <Buttons>
              <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
                <HiChevronLeft/>
                Prev
              </PaginationButton>
              <PaginationButton onClick={handleNext} disabled={currentPage === maxPage}>
                Next
                <HiChevronRight/>
              </PaginationButton>
            </Buttons>
        </StyledPagination>
}


export default Pagination