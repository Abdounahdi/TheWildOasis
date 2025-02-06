import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useBookingsLength } from "../features/bookings/useBookings";

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
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
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

function Pagination({ length }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;

  const finalPage = Math.round(length / Number(perPage));

  const start =
    (Number(page) - 1) * Number(perPage) === 0
      ? 1
      : (Number(page) - 1) * Number(perPage);
  const end =
    start + Number(perPage) >= length ? length : start + Number(perPage);

  function handleNext() {
    if (Number(page) !== finalPage) {
      searchParams.set("page", Number(page) + 1);
      setSearchParams(searchParams);
    }
  }

  function handlePrev() {
    if (Number(page) !== 1) {
      searchParams.set("page", Number(page) - 1);
      setSearchParams(searchParams);
    }
  }

  return (
    <StyledPagination>
      <P>
        Showing {start} to {end} from {length} Results
      </P>
      <Buttons>
        <PaginationButton disabled={Number(page) === 1} onClick={handlePrev}>
          <HiChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={handleNext}
          disabled={Number(end) === length}
        >
          Next <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
