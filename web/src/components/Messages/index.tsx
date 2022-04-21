import React, { useEffect, useState } from "react";

import MessageIncoming from "../MessageIncoming";
import MessageSended from "../MessageSended";
import socket from "../../providers/socket";

type ChatProps = {
  name: string;
  message: string;
};

type MessagesProps = {
  userName?: string;
};

const Messages: React.FC<MessagesProps> = ({ userName = "Teste" }) => {
  const [chat, setChat] = useState<ChatProps[]>([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  return (
    <div className="grid w-full">
      {chat.map(({ name, message }, index) => (
        <React.Fragment key={`message-${index}`}>
          {userName === name ? (
            <MessageSended message={message} time="22:37" />
          ) : (
            <MessageIncoming name={name} message={message} time="22:37" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Messages;
