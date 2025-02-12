import Stat from "./Stat";

import { formatCurrency } from "../../utils/helpers";

function DashboardStats({ options, bookings, cabins }) {
  // the logic behind getting those values (in terms of coding this is not good ) ;

  const values = [];

  values[0] = bookings.length;
  values[1] = formatCurrency(
    bookings
      .map((booking) => Number(booking.totalPrice))
      .reduce((acc, cur) => acc + cur, 0)
  );
  values[2] = bookings.filter(
    (bookings) => bookings.status === "checked-in"
  ).length;
  values[3] = `${((values[2] / cabins.length) * 100).toFixed(2 , 0)}%`;

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

export default DashboardStats;
