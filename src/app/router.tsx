import { createBrowserRouter } from "react-router-dom";
import App from './App.tsx';
import Home  from './pages/home/Home.tsx';
import About  from './pages/about/About.tsx';
import Contact from './pages/contact/Contact.tsx';
import Faq from './pages/faq/Faq.tsx';
import Project from './pages/projects/Project.tsx';
import ErrorPage from './pages/404.tsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [{path:"", element: <Home />}, {path:"/About", element:<About/>}, {path:"/Contact", element:<Contact/>}, {path:"/Faq", element:<Faq/>}, {path:"/Projects", element:<Project/>}],
    }
])