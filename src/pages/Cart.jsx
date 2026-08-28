import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Cart() {
  const { cartItems, cartSubtotal, dispatch, currentUser } = useStore();
  const navigate = useNavigate();

  const shipping = cartSubtotal > 0 && cartSubtotal < 75 ? 6.99 : 0;
  const tax = +(cartSubtotal * 0.08).toFixed(2);
  const total = +(cartSubtotal + shipping + tax).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-100">
          <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l1.5 12.75a1.5 1.5 0 001.5 1.35h10.5a1.5 1.5 0 001.5-1.2l1.5-8.4H5.25" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">Browse the catalogue and add a few things.</p>
        <Link to="/products" className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Shopping cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {cartItems.map((item) => (
            <li key={item.id} className="flex gap-4 p-4">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <Link to={`/product/${item.id}`} className="font-semibold text-slate-800 hover:text-indigo-700">
                    {item.title}
                  </Link>
                  <span className="font-bold text-slate-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
                <span className="text-sm text-slate-500">${item.price.toFixed(2)} each</span>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-lg border border-slate-300">
                    <button
                      onClick={() => dispatch({ type: "SET_QTY", payload: { id: item.id, qty: item.qty - 1 } })}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-50"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => dispatch({ type: "SET_QTY", payload: { id: item.id, qty: item.qty + 1 } })}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { id: item.id } })}
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-medium text-slate-800">${cartSubtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Shipping</dt>
              <dd className="font-medium text-slate-800">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Estimated tax</dt>
              <dd className="font-medium text-slate-800">${tax.toFixed(2)}</dd>
            </div>
            <div className="my-2 border-t border-slate-200" />
            <div className="flex justify-between text-base">
              <dt className="font-bold text-slate-900">Total</dt>
              <dd className="font-extrabold text-slate-900">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <button
            onClick={() => navigate(currentUser ? "/checkout" : "/login", { state: { from: "/checkout" } })}
            className="mt-5 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            {currentUser ? "Proceed to checkout" : "Log in to checkout"}
          </button>
          <Link to="/products" className="mt-3 block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
