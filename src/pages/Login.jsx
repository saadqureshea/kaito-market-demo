import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Login() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    setError("");
    const res = dispatch({ type: "LOGIN", payload: { email, password } });
    if (res.ok) navigate(from, { replace: true });
    else setError(res.error);
  }

  const field =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">
        Log in to check out, track orders and list items.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        {error && (
          <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
        )}
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input type="email" required className={`${field} mt-1`} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input type="password" required className={`${field} mt-1`} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700">
          Log in
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        New here?{" "}
        <Link to="/register" state={{ from }} className="font-semibold text-indigo-600 hover:text-indigo-700">
          Create an account
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-slate-400">
        Accounts are stored only in this browser.
      </p>
    </div>
  );
}
