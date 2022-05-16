import React, { useEffect, useState } from "react";

import MessageIncoming from "../../atoms/MessageIncoming";
import MessageSended from "../../atoms/MessageSended";
import socket from "../../providers/socket";

type ChatProps = {
  userId: string;
  name: string;
  message: string;
  datetime: string;
};

type MessagesProps = {
  currentUserId?: string;
};

const Messages: React.FC<MessagesProps> = ({ currentUserId }) => {
  const [chat, setChat] = useState<ChatProps[]>([]);

  const compareDatesWithoutTime = (first: Date, second: Date) =>
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear();

  const messagesDate = chat.reduce((prev: any, curr) => {
    if (!curr?.datetime) return prev;
    if (!prev.length) return [curr.datetime];

    const currDate = new Date(curr.datetime);
    const prevDate = new Date(prev[prev.length - 1]);

    if (compareDatesWithoutTime(currDate, prevDate)) {
      return prev;
    }

    return [...prev, curr.datetime];
  }, []);

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
    <div className="grid w-full pb-8">
      {messagesDate.map((dateSended: string, index: number) => (
        <React.Fragment key={`messageGroup-${index}`}>
          <p className="text-white text-center mt-2 mb-4">
            {new Date(dateSended).toLocaleString("pt-BR", {
              dateStyle: "short",
            })}
          </p>
          {chat
            .filter(({ datetime }) =>
              compareDatesWithoutTime(new Date(datetime), new Date(dateSended))
            )
            .map(({ userId, name, message, datetime }, index) => (
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default Messages;
