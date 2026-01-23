import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, InfoIcon, FolderOpenDotIcon, Contact, Home, FileQuestionMarkIcon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", objImg: Home },
  { href: "/About", label: "About", objImg: InfoIcon },
  { href: "/Projects", label: "Projects", objImg: FolderOpenDotIcon },
  { href: "/Contact", label: "Contact", objImg: Contact },
  { href: "/FAQ", label: "FAQ", objImg: FileQuestionMarkIcon },
];

export const GridBar = () => {
  return (
    <>
      <nav className="md:hidden">
        <div className="py-10 h-full">
          <div className="flex justify-between">
            <div className="flex grid grid-cols-3 gap-2">
              {navLinks.map(link => {
              const Icon = link.objImg
              return (
                <NavLink key={link.href} to={link.href} className="flex flex-col text-center gap-2 font-medium text-cyan-600 dark:text-white px-3 py-2 hover:font-bold hover:scale-150">
                  <div className="dark:bg-emerald-700 p-3 rounded-xl flex items-center justify-center transition-shadow-sm">
                    <Icon size={34} />
                  </div>
                  <span>{link.label}</span>
                </NavLink>
              )})}
            </div>
          </div>
        </div>
      </nav>

      <nav className="hidden md:block">
        <div className="flex px-4 py-10">
          <div className="flex flex-col items-center justify-between h-full">
            <div className="grid grid-flow-col grid-cols-5 gap-10">
              {navLinks.map(link => {
              const Icon = link.objImg
              return (
                <NavLink key={link.href} to={link.href} className="flex flex-col items-center gap-2 font-medium text-gray-900 dark:text-white px-3 py-2 hover:font-bold hover:scale-150 hover:text-cyan-600 dark:hover:text-emerald-600">
                  <div className="p-3 rounded-xl flex items-center justify-center transition-shadow-sm">
                    <Icon size={34} />
                  </div>
                  <span>{link.label}</span>
                </NavLink>
              )})}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const activeLink = navLinks.find(l => l.href === location.pathname)

  return (
    <>
      <nav className="flex items-center md:hidden">
        <button onClick={() => setOpen(true)}>
          <Menu className="w-7 mb-3 text-cyan-600 dark:text-white" />
        </button>

        <h1 className="text-xl mb-4 font-bold dark:text-emerald-600">
          {activeLink ? activeLink.label : "Menu"}
        </h1>

        <div className="w-7" />
      </nav>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)}/>
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-linear-to-b dark:from-black dark:to-gray-900 dark:text-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Navigation</h2>

          <div className="flex flex-col gap-5">
            {navLinks.map(link => {
              const Icon = link.objImg
              return (
                <NavLink key={link.href} to={link.href} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-4 px-3 py-2 text-lg rounded-md transition ${isActive ? "dark:text-emerald-600 font-bold" : "dark:hover:text-emerald-300"}`}>
                  <Icon size={26} />
                  {link.label}
                </NavLink>
              )
            })}
          </div>
        </div>
      </aside>

      <nav className="hidden md:block">
        <div className="px-4">
          <div className="flex grid-cols-6 gap-4 items-center justify-between h-full">
            {navLinks.map(link => (
              <NavLink key={link.href} to={link.href} className={({ isActive }) =>`flex flex-col items-center gap-2 mb-4 px-3 py-2 ${isActive ? "font-bold text-cyan-600 dark:text-emerald-600":"font-bold hover:text-cyan-600 dark:hover:text-emerald-600"}`}>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
