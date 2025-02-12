import styled from "styled-components";
import ButtonGroup from "./ButtonGroup";
import ButtonIcon from "./ButtonIcon";
import {
  HiArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineUser,
} from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../features/authentication/authContext";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  const contextAuth = useContext(authContext);
  const logOut = contextAuth.signOut;
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDark")==="true");

  useEffect(
    function () {
      if (isDarkMode) {
        localStorage.setItem("isDark", true);
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        localStorage.setItem("isDark", false);
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <StyledHeader>
      <ButtonGroup>
        <UserAvatar />
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
        <ButtonIcon onClick={() => setIsDarkMode((state) => !state)}>
          <HiOutlineMoon />
        </ButtonIcon>
        <ButtonIcon onClick={logOut}>
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      </ButtonGroup>
    </StyledHeader>
  );
}

export default Header;
