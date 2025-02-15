import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "motion/react";

import Header from "./Header";
import SideBar from "./SideBar";
import { useContext, useEffect } from "react";
import { authContext } from "../features/authentication/authContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Container = styled.div`
  max-width: 135rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const navigate = useNavigate();
  const context = useContext(authContext);

  if (!localStorage.getItem("isDark")) {
    localStorage.setItem("isDark", false);
  }

  useEffect(
    function () {
      if (!(context?.user?.aud === "authenticated")) {
        navigate("/login");
      }
    },
    [context, navigate]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <StyledAppLayout>
        <Header />
        <SideBar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </motion.div>
  );
}

export default AppLayout;
