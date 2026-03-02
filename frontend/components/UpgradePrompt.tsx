"use client";

interface UpgradePromptProps {
  reason: "commitments" | "stake" | "partners";
}

const messages: Record<UpgradePromptProps["reason"], string> = {
  commitments: "Upgrade to Starter for more commitments and stakes.",
  stake: "Add stakes with Starter ($4.99/mo).",
  partners: "Add a second partner with Starter ($4.99/mo).",
};

export function UpgradePrompt({ reason }: UpgradePromptProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">{messages[reason]}</p>
    </div>
  );
}
