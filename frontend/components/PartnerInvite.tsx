"use client";

interface PartnerInviteProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  tooltip?: string;
}

export function PartnerInvite({ value, onChange, disabled, tooltip }: PartnerInviteProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Accountability partner (email or wallet)
        {tooltip && (
          <span className="ml-1 text-gray-400" title={tooltip}>
            (i)
          </span>
        )}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="0x... or email@example.com"
        className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}
