import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!searchParams.get(filterField)) {
    searchParams.set(filterField, "all");
    setSearchParams(searchParams);
  }

  function handleFilterBy(e) {
    searchParams.set(filterField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          value={option.value}
          key={Math.random()}
          active={option.value === searchParams.get(filterField) ? "true" : ""}
          disabled={option.value === searchParams.get(filterField)}
          onClick={handleFilterBy}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

// export const FilterContext = createContext();

// function Filter({ children }) {
//   const [filterBy, setFilterBy] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   return (
//     <FilterContext.Provider
//       value={{ setFilterBy, filterBy, sortBy, setSortBy }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// }

// function Option({ children, name }) {
//   const { filterBy, setFilterBy } = useContext(FilterContext);
//   return (
//     <FilterButton
//       active={name === filterBy}
//       disabled={name === filterBy}
//       onClick={() => setFilterBy(name)}
//     >
//       {children}
//     </FilterButton>
//   );
// }

// function Cotainer({ children }) {
//   return <StyledFilter>{children}</StyledFilter>;
// }

// Filter.Option = Option;
// Filter.Cotainer = Cotainer;

// export default Filter;
