import { NavLink } from "react-router-dom";
import { DarkModeToggle } from "../../components/ViewMode";
import catconfusion from "../../assets/catconfusion.png";

export default function ErrorPage () {
    return(
    <>
        <DarkModeToggle className="absolute top-4 right-4"/>
        <main className="h-screen overflow-hidden bg-linear-to-b from-white to-rose-200 dark:from-black dark:to-gray-900 flex items-center justify-center">
                <figure className="hidden md:block pl-5 flex items-center justify-center">
                    <img className="rounded-full object-cover shadow-xl hover:outline-2 hover:outline-cyan-600 dark:outline-2 dark:outline-white hover:outline-cyan-600 dark:hover:outline-green-600" src={catconfusion}/>
                </figure>
                <div className="hidden md:block flex items-center flex-col text-slate-900 dark:text-emerald-600 px-10">
                    <h1 className="text-7xl font-bold text-center">404 Error</h1>
                    <p className="text-2xl dark:text-white">Woah! You've followed a link that doesn't exist! Please check your link for any spelling errors.</p>
                    <p className="text-2xl dark:text-white mt-20">Otherwise, click <span className="underline font-bold text-cyan-600 dark:text-emerald-600 hover:cursor-pointer"><NavLink key="/" to="/">here</NavLink></span> to go back home!</p>
                </div>


            <div className="md:hidden">
                <figure className="pl-5 flex items-center justify-center">
                    <img className="w-40 rounded-full shadow-xl hover:outline-2 hover:outline-cyan-600 dark:outline-2 dark:outline-white hover:outline-cyan-600 dark:hover:outline-green-600" src={catconfusion}/>
                </figure>
                <div className="flex items-center text-wrap flex-col text-slate-900 dark:text-emerald-600 px-10">
                    <h1 className="text-8xl font-bold text-center">404 Error</h1>
                    <p className="text-2xl dark:text-white">Woah! You've followed a link that doesn't exist! Please check your link for any spelling errors.</p>
                    <p className="text-2xl dark:text-white mt-10">Otherwise, tap the button below to go back home!</p>
                    <button className="p-2 bg-cyan-600 dark:bg-emerald-600 text-white rounded-lg text-2xl hover:cursor-pointer hover:scale-[105%] mt-10">
                        <NavLink key="/" to="/">
                            Home
                        </NavLink>
                    </button>
                </div>
            </div>
        </main>
    </>
    );
};