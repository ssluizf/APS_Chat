import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";

import Container from '../../atoms/Container';
import Messages from '../../molecules/Messages';
import MessageField from '../../atoms/MessageField';

type UserProps = {
  id?: string
  name?: string
}

const Chat: React.FC = () => {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const tokenDecoded: UserProps = jwt(token);
    setUser(tokenDecoded);
  }, []);

  return (
    <Container>
      <Messages currentUserId={user?.id} />
      <MessageField />
    </Container>
  );
};

export default Chat;
