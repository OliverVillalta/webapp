import { useState, useRef, useEffect } from "react";

interface DropdownBoxProps {
    title: string;
    children: string[];
}

export const Dropdownbox = ({ title, children }: DropdownBoxProps) => {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState("0px");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [open]);

    return (
        <div className="bg-cyan-500 dark:bg-emerald-600 rounded-lg p-1 mb-5 shadow-xl">
            <button className="w-full flex justify-between items-center" onClick={() => setOpen(!open)}>
                <span className="dark:text-white text-lg font-semibold px-1 py-2">{title}</span>
                <span>{open ? "▲" : "▼"}</span>
            </button>
            <div ref={contentRef} style={{ height }} className="bg-rose-100 dark:bg-slate-900 rounded-b-lg overflow-hidden transition-all duration-300">
                <ul className="list-disc pl-7 mt-2 text-slate-900 dark:text-white"> {children.map((item, i) => (<li className="py-1" key={i}>{item}</li>))} </ul>
            </div>
        </div>
    );
};

