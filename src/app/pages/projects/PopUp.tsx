import { useState } from 'react';
import { Github } from 'lucide-react';

interface PopUpProps {
    title: string;
    content: string;
    tags: string[];
    image: string;
    link: string; 
}

export const PopUp = ({ title, content, tags, image, link }: PopUpProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <main>
            <div className="dark:bg-emerald-700 dark:text-white rounded-lg p-4 shadow-md cursor-pointer hover:scale-105" onClick={() => setOpen(true)}>
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="dark:bg-emerald-900 px-2 py-1 rounded text-xs">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="rounded-lg shadow-xl w-[90%] max-w-2xl h-[90%] flex flex-col animate-fadeIn overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500 dark:scrollbar-thumb-slate-600 bg-rose-100 dark:bg-slate-900 dark:text-white">
                        <div className="h-64 w-full">
                            <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover"/>
                        </div> 
                        <div className="px-5 mt-4 flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span key={i} className="shadow-md border-1 dark:bg-emerald-800 px-2 py-1 rounded text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="px-5 py-4">
                            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                            <p className="dark:text-gray-300 leading-relaxed">{content}</p>
                        </div>
                        <div className="mt-auto flex flex-col justify-center px-[35%] pb-6">
                            <button onClick={() => window.open(link, '_blank', 'noopener,noreferrer')} className="font-semibold shadow-md dark:bg-emerald-800 rounded-xl h-10 mb-2 hover:font-bold hover:cursor-pointer"><Github className="inline h-5 pb-1"/> See more on github</button>
                            <button onClick={() => setOpen(false)} className="transition underline font-semibold hover:font-bold hover:cursor-pointer">Go back to projects</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};
