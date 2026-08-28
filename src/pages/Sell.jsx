import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { CATEGORIES } from "../data/products.js";

export default function Sell() {
  const { dispatch, myListings, currentUser } = useStore();
  const [saved, setSaved] = useState(false);

  const blank = {
    title: "",
    price: "",
    category: CATEGORIES[0],
    stock: "1",
    image: "",
    description: "",
  };
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    setError("");
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);
    if (!form.title.trim()) return setError("Give your item a title.");
    if (!(price > 0)) return setError("Enter a price greater than 0.");
    if (!(stock >= 0)) return setError("Enter a valid stock quantity.");

    dispatch({
      type: "ADD_LISTING",
      payload: {
        title: form.title.trim(),
        price,
        category: form.category,
        stock,
        seller: currentUser.name,
        image:
          form.image.trim() ||
          "https://images.unsplash.com/photo-1553456558-aff63285bdd1?auto=format&fit=crop&w=800&q=70",
        description: form.description.trim() || "No description provided.",
      },
    });
    setForm(blank);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const field =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">List an item for sale</h1>
      <p className="mt-1 text-sm text-slate-500">
        Your listing appears instantly in the catalogue for everyone using this browser.
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]">
        <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          {error && (
            <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
          )}
          {saved && (
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Listing published. <Link to="/products" className="font-semibold underline">See it in the catalogue →</Link>
            </div>
          )}

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input className={`${field} mt-1`} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Barely-used road bike" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Price (USD)</span>
              <input type="number" min="0" step="0.01" className={`${field} mt-1`} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0.00" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Stock</span>
              <input type="number" min="0" step="1" className={`${field} mt-1`} value={form.stock} onChange={(e) => set("stock", e.target.value)} />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select className={`${field} mt-1`} value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Image URL <span className="text-slate-400">(optional)</span></span>
            <input className={`${field} mt-1`} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea rows={4} className={`${field} mt-1`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Condition, details, why you're selling..." />
          </label>

          <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition hover:bg-indigo-700">
            Publish listing
          </button>
        </form>

        <aside>
          <h2 className="text-sm font-semibold text-slate-900">Your listings ({myListings.length})</h2>
          <div className="mt-3 space-y-3">
            {myListings.length === 0 && (
              <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                Nothing listed yet.
              </p>
            )}
            {myListings.map((l) => (
              <div key={l.id} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3">
                <img src={l.image} alt="" className="h-14 w-14 rounded object-cover" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
                <div className="min-w-0 flex-1">
                  <Link to={`/product/${l.id}`} className="block truncate text-sm font-semibold text-slate-800 hover:text-indigo-700">
                    {l.title}
                  </Link>
                  <span className="text-sm text-slate-500">${l.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => dispatch({ type: "DELETE_LISTING", payload: { id: l.id } })}
                  className="self-start text-xs font-medium text-rose-600 hover:text-rose-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
