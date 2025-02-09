import styled from "styled-components";
import Stat from "./Stat";
import { useBookings } from "../bookings/useBookings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardNumbers({ options }) {

  // the logic behind getting those values (in terms of coding this is not good ) ;

  const values = [];

  const { isLoading: isGettingBookingsNum, data } = useBookings();
  values[0] = data?.count;

  

  return (
    <>
      {options.map((option, i) => (
        <Stat
          key={option.title}
          icon={option.icon}
          color={option.color}
          value={values[i]}
          title={option.title}
        />
      ))}
    </>
  );
}

export { DashboardNumbers, StyledDashboardLayout };
