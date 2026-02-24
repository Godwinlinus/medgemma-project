const MainLayout = ({ left, right }) => (
  <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-80px)] overflow-hidden">
    <section className="lg:col-span-7 flex flex-col gap-4 overflow-hidden">
      {left}
    </section>
    <section className="lg:col-span-5 flex flex-col gap-4 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-slate-100 dark:scrollbar-track-slate-800 p-2">
      {right}
    </section>
  </main>
);

export default MainLayout;
