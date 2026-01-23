import { Navbar } from "../../../components/NavTools";
import { DarkModeToggle } from "../../../components/ViewMode";
import catemail from "../../../assets/emailcat.jpg";

export default function About() {
  return (
    <main className="h-screen overflow-hidden bg-linear-to-b from-white to-rose-100 dark:from-black dark:to-gray-900 flex items-center justify-center">
      <DarkModeToggle className="absolute top-4 right-4"/>
      <div className="shadow-xl dark:border-2 dark:border-white max-w-2xl w-full mx-4 rounded-xl p-6">
        <header className="flex items-center text-slate-900 dark:text-white text-xl dark:border-b-2 h-8 sticky top-0 bg-transparent">
          <Navbar />
        </header>

        <article className="h-[70vh] mt-6 text-slate-900 font-semibold dark:text-white mx-4 overflow-y-auto no-scrollbar">
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