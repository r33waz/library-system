import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/auth/protectedRoute";
import LibraryLayout from "./components/Library/libraryLayout";
import UserLayout from "./components/user/userLayout";
import { useAppDispatch } from "./hooks/hooks";
import { authorizeThunk } from "./rtk/thunk/auth.thunk";
const AdminLayout = lazy(() => import("./pages/admin/admin"));
const LoginPage = lazy(() => import("./pages/auth/login"));
const RegisterPage = lazy(() => import("./pages/auth/register"));
const LibraryDashboard = lazy(() => import("./pages/library/libDashboard"));
const LibProfile = lazy(() => import("./pages/library/libProfile"));
// const LibraryEmpProfile = lazy(() => import("./pages/library/libraryEmpProfile"));
const LibraryBoooks = lazy(() => import("./pages/library/libraryBoooks"));
const AboutPage = lazy(() => import("./pages/user/about"));
const BooksPage = lazy(() => import("./pages/user/books"));
const BorrowHistory = lazy(() => import("./pages/user/borrowHistory"));
const ContactPage = lazy(() => import("./pages/user/contact"));
const HomePage = lazy(() => import("./pages/user/home"));
const UserProfile = lazy(() => import("./pages/user/profile"));
const SingleBook = lazy(() => import("./pages/user/sinngleBook"));
const Wishlist = lazy(() => import("./pages/user/wishlist"));
const SingleLibrary = lazy(() => import("./pages/user/singleLibrary"));


// Components
const Admin = lazy(() => import("./components/admin/admin"));
const Auth = lazy(() => import("./components/auth/auth"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authorizeThunk());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute></ProtectedRoute>} />
        <Route
          path="/auth"
          element={
            <ProtectedRoute>
              <Auth />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Admin />} />
        </Route>

        {/* library routes  */}
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <LibraryLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<LibraryDashboard />} />
          <Route path="profile/:id" element={<LibProfile />} />
          {/* <Route path="employee/profile/:id" element={<LibraryEmpProfile />} /> */}
          <Route path="employees" element={<LibraryDashboard />} />
          <Route path="borrow" element={<LibraryDashboard />} />
          <Route path="borrow-requests" element={<LibraryDashboard />} />
          <Route path="books" element={<LibraryBoooks />} />
        </Route>

        <Route
          path="/e-book"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path=":id" element={<SingleBook />} />
          <Route path="genre/:slug" element={<HomePage />} />
          <Route path="category/:slug" element={<HomePage />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/wishlist" element={<Wishlist />} />
          <Route path="user/borrow-history" element={<BorrowHistory />} />
          <Route path="library/:id" element={<SingleLibrary />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
