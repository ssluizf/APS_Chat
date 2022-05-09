import React from "react";
import formatTime from "../../utils/formatTime";

type MessageIncomingProps = {
  message: string;
  datetime: string;
  name?: string;
};

const MessageIncoming: React.FC<MessageIncomingProps> = ({
  message,
  datetime,
  name,
}) => {
  return (
    <div className="flex flex-col relative w-3/5 p-2 mb-2 bg-slate-50 rounded-xl">
      <p className="font-bold text-sm text-emerald-500">{name}</p>
      <p>{message}</p>
      <p className="absolute bottom-0 right-0 m-2 text-xs text-gray-600 mb-1">
        {formatTime(new Date(datetime))}
      </p>
    </div>
  );
};

export default MessageIncoming;
