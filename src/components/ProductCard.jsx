import { Link } from "react-router-dom";
import Rating from "./Rating.jsx";
import { useStore } from "../context/StoreContext.jsx";

export default function ProductCard({ product }) {
  const { dispatch } = useStore();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-lg hover:-translate-y-0.5">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='50%' font-family='sans-serif' font-size='20' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'>No image</text></svg>`
                );
            }}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="mt-1 line-clamp-2 font-semibold text-slate-800 hover:text-indigo-700">
          {product.title}
        </Link>
        <div className="mt-1">
          <Rating value={product.rating} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id: product.id } })}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
