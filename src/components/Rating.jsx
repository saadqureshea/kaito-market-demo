export default function Rating({ value = 0, size = "sm" }) {
  const rounded = Math.round(value * 2) / 2;
  const stars = [1, 2, 3, 4, 5];
  const cls = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      <span className="flex">
        {stars.map((s) => {
          const fill =
            rounded >= s ? "full" : rounded >= s - 0.5 ? "half" : "empty";
          return (
            <svg key={s} className={cls} viewBox="0 0 20 20" aria-hidden="true">
              <defs>
                <linearGradient id={`half-${s}`}>
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.9 4.8 18.6l1-5.8L1.5 8.7l5.9-.9z"
                fill={
                  fill === "full"
                    ? "#f59e0b"
                    : fill === "half"
                    ? `url(#half-${s})`
                    : "#e2e8f0"
                }
              />
            </svg>
          );
        })}
      </span>
      {value > 0 && (
        <span className="text-xs font-medium text-slate-500">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}
