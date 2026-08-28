import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-white font-black">K</span>
            <span className="font-extrabold text-slate-900">KaitoMarket</span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            A student demo marketplace. Buy and sell anything — all data lives in
            your browser.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/products" className="hover:text-indigo-700">All products</Link></li>
            <li><Link to="/products?category=Electronics" className="hover:text-indigo-700">Electronics</Link></li>
            <li><Link to="/products?category=Fashion" className="hover:text-indigo-700">Fashion</Link></li>
            <li><Link to="/products?category=Home%20%26%20Kitchen" className="hover:text-indigo-700">Home &amp; Kitchen</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Sell</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/sell" className="hover:text-indigo-700">List an item</Link></li>
            <li><Link to="/orders" className="hover:text-indigo-700">My orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">About</h4>
          <p className="mt-3 text-sm text-slate-500">
            Built with React, Vite and Tailwind CSS. Deployed on Vercel.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} KaitoMarket — demo project, not a real store.
      </div>
    </footer>
  );
}
