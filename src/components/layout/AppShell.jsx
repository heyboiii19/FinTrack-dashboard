export default function AppShell({ children }) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <section className="mx-auto min-h-[calc(100vh-5rem)] max-w-6xl rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        {children}
      </section>
    </main>
  )
}
