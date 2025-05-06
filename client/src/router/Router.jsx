import Home from "../pages/Home/index";
import Detail from "../pages/Detail/index";
import About from "../pages/About/index";
import Account from "../pages/Account/index";
import Contact from "../pages/Contact";

export const Router = [
    {path: "/", name: "Home", element: <Home />},
    {path: "/detail/:id", name: "Detail", element: <Detail />},
    {path: "/about", name: "About", element: <About />},
    {path: "/contact", name: "Contact", element: <Contact />},
    {path: "/account", name: "Account", element: <Account />}
];
