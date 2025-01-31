import { useState } from "react";
import styled from "styled-components";

import Button from "../../ui/Button";
import Row from "../../ui/Row";
import CreateCabinForm from "./CreateCabinForm";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateEditCabin } from "./useCreateEditCabin";

//Style Components :

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

//Component :

function CabinRow({ cabin }) {
  const [show, setShow] = useState(false);

  const { id, image, name, regularPrice, discount, maxCapacity, description } =
    cabin;

  const { isCreating, createCabin } = useCreateEditCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      regularPrice,
      discount,
      description,
      maxCapacity,
    });
  }

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <TableRow role="row ">
        <Img src={image} alt={`Image of Cabin ${cabin.id}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Row type="horizontal">
          <Button
            disabled={isCreating}
            onClick={handleDuplicate}
            variation="secondary"
            size="medium"
          >
            <HiSquare2Stack />
          </Button>
          <Button
            variation="secondary"
            size="medium"
            onClick={() => setShow((show) => !show)}
          >
            <HiPencil />
          </Button>
          <Button
            onClick={() => deleteCabin(id)}
            variation="danger"
            size="medium"
            disabled={isDeleting}
          >
            <HiTrash />
          </Button>
        </Row>
      </TableRow>
      {show && <CreateCabinForm editCabinData={cabin} />}
    </>
  );
}

export default CabinRow;
