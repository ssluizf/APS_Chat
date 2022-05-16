import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

import Container from "../../atoms/Container";
import Messages from "../../molecules/Messages";
import MessageField from "../../atoms/MessageField";

type UserProps = {
  id?: string;
  name?: string;
};

const Chat: React.FC = () => {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const tokenDecoded: UserProps = jwt(token);
    setUser(tokenDecoded);
  }, []);

  return (
    <Container className="">
      <div className="container w-full flex flex-col items-end mb-2">
        <Link to="logout" className="flex w-min items-center top-0 right-0 text-white text-2xl">
          <span className="text-xl mr-2">Sair</span>
          <BiLogOut />
        </Link>
      </div>
      <Container>
        <Messages currentUserId={user?.id} />
        <MessageField />
      </Container>
    </Container>
  );
};

export default Chat;
