import useFinanceStore from '../../store/useStore'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const chartColors = [
  '#0ea5e9',
  '#14b8a6',
  '#f97316',
  '#8b5cf6',
  '#ef4444',
  '#eab308',
]

function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

function buildChartBackground(items) {
  if (items.length === 0) {
    return 'conic-gradient(#e2e8f0 0deg 360deg)'
  }

  let currentAngle = 0

  const segments = items.map((item) => {
    const nextAngle = currentAngle + item.share * 3.6
    const segment = `${item.color} ${currentAngle}deg ${nextAngle}deg`

    currentAngle = nextAngle
    return segment
  })

  return `conic-gradient(${segments.join(', ')})`
}

export default function Insights() {
  const role = useFinanceStore((state) => state.role)
  const transactions = useFinanceStore((state) => state.transactions)
  const userName = 'Aditya'

  const visibleTransactions =
    role === 'admin'
      ? transactions
      : transactions.filter((transaction) => transaction.user === userName)

  const expenseTransactions = visibleTransactions.filter(
    (transaction) => transaction.type === 'expense'
  )

  const totalExpenses = expenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )

  const categoryTotals = expenseTransactions.reduce((totals, transaction) => {
    totals[transaction.category] =
      (totals[transaction.category] || 0) + transaction.amount

    return totals
  }, {})

  const categoryBreakdown = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount], index) => ({
      category,
      amount,
      share: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      color: chartColors[index % chartColors.length],
    }))

  const highestSpendingCategory = categoryBreakdown[0]?.category || null
  const totalExpenseEntries = expenseTransactions.length
  const chartBackground = buildChartBackground(categoryBreakdown)

  return (
    <section className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_70px_-36px_rgba(15,23,42,0.38)] transition-colors duration-300 dark:border-slate-800/70 dark:bg-slate-900/75 dark:shadow-[0_30px_70px_-36px_rgba(2,6,23,0.85)] sm:p-8">
      <div className="absolute -left-16 top-10 h-32 w-32 rounded-full bg-sky-200/55 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Insights
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
            Spending Overview
          </h2>
        </div>

        <div className="inline-flex w-fit rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
          {totalExpenseEntries} expense entries
        </div>
      </div>

      <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
        <div className="float-slow rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 dark:shadow-[0_22px_45px_-30px_rgba(2,6,23,0.88)]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Expenses
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
            {formatCurrency(totalExpenses)}
          </p>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-rose-400 to-orange-300" />
        </div>

        <div className="float-delayed rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 dark:shadow-[0_22px_45px_-30px_rgba(2,6,23,0.88)]">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Highest Spending Category
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
            {highestSpendingCategory || 'No data'}
          </p>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-sky-500 to-cyan-300" />
        </div>
      </div>

      <div className="relative mt-5 rounded-[1.5rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#0f766e_100%)] px-5 py-4 text-sm font-medium text-slate-100 shadow-[0_24px_50px_-30px_rgba(15,23,42,0.7)]">
        {highestSpendingCategory
          ? `You are spending most on ${highestSpendingCategory}`
          : 'No expense insights available yet'}
      </div>

      <div className="relative mt-5 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 p-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/75">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Spending Categories
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Category Breakdown
            </h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {categoryBreakdown.length} categories
          </p>
        </div>

        {categoryBreakdown.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white/80 px-6 py-10 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-base font-semibold text-slate-700 dark:text-slate-100">
              No category data available
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Add expense transactions to see a breakdown of spending by
              category.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
            <div className="flex justify-center">
              <div
                className="relative h-52 w-52 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]"
                style={{ background: chartBackground }}
              >
                <div className="absolute inset-[22%] flex items-center justify-center rounded-full border border-white/70 bg-white/90 text-center shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/92">
                  <div className="px-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                      Total
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                      {formatCurrency(totalExpenses)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {categoryBreakdown.map((item) => (
                <div
                  key={item.category}
                  className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/78"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          {item.category}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {item.share}% of total expenses
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
