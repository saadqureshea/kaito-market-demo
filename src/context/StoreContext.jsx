import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { SEED_PRODUCTS } from "../data/products.js";

/**
 * Single source of truth for the whole app.
 *
 * Everything is kept in localStorage so the deployed (frontend-only) build
 * behaves like a real backend: accounts, listings, carts and orders all
 * survive a page reload. Swapping in a real API later means replacing the
 * reducer side-effects with fetch calls — the component tree stays the same.
 */

const StoreContext = createContext(null);

const LS_KEY = "kaito-market-state-v1";

const emptyState = {
  users: [], // { id, name, email, password }
  currentUserId: null,
  listings: [], // user-created products, same shape as SEED_PRODUCTS
  cart: {}, // { [productId]: qty }
  orders: [], // { id, userId, items, total, address, createdAt }
};

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return emptyState;
    return { ...emptyState, ...JSON.parse(raw) };
  } catch {
    return emptyState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "REGISTER": {
      const { name, email, password } = action.payload;
      if (state.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("An account with that email already exists.");
      }
      const user = { id: `u-${Date.now()}`, name, email, password };
      return { ...state, users: [...state.users, user], currentUserId: user.id };
    }
    case "LOGIN": {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) throw new Error("Incorrect email or password.");
      return { ...state, currentUserId: user.id };
    }
    case "LOGOUT":
      return { ...state, currentUserId: null };

    case "ADD_TO_CART": {
      const { id, qty = 1 } = action.payload;
      const current = state.cart[id] || 0;
      return { ...state, cart: { ...state.cart, [id]: current + qty } };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const next = { ...state.cart };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return { ...state, cart: next };
    }
    case "REMOVE_FROM_CART": {
      const next = { ...state.cart };
      delete next[action.payload.id];
      return { ...state, cart: next };
    }
    case "CLEAR_CART":
      return { ...state, cart: {} };

    case "ADD_LISTING": {
      const listing = {
        ...action.payload,
        id: `p-${Date.now()}`,
        rating: 0,
        ownerId: state.currentUserId,
      };
      return { ...state, listings: [listing, ...state.listings] };
    }
    case "DELETE_LISTING":
      return {
        ...state,
        listings: state.listings.filter((l) => l.id !== action.payload.id),
      };

    case "PLACE_ORDER": {
      const order = {
        id: `o-${Date.now()}`,
        userId: state.currentUserId,
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      return { ...state, orders: [order, ...state.orders], cart: {} };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, rawDispatch] = useReducer(reducer, undefined, load);

  // A dispatch that surfaces reducer errors to the caller instead of crashing.
  function dispatch(action) {
    try {
      rawDispatch(action);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — ignore for a demo */
    }
  }, [state]);

  const allProducts = useMemo(
    () => [...state.listings, ...SEED_PRODUCTS],
    [state.listings]
  );

  const currentUser =
    state.users.find((u) => u.id === state.currentUserId) || null;

  const cartItems = useMemo(() => {
    return Object.entries(state.cart)
      .map(([id, qty]) => {
        const product = allProducts.find((p) => p.id === id);
        return product ? { ...product, qty } : null;
      })
      .filter(Boolean);
  }, [state.cart, allProducts]);

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const myOrders = state.orders.filter((o) => o.userId === state.currentUserId);
  const myListings = state.listings.filter(
    (l) => l.ownerId === state.currentUserId
  );

  const value = {
    state,
    dispatch,
    allProducts,
    currentUser,
    cartItems,
    cartCount,
    cartSubtotal,
    myOrders,
    myListings,
    getProduct: (id) => allProducts.find((p) => p.id === id) || null,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
