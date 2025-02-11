import { useContext } from "react";
import styled from "styled-components";
import { authContext } from "./authContext";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const contextAuth = useContext(authContext);
  const userName = contextAuth.user?.user_metadata?.full_name;
  const image = contextAuth.user?.user_metadata?.image;

  return (
    <StyledUserAvatar>
      <Avatar src={image} />
      {userName}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
