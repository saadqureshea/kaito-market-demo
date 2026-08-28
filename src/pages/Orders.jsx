import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Orders() {
  const { myOrders } = useStore();

  if (myOrders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">No orders yet</h1>
        <p className="mt-2 text-slate-500">When you check out, your orders show up here.</p>
        <Link to="/products" className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">My orders</h1>

      <div className="mt-6 space-y-4">
        {myOrders.map((o) => (
          <div key={o.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Order {o.id}</p>
                <p className="text-xs text-slate-500">
                  {new Date(o.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Confirmed
              </span>
            </div>

            <ul className="mt-3 space-y-1.5 text-sm">
              {o.items.map((i) => (
                <li key={i.id} className="flex justify-between">
                  <span className="text-slate-600">
                    {i.title} <span className="text-slate-400">× {i.qty}</span>
                  </span>
                  <span className="font-medium text-slate-800">
                    ${(i.price * i.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-sm">
              <span className="text-slate-500">Shipped to {o.address}</span>
              <span className="font-extrabold text-slate-900">${o.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
