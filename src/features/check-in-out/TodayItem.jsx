import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import { subtractDates } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ booking }) {
  const {
    status,
    startDate,
    endDate,
    id: bookingId,
    guests: { countryFlag, fullName },
  } = booking;

  const navigate = useNavigate();

  let tag, color, action;
  if (status === "unconfirmed") {
    tag = "arriving";
    color = "green";
    action = "Check In";
  } else if (status === "checked-in") {
    tag = "departing";
    color = "blue";
    action = "Check Out";
  } else {
    tag = "unkown";
    color = "red";
    action = "Unkown";
  }

  function handleNavigate() {
    if (status === "unconfirmed") {
      navigate(`/checkin/${bookingId}`);
    } else {
      navigate(`/checkout/${bookingId}`);
    }
  }

  return (
    <StyledTodayItem>
      <Tag type={color}>{tag}</Tag>
      <Flag src={countryFlag} />
      <Guest>{fullName}</Guest>
      <span>{subtractDates(endDate, startDate)} nights</span>
      <Button size="small" onClick={handleNavigate}>
        {action}
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
