import useFinanceStore from '../store/useStore'
import Insights from '../components/ui/Insights'
import TransactionTable from '../components/ui/TransactionTable'

export default function Dashboard() {
  const role = useFinanceStore((state) => state.role)
  const setRole = useFinanceStore((state) => state.setRole)
  const formattedRole = `${role.charAt(0).toUpperCase()}${role.slice(1)}`
  const nextRole = role === 'admin' ? 'user' : 'admin'
  const accessMessage =
    role === 'admin'
      ? 'You can review all transactions and dashboard insights across users.'
      : 'You are viewing only your own transactions and related spending insights.'

  function handleRoleSwitch() {
    setRole(nextRole)
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="float-slow absolute -left-16 top-24 h-52 w-52 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="float-delayed absolute right-0 top-12 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="drift-slow absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-300/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6 lg:space-y-8">
        <header className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_35px_80px_-36px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_42%)] lg:block" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Finance Intelligence Dashboard
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  FinTrack
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Review transactions, monitor spending patterns, and switch
                  between admin and user access through a polished finance
                  workspace built for clarity.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-950 px-5 py-4 text-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.75)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Active Role
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight">
                  {formattedRole}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRoleSwitch}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_22px_40px_-22px_rgba(8,145,178,0.85)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_48px_-22px_rgba(8,145,178,0.95)] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2"
              >
                Switch to {nextRole === 'admin' ? 'Admin' : 'User'}
                <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.16em]">
                  RBAC
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)] lg:gap-8">
          <Insights />

          <section className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_70px_-36px_rgba(15,23,42,0.38)] sm:p-8">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="relative space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">Access Role</p>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                  {formattedRole} View
                </h2>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Visibility
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {accessMessage}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  Workspace Note
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The dashboard updates instantly when roles change, while all
                  transaction and insight logic remains unchanged behind the UI.
                </p>
              </div>
            </div>
          </section>
        </div>

        <TransactionTable />
      </div>
    </main>
  )
}
