import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Filter from "../ui/Filter";
import SortBy from "../ui/Select";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Row type="horizontal">
          <Filter
            filterField="discount"
            options={[
              { value: "all", label: "All" },
              { value: "withDiscount", label: "With Discount" },
              { value: "noDiscount", label: "No Discount" },
            ]}
          />
          <SortBy
            options={[
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
              { value: "regularPrice-asc", label: "Sort by price (low first)" },
              {
                value: "regularPrice-desc",
                label: "Sort by price (high first)",
              },
              {
                value: "maxCapacity-asc",
                label: "Sort by capacity (low first)",
              },
              {
                value: "maxCapacity-desc",
                label: "Sort by capacity (high first)",
              },
            ]}
          />
        </Row>
      </Row>

      <Row>
        <CabinTable />
        <div>
          <AddCabin />
        </div>
      </Row>
    </>
  );
}

export default Cabins;
