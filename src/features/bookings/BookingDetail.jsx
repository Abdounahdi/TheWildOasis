import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingId } from "./useBookings";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { id: bookingId } = useParams();
  const { isLoading, booking } = useBookingId(bookingId);
  const navigate = useNavigate();

  const { isDeleting, deleteBooking } = useDeleteBooking();
  const status = booking?.status;
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckInOut() {
    if (status === "unconfirmed") {
      navigate(`/checkin/${bookingId}`);
    }else if(status === "checked-out"){
      console.log("check out")
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button variation="danger">Delete Booking #{bookingId}</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId);
                if (!isDeleting) {
                  moveBack();
                }
              }}
            />
          </Modal.Window>
        </Modal>
        {status !== "checked-out" ? (
          <Button variation="primary" onClick={handleCheckInOut}>
            Check {status === "checked-in" ? "Out" : "In"}
          </Button>
        ) : null}
        {/* <Button variation="secondary" onClick={moveBack}>
          Back
        </Button> */}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
