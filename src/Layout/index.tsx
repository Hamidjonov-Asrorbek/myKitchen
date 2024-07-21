import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main className="my-5">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
