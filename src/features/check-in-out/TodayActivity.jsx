import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

// const StyledRow = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;
//   overflow-y: scroll;

//   &::-webkit-scrollbar {
//     display: none;
//   }
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// `;

function Today({ bookingsToday }) {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      <TodayList>
        {bookingsToday.length ? (
          bookingsToday.map((booking) => (
            <TodayItem key={booking.id} booking={booking} />
          ))
        ) : (
          <NoActivity>No Activity for today</NoActivity>
        )}
      </TodayList>
    </StyledToday>
  );
}

export default Today;
