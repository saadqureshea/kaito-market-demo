import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Navbar() {
  const { cartCount, currentUser, dispatch } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function onSearch(e) {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setMenuOpen(false);
  }

  const linkCls = ({ isActive }) =>
    `text-sm font-medium transition hover:text-indigo-700 ${
      isActive ? "text-indigo-700" : "text-slate-600"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white font-black">
            K
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Kaito<span className="text-indigo-600">Market</span>
          </span>
        </Link>

        <form onSubmit={onSearch} className="hidden flex-1 md:block">
          <div className="relative mx-auto max-w-xl">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, categories, sellers..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a1 1 0 01-1.42 1.42l-3.08-3.08A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-5 md:flex">
          <NavLink to="/products" className={linkCls}>Browse</NavLink>
          <NavLink to="/sell" className={linkCls}>Sell</NavLink>
          {currentUser && (
            <NavLink to="/orders" className={linkCls}>Orders</NavLink>
          )}

          <Link to="/cart" className="relative text-slate-600 hover:text-indigo-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l1.5 12.75a1.5 1.5 0 001.5 1.35h10.5a1.5 1.5 0 001.5-1.2l1.5-8.4H5.25M9 21a.75.75 0 100-1.5.75.75 0 000 1.5zm9 0a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                Hi, {currentUser.name.split(" ")[0]}
              </span>
              <button
                onClick={() => { dispatch({ type: "LOGOUT" }); navigate("/"); }}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Log in
            </Link>
          )}
        </nav>

        {/* mobile */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="ml-auto md:hidden text-slate-700"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </form>
          <div className="flex flex-col gap-2">
            <Link to="/products" onClick={() => setMenuOpen(false)} className="py-1 text-slate-700">Browse</Link>
            <Link to="/sell" onClick={() => setMenuOpen(false)} className="py-1 text-slate-700">Sell</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="py-1 text-slate-700">Cart ({cartCount})</Link>
            {currentUser ? (
              <>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="py-1 text-slate-700">Orders</Link>
                <button
                  onClick={() => { dispatch({ type: "LOGOUT" }); setMenuOpen(false); navigate("/"); }}
                  className="py-1 text-left text-slate-700"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="py-1 font-semibold text-indigo-600">Log in</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
