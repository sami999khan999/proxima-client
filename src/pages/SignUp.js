import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, signup } = useSignUp();

  const handelSignUp = async (e) => {
    e.preventDefault();

    // signup
    await signup(email, password);
  };

  return (
    <form
      onSubmit={handelSignUp}
      className="login-form flex flex-col gap-5 py-20 mx-auto max-w-sm"
    >
      <h2 className="text-4xl font-medium text-sky-400 mb-10">SignUp</h2>

      <div className="form-comtroll flex flex-col gap-2">
        <label
          htmlFor="email"
          className="cursor-pointer text-gray-300 mx-2 hover:text-sky-400 duration-300"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="google@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-xl outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-comtroll flex flex-col gap-2">
        <label
          htmlFor="password"
          className="cursor-pointer text-gray-300 mx-2 hover:text-sky-400 duration-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-xl outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="bg-sky-400 py-3 mt-3 rounded-xl hover:bg-sky-500 duration-300 text-gray-200"
      >
        Log in
      </button>
      {error && (
        <p className="bg-rose-500/20 text-center rounded-lg p-5 text-rose-500 border border-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default SignUp;
