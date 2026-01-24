import { GridBar } from "../../../components/NavTools.tsx";
import { DarkModeToggle } from "../../../components/ViewMode.tsx";

export default function Home() {
  return (
    <>
    <div className="hidden md:block"><DarkModeToggle className="absolute top-4 right-4"/></div>
      <main className="min-h-screen overflow-y-auto bg-gradient-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center p-4">
        <div className="border-2 w-full lg:w-[50%] max-w-2xl rounded-xl p-6 border-cyan-600 dark:border-white dark:bg-black/40 shadow-xl">
          
          <header className="flex justify-between items-center text-xl md:h-8 pb-2">
            <h1 className="text-cyan-600 dark:text-emerald-600 font-bold">Home</h1>
            <h1 className="md:hidden"><DarkModeToggle/></h1>
          </header>

          <hr className="dark:border dark:border-white" />

          <section className="text-center text-slate-900 dark:text-white">
            <h2 className="text-2xl sm:text-3xl font-bold pt-5">
              Hi! I'm <span className="text-cyan-600 dark:text-emerald-600">Oliver Villalta</span>
            </h2>
            <p className="text-base sm:text-lg mt-2">Python/C++ Developer</p>
          </section>

          <nav className="flex justify-center mt-4">
            <GridBar />
          </nav>
        </div>
      </main>
    </>
  );
};




