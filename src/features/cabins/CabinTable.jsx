import { useContext } from "react";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { FilterContext } from "../../ui/Filter";

import { useCabins } from "./useCabins";

function CabinTable() {
  let { isLoading, cabins } = useCabins();
  const { filterBy } = useContext(FilterContext);

  if (filterBy === "withDiscount") {
    cabins = cabins.filter((cabin) => cabin.discount);
  } else if (filterBy === "noDiscount") {
    cabins = cabins.filter((cabin) => !cabin.discount);
  }

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2.2fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
