import { useEffect } from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import { Router } from "./router/Router";
import Layout from "./pages/Layout";

const TitleUpdate = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/" : "Blog-WebApp",
      "/detail": "Blog - Detail",
      "/about": "Blog - About",
      "/account": "Blog - Account"
    };
    document.title = titles[location.pathname] || "Blog-WebApp";
  },[location]);
  return null;
}
function App() {
  return (
    <div className={"h-screen w-full max-h-screen max-w-full overflow-y-auto"}>
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
      </Routes>
    </div>
  );
}

export default App;
