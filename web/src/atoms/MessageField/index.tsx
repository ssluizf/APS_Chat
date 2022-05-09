import React from "react";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import socket from "../../providers/socket";

const MessageField: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const submitForm = handleSubmit(({ message }) => {
    socket.emit('message', { message });
  });

  return (
    <form
      onSubmit={submitForm}
      className="flex justify-between px-3 py-2
    bg-slate-50 w-full border border-gray-300 rounded-lg shadow-sm"
    >
      <input
        type="text"
        placeholder="Mensagem"
        className="w-full bg-transparent focus:outline-none"
        autoComplete="off"
        {...register("message", { required: true })}
      />
      <button type="submit" className="text-gray-600 text-xl pl-1">
        <MdSend />
      </button>
    </form>
  );
};

export default MessageField;
