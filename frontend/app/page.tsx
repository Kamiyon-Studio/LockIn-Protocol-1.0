import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          LockIn Protocol
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Turn habit-building into structured, verifiable action. Set daily commitments with
          optional photo check-ins and optional AVAX stakes on Avalanche. Stakes lock until
          resolution: success returns your stake, failure sends it to your accountability
          partners.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
          First commitment and check-in in under 5 minutes.
        </p>
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Free tier</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Free: 3 active commitments, 1 accountability partner, no stake. Photo check-ins,
          reminders, and basic dashboard. Upgrade to Starter ($4.99/mo) to add stakes and a
          second partner.
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <strong>Upgrade:</strong> Add stakes and a second partner with Starter.
        </p>
      </section>

      <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <p>Supported wallets: MetaMask, Core. Avalanche C-Chain only (Fuji testnet for testing).</p>
        <a
          href="https://build.avax.network"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Avalanche docs
        </a>
      </footer>
    </div>
  );
}
