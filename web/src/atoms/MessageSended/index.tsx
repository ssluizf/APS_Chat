import React from "react";
import formatTime from "../../utils/formatTime";

type MessageSendedProps = {
  message: string;
  datetime: string;
};

const MessageSended: React.FC<MessageSendedProps> = ({ message, datetime }) => {
  return (
    <div className="justify-self-end flex flex-col relative w-3/5 p-2 mb-2 bg-emerald-100 rounded-xl">
      <p>{message}</p>
      <p
        className="absolute bottom-0 right-0 m-2
        text-xs text-gray-600 mb-1"
      >
        {formatTime(new Date(datetime))}
      </p>
    </div>
  );
};

export default MessageSended;
