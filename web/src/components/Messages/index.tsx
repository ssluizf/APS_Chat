import React, { useEffect, useState } from 'react';

import MessageIncoming from '../MessageIncoming';
import MessageSended from '../MessageSended';
import socket from "../../providers/socket";

type Chat = {
  name: string,
  message: string,
}

const Messages: React.FC = () => {
  const [chat, setChat] = useState<Chat[]>([]);

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  }, [])

  return (
    <div className="grid w-full">
      <MessageIncoming name="Nome" message="Primeira mensagem" time="22:37" />
      <MessageIncoming message="Segunda mensagem" time="22:39" />
      <MessageSended message="Terceira mensagem" time="23:03" />
    </div>
  );
}

export default Messages;