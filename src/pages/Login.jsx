import { LoginForm } from "components/LoginForm/LoginForm";
import { styled } from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.h1`
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Login = () => {
    return (
        <Container>
            <LoginTitle>Login</LoginTitle>
            <LoginForm />
        </Container>
    );
};
