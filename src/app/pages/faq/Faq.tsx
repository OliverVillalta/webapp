import { Navbar } from "../../../components/NavTools";
import { DarkModeToggle } from "../../../components/ViewMode";
import { Dropdownbox } from "./DropdownBox";
import { FileQuestionIcon } from "lucide-react";

export default function Faq() {
  return (
    <main className="overflow-hidden h-screen bg-linear-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center">
      <div className="hidden md:block"><DarkModeToggle className="absolute top-4 right-4"/></div>
      <div className="md:shadow-xl md:dark:border-2 md:dark:border-white md:w-8/10 mx-4 rounded-xl md:p-6">
        <header className="flex justify-between items-center text-slate-900 dark:text-white text-xl dark:border-b-2 md:h-8 sticky bg-transparent">
          <Navbar />
          <div className="md:hidden"><DarkModeToggle/></div>
        </header>

        <article className="h-[90vh] md:h-[70vh] dark:text-white md:mx-4 overflow-y-auto no-scrollbar">
            <section>
                <h1 className="flex gap-4 text-2xl font-bold mt-3">
                    <FileQuestionIcon className="mt-1" size={28}/> 
                    <p>Frequently Asked Questions</p>
                </h1>
                <div className="mt-4">
                    <Dropdownbox title="What areas of computer science do you specialize in?" children={["Backend Development", "AI/ML Research", "Data Analytics"]}/>
                    <Dropdownbox title="What programming languages do you use the most?" children={["Python - The one I use most by far for everything from machine learning to connecting to AWS (via boto3) and data analytics", "C++ - Using for game development and low-level programming", "Java - I use java to create microservices using tools such as SpringBoot", "JavaScript/TypeScript - I use exclusively to build websites (like this one! ^.^)"]}/>
                    <Dropdownbox title="What experience do you have with AI/ML?" children={["I have done model training for Random Forest, Linear Regression, Support Vector Machines, XGBoosting and more!", "Utilized PyTorch to create hybrid Graph Convolution Network and Graph Attention Network model for biomedical data", "Work on exploratory data analysis (EDA) and data preprocessing for datasets exceeding 1 million+ rows"]}/>
                    <Dropdownbox title="Are you open to relocation or remote work?" children={["I am open to relocating for in-person and hybrid roles", "I am open to remote work as well!"]}/>
                    <Dropdownbox title="Do you have work authorization in the United States?" children={["Yes! I am a US citizen, born and raised in the NYC metropolitan area."]}/>
                    <Dropdownbox title="What industries are you targeting?" children={["Healthcare", "Biomedical", "Technology", "Finance", "Energy"]}/>
                    <Dropdownbox title="What is your preferred tech stack?" children={["For Data Science: Python, PyTorch, Sklearn, Matplotlib, Seaborn, Pandas, Numpy, Visual Studio Code", "For Web Dev: React, TailWindCSS, JavaScript + TypeScript, Django, AWS, PostgreSQL, Oracle DBMS, Visual Studio Code", "For Game-Dev/Graphics: C++, VCPKG, CMake, Visual Studio 2022, Windows OS, OpenGL, SDL3, LibreSprite"]}/>
                </div>
            </section>
        </article>
      </div>
    </main>
  );
};