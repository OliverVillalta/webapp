import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react';
import App from './App.tsx';
import Home  from './pages/home/Home.tsx';
import About  from './pages/about/About.tsx';
import Contact from './pages/contact/Contact.tsx';
import Faq from './pages/faq/Faq.tsx';
import Project from './pages/projects/Project.tsx';
import ErrorPage from './pages/404.tsx';


const MTATracker = lazy(() => import('./pages/projects/transit/Index.tsx'));

const Loader = () => <div className="p-10 text-center">Loading Module...</div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:"", 
                element: <Home />
            }, 
            {
                path:"/About", 
                element:<About/>
            }, 
            {
                path:"/Contact", 
                element:<Contact/>
            }, 
            {
                path:"/Faq", 
                element:<Faq/>
            }, 
            {
                path:"/Projects", 
                element:<Project/>
            }, 
            {
                path:"/Projects/Transit", 
                element: (<Suspense fallback={<Loader/>}><MTATracker /></Suspense>),
            } 
        ],
    }
])