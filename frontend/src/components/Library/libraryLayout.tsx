import { Outlet } from "react-router-dom";
import LibrarySideBar from "./librarySideBar";

function LibraryLayout() {
  return (
    <>
      <LibrarySideBar />
      <div className="ml-14 dark:bg-dark-primary bg-gray-100">
        <Outlet />
      </div>
    </>
  );
}

export default LibraryLayout;
