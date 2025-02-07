import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import Textarea from "../../ui/Textarea";
import BookingDataBox from "../bookings/BookingDataBox";

import { useBookingId } from "../bookings/useBookings";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import { useUpdateBooking } from "../bookings/useUpdateBooking";
import { useState } from "react";
import ButtonGroup from "../../ui/ButtonGroup";
import toast from "react-hot-toast";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const P = styled.p`
  font-weight: 500;
  color: var(--color-grey-600);
`;

function CheckOutBooking() {
  const { id: bookingId } = useParams();
  const moveback = useMoveBack();
  const { isLoading, booking } = useBookingId(bookingId);
  const { isUpdating, updateBooking } = useUpdateBooking();
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  function handleCheckOut() {
    const { guests, cabins, ...newObj } = booking;
    updateBooking({
      obj: {
        ...newObj,
        status: "checked-out",
        feedback,
      },
      id: bookingId,
    });
    navigate("/bookings");
  }

  if (isLoading) return <Spinner />;

  // just to be sure i added this level of security :
  if (booking.status !== "checked-in") {
    // toast.error(`Booking #${booking.id} is Already checked in ! `);
    navigate("/bookings");
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check out booking #{bookingId}</Heading>
        <ButtonText onClick={moveback}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <Box>
        <Row>
          <P>
            Thanks for choosing our Hotel {booking?.guests.fullName}! We would
            be happy to hear your Feedback :{" "}
          </P>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Row>
      </Box>
      <ButtonGroup>
        <Button varitation="primary" onClick={handleCheckOut}>
          {isUpdating ? "Cheking out ... " : "Check Out"}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckOutBooking;
