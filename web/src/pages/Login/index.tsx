import React from "react";
import Container from "../../atoms/Container";
import LoginForm from "../../molecules/LoginForm";

const Login: React.FC = () => {
  return (
    <Container>
      <p className="text-white text-6xl mt-auto mb-6">Chat App</p>
      <LoginForm />
    </Container>
  );
};

export default Login;
