import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
export default function Layout() {
  return (
    <div>
      <Header />
      <div
        className={"flex-1 container flex justify-center items-center mx-auto"}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
