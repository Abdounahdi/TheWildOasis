import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!searchParams.get("sortBy")) {
    searchParams.set("sortBy", options[0].value);
    setSearchParams(searchParams);
  }

  function handleSortBy(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      type="white"
      onChange={handleSortBy}
      value={searchParams.get("sortBy")}
    >
      {options.map((option) => (
        <option value={option.value} key={Math.random()}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
