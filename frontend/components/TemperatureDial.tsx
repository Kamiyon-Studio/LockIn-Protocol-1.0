"use client";

interface TemperatureDialProps {
  value: number;
  mode: string;
  showLeaf?: boolean;
}

export function TemperatureDial({ value, mode, showLeaf = true }: TemperatureDialProps) {
  const min = 10;
  const max = 30;
  const pct = (value - min) / (max - min);
  const r = 52;
  const semicircle = Math.PI * r;
  const strokeDash = pct * semicircle;

  return (
    <div className="relative mx-auto flex w-64 flex-col items-center">
      <div className="relative h-64 w-64">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#dialGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${semicircle * 2}`}
            strokeDashoffset={semicircle - strokeDash}
          />
          <defs>
            <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {mode}
          </span>
          <span className="mt-1 text-5xl font-bold text-gray-900">{value}</span>
          {showLeaf && (
            <span className="mt-2 text-green-500" aria-hidden>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1.39-2.5c.48.17.98.3 1.5.4L8 22h2l.5-2.5c.52-.1 1.02-.23 1.5-.4l1.39 2.5 1.88-.66C15.9 16.17 13.8 10 5 8c2.5 1.5 4 4 4 6 0 2-1.5 4.5-4 6 8-2 10.1-7.83 12.18-13L18.29 14l-1.39 2.5c-.48-.17-.98-.3-1.5-.4L16 14h-2l-.5 2.5c-.52.1-1.02.23-1.5.4L10.71 14l-1.88.66C9.1 10.83 11.2 8 20 8c-2.5 1.5-4 4-4 6 0 2 1.5 4.5 4 6z" />
              </svg>
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 flex w-full max-w-[200px] justify-between px-4 text-xs text-gray-400">
        <span>10°</span>
        <span>30°</span>
      </div>
    </div>
  );
}
