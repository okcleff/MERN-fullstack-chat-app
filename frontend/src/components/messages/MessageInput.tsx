import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';
import Spinner from '../Spinner';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) return;

    await sendMessage(message);

    setMessage('');
  };

  return (
    <form className="px-4 py-3 border-t border-line" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-paper rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 transition"
          placeholder="Type a message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 w-10 h-10 grid place-items-center rounded-full bg-brand text-brand-ink hover:brightness-105 active:scale-95 transition disabled:opacity-60"
        >
          {loading ? <Spinner /> : <BsSend className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
