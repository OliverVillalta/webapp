import { Navbar } from "../../../components/NavTools";
import { DarkModeToggle } from "../../../components/ViewMode";
import catemail from "../../../assets/emailcat.jpg";

export default function About() {
  return (
    <main className="overflow-hidden h-screen bg-linear-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center">
      <div className="hidden md:block"><DarkModeToggle className="absolute top-4 right-4"/></div>
      <div className="md:shadow-xl md:dark:border-2 md:dark:border-white md:w-7/10 mx-4 rounded-xl md:p-6">
        <header className="flex justify-between items-center text-slate-900 dark:text-white text-xl dark:border-b-2 md:h-8 sticky bg-transparent">
          <Navbar />
          <div className="md:hidden"><DarkModeToggle/></div>
        </header>

        <article className="h-[90vh] md:h-[70vh] text-slate-900 font-semibold dark:text-white mx-4 overflow-y-auto no-scrollbar">
            <section className="mt-2 text-center">
                <h1 className="text-2xl font-bold mt-3">
                    My inbox hungers!
                </h1>
                <figure className="mt-5 flex items-center justify-center">
                  <img className="rounded-full object-cover shadow-xl hover:outline-2 hover:outline-cyan-600 dark:outline-2 dark:outline-white hover:outline-cyan-600 dark:hover:outline-green-600" src={catemail}/>
                </figure>
                <div className="mt-4">
                    <p>The fastest way to get a response from me is through email! I don't use social media- so no insta, twitter, or facebook. So please direct any questions or comments to my email.</p>
                </div>
                <section className="mt-5">
                    <p>Email: oliverjvillaltap15@gmail.com</p>
                </section>
            </section>
        </article>
      </div>
    </main>
  );
}