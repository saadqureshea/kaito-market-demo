import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { CATEGORIES } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const CATEGORY_ICON = {
  Electronics: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
  Fashion: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12A1.125 1.125 0 0119.743 21H4.257a1.125 1.125 0 01-1.126-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z",
  "Home & Kitchen": "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75",
  "Sports & Outdoors": "M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.949 8.949 0 004.951-1.488M12 21a8.949 8.949 0 01-4.951-1.488M3.049 15.51A8.949 8.949 0 013 12m0 0c0-1.605.42-3.113 1.157-4.418",
  Books: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  Beauty: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  "Toys & Games": "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  Automotive: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-6.75",
};

export default function Home() {
  const { allProducts } = useStore();
  const featured = allProducts.slice(0, 8);
  const topRated = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      {/* hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
              Kaito Market
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Buy and sell almost anything.
            </h1>
            <p className="mt-4 text-lg text-indigo-100">
              A clean, fast marketplace for everyday things — electronics,
              fashion, home goods and more. Set up a listing in under a minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-lg bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Start shopping
              </Link>
              <Link
                to="/sell"
                className="rounded-lg border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Sell an item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl font-bold text-slate-900">Shop by category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/products?category=${encodeURIComponent(c)}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:border-indigo-300 hover:shadow-md"
            >
              <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d={CATEGORY_ICON[c]} />
              </svg>
              <span className="text-xs font-semibold text-slate-700">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* featured */}
      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-slate-900">Featured products</h2>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            View all →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* top rated */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl font-bold text-slate-900">Top rated</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {topRated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
