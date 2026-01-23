import { GridBar } from "../../../components/NavTools.tsx";
import { DarkModeToggle } from "../../../components/ViewMode.tsx";

export default function Home() {
  return (
    <>
      <DarkModeToggle className="absolute top-4 right-4 z-10"/>
      <main className="min-h-screen overflow-y-auto bg-gradient-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center p-4">
        <div className="border-2 w-full lg:w-[50%] max-w-2xl rounded-xl p-6 border-cyan-600 dark:border-white dark:bg-black/40 shadow-xl">
          
          <header className="flex items-center text-xl h-8 mb-4">
            <h1 className="text-cyan-600 dark:text-emerald-500 font-bold">Home</h1>
          </header>

          <hr className="dark:border dark:border-white" />

          <section className="text-center text-slate-900 dark:text-white">
            <h2 className="text-2xl sm:text-3xl font-bold pt-10">
              Hi! I'm <span className="text-cyan-600 dark:text-emerald-600">Oliver Villalta</span>
            </h2>
            <p className="text-base sm:text-lg mt-2">Python/C++ Developer</p>
          </section>

          <nav className="flex justify-center mt-8">
            <GridBar />
          </nav>
        </div>
      </main>
    </>
  );
};




