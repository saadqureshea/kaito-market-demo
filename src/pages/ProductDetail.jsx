import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import Rating from "../components/Rating.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, allProducts, dispatch } = useStore();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-slate-500">This listing may have been removed.</p>
        <Link to="/products" className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700">
          Back to products
        </Link>
      </div>
    );
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function addToCart() {
    dispatch({ type: "ADD_TO_CART", payload: { id: product.id, qty } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function buyNow() {
    dispatch({ type: "ADD_TO_CART", payload: { id: product.id, qty } });
    navigate("/cart");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-700">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-indigo-700">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='50%' font-family='sans-serif' font-size='24' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'>No image</text></svg>`
                );
            }}
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.title}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} size="md" />
            <span className="text-sm text-slate-400">•</span>
            <span className="text-sm text-slate-500">Sold by {product.seller || "a KaitoMarket seller"}</span>
          </div>

          <div className="mt-6 text-4xl font-extrabold text-slate-900">
            ${product.price.toFixed(2)}
          </div>
          <p className="mt-1 text-sm font-medium text-emerald-600">
            {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
          </p>

          <p className="mt-6 leading-relaxed text-slate-600">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="px-3 py-2 text-lg text-slate-600 hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((n) => Math.min(product.stock || 99, n + 1))}
                className="px-3 py-2 text-lg text-slate-600 hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-40"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
            <button
              onClick={buyNow}
              disabled={product.stock === 0}
              className="rounded-lg border border-indigo-600 px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:opacity-40"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-slate-900">More in {product.category}</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
