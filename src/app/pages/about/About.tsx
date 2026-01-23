import { Navbar } from "../../../components/NavTools";
import { DarkModeToggle } from "../../../components/ViewMode";
import catpfp from "../../../assets/catpfp.jpg";

export default function About() {
  return (
    <main className="h-screen overflow-hidden bg-linear-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center">
      <DarkModeToggle className="absolute top-4 right-4"/>
      <div className="dark:border-2 shadow-xl dark:border-white max-w-2xl w-full mx-4 rounded-xl p-6">
        <header className="flex items-center text-slate-900 dark:text-white text-xl dark:border-b-2 h-8 sticky top-0 dark:bg-transparent">
          <Navbar />
        </header>

        <article className="h-[70vh] mt-6 text-slate-900 dark:text-white mx-4 overflow-y-auto no-scrollbar hover:cursor-default">
          <section className="mt-2 text-center">
            <figure className="flex items-center justify-center">
              <img className="rounded-full object-cover shadow-xl hover:outline-2 hover:outline-cyan-600 dark:outline-2 dark:outline-white dark:hover:outline-green-600" src={catpfp}/>
            </figure>

            <h1 className="text-3xl font-bold mt-3">
              Hello! I'm <span className="text-cyan-600 dark:text-emerald-300">Oliver Villalta</span>
            </h1>
            <p className="text-md">US-based Developer</p>
            <p className="text-md">Former AI/ML researcher at <a className="text-cyan-500 dark:text-emerald-600 font-bold"href="https://run-gslsamp-site.vercel.app/">GS LSAMP</a></p>
            <hr className="mt-3 white"></hr>
            <p className="mt-2 text-md text-left">Hey there! I'm Oliver, a software AI/ML developer. I...</p>
            <ul className="mt-2 list-disc pl-5 text-left">
              <li>Work on creating machine learning algorithms using PyTorch</li>
              <li>Create APIs and microservices</li>
              <li>Analyze large swaths of data and provide visualizations</li>
              <li>Have worked as a teaching assistant in college, a lab technician in a biologics lab, and undergraduate researcher</li>
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-3xl font-bold">EDUCATION</h2>
            <div className="mt-2 p-3 border-l-4 border-cyan-600 dark:border-white">
              <h3 className="text-xl">Bachelor of Science in Computer Science</h3>
              <p className="text-medium text-cyan-500 dark:text-emerald-500">Graduated 2025</p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-3xl font-bold">TECHNICAL SKILLS</h2>
            <div className="text-center mt-6">
              <h3 className="text-xl mb-2 text-shadow-md">Programming Languages</h3> 
              {/* Say what you wish, but this is what peak programming looks like
                  I came back to this and I regret it...*/}
              <div className="p-2 h-20 text-white dark:border dark:border-white rounded-xl grid grid-cols-3 gap-3">
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">Python</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">C++</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">Java</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">JavaScript</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">MySQL</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">HTML5 + CSS</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-center text-xl mb-2 text-shadow-md">Tools</h3>
              <div className="p-2 h-12 text-white dark:border dark:border-white rounded-xl grid grid-cols-3 gap-3">
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">React</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">PostgreSQL</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">AWS</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-center text-xl mb-2 text-shadow-md">Concepts</h3>
              <div className="p-2 h-20 text-white dark:border dark:border-white rounded-xl grid grid-cols-3 gap-3">
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">OOP Principles</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">Agile Methdology</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">RESTful API</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">Cloud Computing</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">Machine Learning</p>
                <p className="shadow-xl bg-cyan-600 dark:bg-emerald-600 rounded-full mx-4 text-bold">Data Analytics</p>
              </div>
            </div>
          </section>
          <section className="mt-8">
             <h2 className="text-3xl font-bold">OTHER INTERESTS</h2>
              <ul className="mt-2 list-disc pl-5 text-left">
                <li>Game development</li>
                <li>Keeping up to date with Astronomy news</li>
                <li>Music like hip-pop, rock, rap, classical and video game music!</li>
                <li>Reading! Anything from fantasy to comics to quantum mechanics</li>
                <li>Strategy, puzzle, and horror games! Especially ones with co-op ^.^</li>
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-3xl font-bold">LANGUAGE PROFICIENCY</h2>
              <div className="mt-2 p-3 border-l-4 border-cyan-600 dark:border-white">
                <h3 className="text-xl">Native fluency in <span className="text-cyan-600 dark:text-emerald-600">English</span> and <span className="text-cyan-600 dark:text-emerald-600">Spanish/Español (Salvadoreño)</span></h3>
                <p className="text-sm">I speak a little bit of <span className="text-cyan-600 dark:text-emerald-600">Chinese/中文 </span>but at an elementary level.</p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};