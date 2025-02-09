import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import {
  DashboardNumbers,
  StyledDashboardLayout,
} from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { HiCalendarDays, HiOutlineBanknotes } from "react-icons/hi2";

function Dashboard() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <p>Test</p>
      </Row>
      <StyledDashboardLayout>
        <DashboardNumbers
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
        />
      </StyledDashboardLayout>
    </>
  );
}

export default Dashboard;
