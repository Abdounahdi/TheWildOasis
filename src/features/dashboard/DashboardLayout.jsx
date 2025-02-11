import styled from "styled-components";
import DashboardStats from "./DashboardStats";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiCalendarDays, HiOutlineBanknotes } from "react-icons/hi2";
import Today from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import {
  useBookingsAfterDate,
  useBookingsToday,
} from "../bookings/useBookings";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useBookingsAfterDate();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isLoadingTodayActivity, bookingsToday } =
    useBookingsToday();
  const isLoading =
    isLoadingBookings || isLoadingCabins || isLoadingTodayActivity;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <DashboardStats
        options={[
          {
            value: "bookings/length",
            title: "Bookings",
            icon: <HiOutlineBriefcase />,
            color: "blue",
          },
          {
            value: "bookings",
            title: "Sales",
            icon: <HiOutlineBanknotes />,
            color: "green",
          },
          {
            value: "bookings",
            title: "Check ins",
            icon: <HiCalendarDays />,
            color: "purple",
          },
          {
            value: "bookings",
            title: "occupancy rate",
            icon: <HiOutlineChartBar />,
            color: "yellow",
          },
        ]}
        bookings={bookings}
        cabins={cabins}
      />
      <Today bookingsToday={bookingsToday} />
      <DurationChart
        confirmedStays={bookings.filter(
          (booking) =>
            booking.status === "checked-in" || booking.status === "checked-out"
        )}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
