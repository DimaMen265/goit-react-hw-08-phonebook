import { RegisterForm } from "components/RegisterForm/RegisterForm";
import { styled } from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RegisterTitle = styled.h1`
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Register = () => {
    return (
        <Container>
            <RegisterTitle>Register</RegisterTitle>
            <RegisterForm />
        </Container>
    );
};
