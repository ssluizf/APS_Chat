import React from "react";
import Container from "../../atoms/Container";
import RegisterForm from "../../molecules/RegisterForm";

const Register: React.FC = () => {
  return (
    <Container>
      <p className="text-white text-6xl mt-auto mb-6">Chat App</p>
      <RegisterForm />
    </Container>
  );
};

export default Register;
