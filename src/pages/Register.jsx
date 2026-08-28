import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Register() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    const res = dispatch({
      type: "REGISTER",
      payload: { name: form.name, email: form.email, password: form.password },
    });
    if (res.ok) navigate(from, { replace: true });
    else setError(res.error);
  }

  const field =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-1 text-sm text-slate-500">It takes about ten seconds.</p>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        {error && (
          <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
        )}
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input required className={`${field} mt-1`} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input type="email" required className={`${field} mt-1`} value={form.email} onChange={(e) => set("email", e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input type="password" required className={`${field} mt-1`} value={form.password} onChange={(e) => set("password", e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Confirm password</span>
          <input type="password" required className={`${field} mt-1`} value={form.confirm} onChange={(e) => set("confirm", e.target.value)} />
        </label>
        <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700">
          Create account
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" state={{ from }} className="font-semibold text-indigo-600 hover:text-indigo-700">
          Log in
        </Link>
      </p>
    </div>
  );
}
