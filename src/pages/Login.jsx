import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

function Login() {
  return (
    <LoginLayout>
      <HeaderRow>
        <Logo />
        <Heading>Login To Your Account</Heading>
      </HeaderRow>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
