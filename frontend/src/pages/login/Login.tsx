import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import Spinner from '../../components/Spinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="w-full max-w-sm">
      {/* 브랜드 + 에디토리얼 헤더 */}
      <div className="mb-10 rise" style={{ animationDelay: '0ms' }}>
        <span className="font-display text-sm tracking-wide text-muted">
          ✦ ChatApp
        </span>
        <h1 className="font-display text-5xl leading-[1.05] text-ink mt-5">
          Welcome
          <br />
          back.
        </h1>
        <p className="text-muted mt-3 text-sm">
          Pick up the conversation where you left off.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="rise" style={{ animationDelay: '90ms' }}>
          <label className="block text-[11px] font-medium uppercase tracking-[0.15em] text-muted mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full bg-transparent border-0 border-b border-line pb-2 text-ink placeholder:text-muted/50 focus:outline-none focus:border-brand transition-colors"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="rise" style={{ animationDelay: '150ms' }}>
          <label className="block text-[11px] font-medium uppercase tracking-[0.15em] text-muted mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent border-0 border-b border-line pb-2 text-ink placeholder:text-muted/50 focus:outline-none focus:border-brand transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="rise pt-3" style={{ animationDelay: '210ms' }}>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-brand-ink rounded-full py-3.5 text-sm font-medium tracking-wide hover:brightness-105 active:scale-[0.99] transition disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? <Spinner /> : 'Log in'}
          </button>
        </div>
      </form>

      <p
        className="text-sm text-muted mt-8 rise"
        style={{ animationDelay: '270ms' }}
      >
        New here?{' '}
        <Link
          to="/signup"
          className="text-ink underline underline-offset-4 decoration-brand hover:text-brand transition-colors"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
