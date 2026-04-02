import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const sampleTransactions = [
  {
    id: 1,
    date: '2026-03-28',
    amount: 4200,
    category: 'Salary',
    type: 'income',
    user: 'Aditya',
  },
  {
    id: 2,
    date: '2026-03-29',
    amount: 180,
    category: 'Food',
    type: 'expense',
    user: 'Aditya',
  },
  {
    id: 3,
    date: '2026-03-30',
    amount: 950,
    category: 'Freelance',
    type: 'income',
    user: 'Riya',
  },
  {
    id: 4,
    date: '2026-03-31',
    amount: 320,
    category: 'Transport',
    type: 'expense',
    user: 'Riya',
  },
  {
    id: 5,
    date: '2026-04-01',
    amount: 125,
    category: 'Shopping',
    type: 'expense',
    user: 'Aditya',
  },
]

const useFinanceStore = create(
  persist(
    (set) => ({
      role: 'admin',
      transactions: sampleTransactions,
      filters: {
        category: 'All',
      },
      setRole: (role) => set({ role }),
      setFilter: (category) =>
        set((state) => ({
          filters: {
            ...state.filters,
            category,
          },
        })),
    }),
    {
      name: 'fintrack-store',
      partialize: (state) => ({
        transactions: state.transactions,
      }),
    }
  )
)

export default useFinanceStore
