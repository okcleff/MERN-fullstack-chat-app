import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';
import GenderCheckbox from '../../components/signUp/GenderCheckBox';
import Spinner from '../../components/Spinner';

const inputClass =
  'w-full bg-transparent border-0 border-b border-line pb-2 text-ink placeholder:text-muted/50 focus:outline-none focus:border-brand transition-colors';
const labelClass =
  'block text-[11px] font-medium uppercase tracking-[0.15em] text-muted mb-2';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signUp } = useSignUp();

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(inputs);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 rise" style={{ animationDelay: '0ms' }}>
        <span className="font-display text-sm tracking-wide text-muted">
          ✦ ChatApp
        </span>
        <h1 className="font-display text-5xl leading-[1.05] text-ink mt-5">
          Create
          <br />
          account.
        </h1>
        <p className="text-muted mt-3 text-sm">
          Join the conversation in a few seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rise" style={{ animationDelay: '80ms' }}>
          <label className={labelClass}>Full name</label>
          <input
            type="text"
            placeholder="John Doe"
            className={inputClass}
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </div>

        <div className="rise" style={{ animationDelay: '130ms' }}>
          <label className={labelClass}>Username</label>
          <input
            type="text"
            placeholder="johndoe"
            className={inputClass}
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        <div className="rise" style={{ animationDelay: '180ms' }}>
          <label className={labelClass}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClass}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        <div className="rise" style={{ animationDelay: '230ms' }}>
          <label className={labelClass}>Confirm password</label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClass}
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
        </div>

        <div className="rise" style={{ animationDelay: '280ms' }}>
          <label className={labelClass}>Gender</label>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
        </div>

        <div className="rise pt-2" style={{ animationDelay: '330ms' }}>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-brand-ink rounded-full py-3.5 text-sm font-medium tracking-wide hover:brightness-105 active:scale-[0.99] transition disabled:opacity-60 flex items-center justify-center"
          >
            {loading ? <Spinner /> : 'Create account'}
          </button>
        </div>
      </form>

      <p
        className="text-sm text-muted mt-7 rise"
        style={{ animationDelay: '380ms' }}
      >
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-ink underline underline-offset-4 decoration-brand hover:text-brand transition-colors"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
