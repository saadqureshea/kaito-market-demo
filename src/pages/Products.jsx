import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { CATEGORIES } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const SORTS = {
  relevance: "Relevance",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Highest rated",
};

export default function Products() {
  const { allProducts } = useStore();
  const [params, setParams] = useSearchParams();

  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "relevance";
  const maxPrice = Number(params.get("max") || 0);

  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  const results = useMemo(() => {
    let list = [...allProducts];
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle) ||
          (p.seller || "").toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle)
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (maxPrice > 0) list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [allProducts, q, category, sort, maxPrice]);

  const priciest = Math.ceil(
    allProducts.reduce((m, p) => Math.max(m, p.price), 0)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {category || (q ? `Results for “${q}”` : "All products")}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {results.length} item{results.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* filters */}
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Category</h3>
            <div className="mt-2 flex flex-col gap-1">
              <button
                onClick={() => update("category", "")}
                className={`rounded-md px-2 py-1 text-left text-sm ${
                  !category ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All categories
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => update("category", c)}
                  className={`rounded-md px-2 py-1 text-left text-sm ${
                    category === c ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Max price</h3>
            <input
              type="range"
              min="0"
              max={priciest}
              step="5"
              value={maxPrice || priciest}
              onChange={(e) =>
                update("max", Number(e.target.value) >= priciest ? "" : e.target.value)
              }
              className="mt-2 w-full accent-indigo-600"
            />
            <div className="text-sm text-slate-600">
              {maxPrice > 0 ? `Up to $${maxPrice}` : "Any price"}
            </div>
          </div>

          {(q || category || maxPrice) && (
            <button
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* grid */}
        <section>
          <div className="mb-4 flex justify-end">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              Sort
              <select
                value={sort}
                onChange={(e) => update("sort", e.target.value === "relevance" ? "" : e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-indigo-500"
              >
                {Object.entries(SORTS).map(([v, label]) => (
                  <option key={v} value={v}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-slate-600">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
