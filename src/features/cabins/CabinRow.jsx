import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateEditCabin } from "./useCreateEditCabin";

//Style Components :

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2.2fr 2.2fr 1fr 1fr 1fr;
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
  const {
    id: cabinId,
    image,
    name,
    regularPrice,
    discount,
    maxCapacity,
    description,
  } = cabin;

  const { createCabin } = useCreateEditCabin();

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
    <TableRow role="row ">
      <Img src={image} alt={`Image of Cabin ${cabinId}`} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm editCabinData={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="Cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </TableRow>
  );
  // return (
  //   <TableRow role="row ">
  //     <Img src={image} alt={`Image of Cabin ${cabinId}`} />
  //     <Cabin>{name}</Cabin>
  //     <div>Fits up to {maxCapacity} guests</div>
  //     <Price>{formatCurrency(regularPrice)}</Price>
  //     {discount ? (
  //       <Discount>{formatCurrency(discount)}</Discount>
  //     ) : (
  //       <span>&mdash;</span>
  //     )}

  //     {/* buttons */}

  //     <Row type="horizontal">
  //       <Modal>
  //         <Button
  //           disabled={isCreating}
  //           onClick={handleDuplicate}
  //           variation="secondary"
  //           size="medium"
  //         >
  //           <HiSquare2Stack />
  //         </Button>

  //         <Modal.Open opens="edit">
  //           <Button variation="secondary" size="medium">
  //             <HiPencil />
  //           </Button>
  //         </Modal.Open>
  //         <Modal.Window name="edit">
  //           <CreateCabinForm editCabinData={cabin} />
  //         </Modal.Window>

  //         <Modal.Open opens="delete">
  //           <Button variation="danger" size="medium" disabled={isDeleting}>
  //             <HiTrash />
  //           </Button>
  //         </Modal.Open>
  //         <Modal.Window name="delete">
  //           <ConfirmDelete
  //             resourceName="Cabin"
  //             disabled={isDeleting}
  //             onConfirm={() => deleteCabin(cabinId)}
  //           />
  //         </Modal.Window>
  //       </Modal>

  //       <Menus.Menu>
  //         <Menus.Toggle id={cabinId} />
  //         <Menus.List id={cabinId}>
  //           <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
  //             Duplicate
  //           </Menus.Button>

  //           <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

  //           <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
  //         </Menus.List>
  //       </Menus.Menu>
  //     </Row>
  //   </TableRow>
  // );
}

export default CabinRow;
