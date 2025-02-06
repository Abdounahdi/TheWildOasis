import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingId } from "../bookings/useBookings";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useSettings } from "../settings/useSettings";
import { useUpdateBooking } from "../bookings/useUpdateBooking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const FocusedInfo = styled.span`
  color: var(--color-brand-500);
  font-weight: 500;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { id } = useParams();
  const { isLoading: isLoadingBooking, booking } = useBookingId(Number(id));
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const [addBreakfast, setAddbreakfast] = useState(null);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      setAddbreakfast(booking?.hasBreakfast ?? false);
    },
    [booking]
  );

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numNights * numGuests;

  const finalPrice = hasBreakfast
    ? addBreakfast
      ? totalPrice
      : totalPrice - breakfastPrice
    : addBreakfast
    ? totalPrice + breakfastPrice
    : totalPrice;

  function handleCheckin() {
    const { guests, cabins, ...newObj } = booking;
    updateBooking({
      obj: {
        ...newObj,
        hasBreakfast: addBreakfast,
        totalPrice: finalPrice,
        status: "checked-in",
        isPaid: true,
      },
      id: bookingId,
    });
    navigate("/bookings");
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Row>
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => setAddbreakfast((state) => !state)}
            disabled={hasBreakfast && isPaid}
          >
            Want to add breakfast for {formatCurrency(breakfastPrice)} ?
          </Checkbox>
        </Box>
        <Box>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((state) => !state)}
          >
            I confirm that <FocusedInfo>{guests.fullName}</FocusedInfo> has paid
            the total amount of{" "}
            <FocusedInfo>
              {formatCurrency(finalPrice)}
            </FocusedInfo>
            {addBreakfast
              ? `(${formatCurrency(
                  totalPrice - breakfastPrice
                )} + ${formatCurrency(breakfastPrice)})`
              : ""}
          </Checkbox>
        </Box>
      </Row>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          {isUpdating ? "Checking In" : "Check In"} booking #{bookingId}
          {isUpdating ? "..." : ""}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
