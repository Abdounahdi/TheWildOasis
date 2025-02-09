import styled from "styled-components";
import Stat from "./Stat";
import { useBookingsAfterDate } from "../bookings/useBookings";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default StyledDashboardLayout;
