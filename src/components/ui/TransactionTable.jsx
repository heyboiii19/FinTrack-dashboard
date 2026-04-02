import { useState } from 'react'
import * as XLSX from 'xlsx'
import useFinanceStore from '../../store/useStore'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const receiptOptions = [
  { key: '7d', label: 'Past 7 Days', fileLabel: 'last-7-days' },
  { key: '30d', label: 'Past 30 Days', fileLabel: 'last-30-days' },
  { key: '3m', label: 'Past 3 Months', fileLabel: 'last-3-months' },
]

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatAmount(amount, type) {
  const sign = type === 'income' ? '+' : '-'

  return `${sign}${currencyFormatter.format(amount)}`
}

function startOfDay(value) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

function getPeriodStart(periodKey) {
  const today = startOfDay(new Date())

  if (periodKey === '7d') {
    today.setDate(today.getDate() - 6)
  }

  if (periodKey === '30d') {
    today.setDate(today.getDate() - 29)
  }

  if (periodKey === '3m') {
    today.setMonth(today.getMonth() - 3)
  }

  return today
}

export default function TransactionTable() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const role = useFinanceStore((state) => state.role)
  const transactions = useFinanceStore((state) => state.transactions)
  const category = useFinanceStore((state) => state.filters.category)
  const userName = 'Aditya'

  const roleBasedTransactions =
    role === 'admin'
      ? transactions
      : transactions.filter((transaction) => transaction.user === userName)

  const filteredTransactions =
    category === 'All'
      ? roleBasedTransactions
      : roleBasedTransactions.filter(
          (transaction) => transaction.category === category
        )

  const hasTransactions = roleBasedTransactions.length > 0
  const isFilterEmpty = hasTransactions && filteredTransactions.length === 0
  const emptyTitle = isFilterEmpty
    ? 'No matching transactions'
    : 'No transactions yet'
  const emptyMessage = isFilterEmpty
    ? `No transactions found for ${category}. Try a different filter.`
    : 'Transactions will appear here once activity is added.'
  const tableSummary =
    category === 'All'
      ? `${filteredTransactions.length} records`
      : `Filter: ${category}`

  function handleDownload(period) {
    const periodStart = getPeriodStart(period.key)

    const exportTransactions = filteredTransactions.filter((transaction) => {
      return startOfDay(transaction.date) >= periodStart
    })

    const rows = exportTransactions.map((transaction) => [
      formatDate(transaction.date),
      transaction.amount,
      transaction.category,
      transaction.type,
      transaction.user,
    ])

    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Date', 'Amount', 'Category', 'Type', 'User'],
      ...rows,
    ])

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions')

    XLSX.writeFile(workbook, `fintrack-receipt-${period.fileLabel}.xlsx`)
    setIsDownloadOpen(false)
  }

  return (
    <section className="glass-panel overflow-hidden rounded-[2rem] border border-white/70 bg-white/82 shadow-[0_30px_70px_-36px_rgba(15,23,42,0.38)]">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">Transactions</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Recent Activity
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Browse the latest income and expense entries with role-aware
              visibility and category filtering.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="inline-flex w-fit rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
              {tableSummary}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDownloadOpen((open) => !open)}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_35px_-20px_rgba(8,145,178,0.9)] transition duration-300 hover:-translate-y-0.5 hover:from-sky-500 hover:to-cyan-500"
              >
                Download Receipt
              </button>

              {isDownloadOpen ? (
                <div className="absolute right-0 z-10 mt-3 w-52 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]">
                  {receiptOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleDownload(option)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="px-5 py-14 sm:px-6">
          <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 px-6 py-10 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-700">{emptyTitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {emptyMessage}
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/95 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-5 py-4 sm:px-6">Date</th>
                <th className="px-5 py-4 sm:px-6">Amount</th>
                <th className="px-5 py-4 sm:px-6">Category</th>
                <th className="px-5 py-4 sm:px-6">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="odd:bg-white even:bg-slate-50/70 transition-colors duration-300 ease-out hover:bg-sky-50/90"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700 sm:px-6">
                    {formatDate(transaction.date)}
                  </td>
                  <td
                    className={`whitespace-nowrap px-5 py-4 font-semibold tabular-nums sm:px-6 ${
                      transaction.type === 'income'
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 capitalize sm:px-6">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                        transaction.type === 'income'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
