import React from 'react';

type MessageSendedProps = {
  message: string,
  time: string
}

const MessageSended: React.FC<MessageSendedProps> = ({ message, time }) => {
  return (
    <div className="justify-self-end flex flex-col relative w-3/5 p-2 mb-2 bg-emerald-100 rounded-xl">
      <p>{message}</p>
      <p className="absolute bottom-0 right-0 m-2 text-xs text-gray-600 mb-1">{time}</p>
    </div>
  );
}

export default MessageSended;