import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Filter from "../ui/Filter";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Row type="horizontal">
          {/* <Filter.Cotainer>
              <Filter.Option name="">All</Filter.Option>
              <Filter.Option name="withDiscount">With Discount</Filter.Option>
              <Filter.Option name="noDiscount">No Discount</Filter.Option>
              </Filter.Cotainer> */}
          <Filter
            filterField="discount"
            options={[
              { value: "all", label: "All" },
              { value: "withDiscount", label: "With Discount" },
              { value: "noDiscount", label: "No Discount" },
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
