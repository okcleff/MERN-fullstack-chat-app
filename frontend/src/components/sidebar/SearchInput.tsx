import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search) return;

    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else toast.error('No such user found!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search people…"
        className="flex-1 bg-paper rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="shrink-0 w-9 h-9 grid place-items-center rounded-full bg-brand text-brand-ink hover:brightness-105 active:scale-95 transition"
      >
        <IoSearchSharp className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchInput;
