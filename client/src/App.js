import { useEffect } from "react";
import {Route, Routes, useLocation} from "react-router";
import { RouteLogin, Router, RouteRegister } from "./router/Router";
import Layout from "./pages/Layout";

const TitleUpdate = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/" : "Blog-WebApp",
      "/detail": "Blog - Detail",
      "/about": "Blog - About",
      "/profile": "Blog - Profile",
      "/contact": "Blog - Contact",
      "/login": "Blog - Login",
      "/register": "Blog - Register",
      "/category": "Blog - Category",
    };
    document.title = titles[location.pathname] || "Blog-WebApp";
  },[location]);
  return null;
}
function App() {
  return (
    <div className={"h-screen w-full max-h-screen max-w-full overflow-y-auto"}>
     <TitleUpdate />
      <Routes>
        
        <Route element={<Layout />}>
          {
            Router.map((route) => {
              return(
                <Route 
                  key={route.name}
                  path={route.path}
                  element={route.element}
                />
              )
            })
          }
        </Route>
        <Route key={RouteLogin.name}
          path={RouteLogin.path}
          element={RouteLogin.element}
        />
        <Route key={RouteRegister.name}
          path={RouteRegister.path}
          element={RouteRegister.element}
        />

      </Routes>
    </div>
  );
}

export default App;
