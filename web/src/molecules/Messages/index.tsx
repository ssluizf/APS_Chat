import React, { useEffect, useState } from "react";

import MessageIncoming from "../../atoms/MessageIncoming";
import MessageSended from "../../atoms/MessageSended";
import socket from "../../providers/socket";

type ChatProps = {
  userId: string,
  name: string;
  message: string;
  datetime: string;
};

type MessagesProps = {
  currentUserId?: string;
};

const Messages: React.FC<MessagesProps> = ({ currentUserId }) => {
  const [chat, setChat] = useState<ChatProps[]>([]);

  useEffect(() => {
    socket.on("output-messages", (payload) => {
      const messages = payload.map(
        ({ userId, name, message, datetime }: ChatProps) => ({
          userId,
          name,
          message,
          datetime,
        })
      );

      setChat(messages);
    });
    socket.on("message", ({ userId, name, message, datetime }) => {
      setChat([
        ...chat,
        {
          userId,
          name,
          message,
          datetime,
        },
      ]);
    });
  });

  return (
    <div className="grid w-full">
      {chat.map(({ userId, name, message, datetime }, index) => (
        <React.Fragment key={`message-${index}`}>
          {userId === currentUserId ? (
            <MessageSended message={message} datetime={datetime} />
          ) : (
            <MessageIncoming
              name={name}
              message={message}
              datetime={datetime}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Messages;
