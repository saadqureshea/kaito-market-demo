import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Checkout() {
  const { cartItems, cartSubtotal, dispatch, currentUser } = useStore();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(null);

  const shipping = cartSubtotal > 0 && cartSubtotal < 75 ? 6.99 : 0;
  const tax = +(cartSubtotal * 0.08).toFixed(2);
  const total = +(cartSubtotal + shipping + tax).toFixed(2);

  const [form, setForm] = useState({
    fullName: currentUser?.name || "",
    address: "",
    city: "",
    zip: "",
    country: "",
    card: "",
  });

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const order = {
      items: cartItems.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        qty: i.qty,
      })),
      total,
      address: `${form.address}, ${form.city} ${form.zip}, ${form.country}`,
    };
    dispatch({ type: "PLACE_ORDER", payload: order });
    setPlaced({ id: `o-${Date.now()}`, total });
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Order placed!</h1>
        <p className="mt-2 text-slate-500">
          Thanks, {form.fullName || "friend"}. Your order total was{" "}
          <span className="font-semibold text-slate-800">${placed.total.toFixed(2)}</span>.
          This is a demo, so no payment was taken.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
          >
            View my orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Keep shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Nothing to check out</h1>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
        >
          Browse products
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>

      <form onSubmit={submit} className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">Shipping address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Full name" className={field} value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
              <input required placeholder="Street address" className={field} value={form.address} onChange={(e) => set("address", e.target.value)} />
              <input required placeholder="City" className={field} value={form.city} onChange={(e) => set("city", e.target.value)} />
              <input required placeholder="ZIP / Postcode" className={field} value={form.zip} onChange={(e) => set("zip", e.target.value)} />
              <input required placeholder="Country" className={field} value={form.country} onChange={(e) => set("country", e.target.value)} />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">Payment</h2>
            <p className="mt-1 text-sm text-slate-500">
              Demo only — do not enter a real card number.
            </p>
            <input
              required
              inputMode="numeric"
              maxLength={19}
              placeholder="4242 4242 4242 4242"
              className={`${field} mt-3`}
              value={form.card}
              onChange={(e) => set("card", e.target.value)}
            />
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Your order</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {cartItems.map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span className="text-slate-600">
                  {i.title} <span className="text-slate-400">× {i.qty}</span>
                </span>
                <span className="font-medium text-slate-800">
                  ${(i.price * i.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-slate-200" />
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>${cartSubtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Tax</dt><dd>${tax.toFixed(2)}</dd></div>
            <div className="flex justify-between pt-2 text-base font-extrabold text-slate-900">
              <dt>Total</dt><dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <button type="submit" className="mt-5 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}
