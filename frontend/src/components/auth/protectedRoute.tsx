import { ROLES } from "@/data/enum";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { authorizeThunk, me } from "@/rtk/thunk/auth.thunk";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PageLoading } from "../common/loading";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading, isUserLoading, isAuthChecked } =
    useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();



  const path = location.pathname;

  useEffect(() => {
    dispatch(authorizeThunk());
    if (isAuthenticated) {
      dispatch(me());
    }
  }, [dispatch, isAuthenticated]);

  // Show loader until auth status is confirmed
  if (!isAuthChecked || isLoading || isUserLoading) {
    return <PageLoading />;
  }

  // Allow public routes
  if (location.pathname.startsWith("/auth/login") || location.pathname.startsWith("/auth/register")) {
    if (isAuthenticated) {
      if (user?.role === ROLES.SUDO_ADMIN) return <Navigate to="/admin/dashboard" />;
      if (user?.role === ROLES.LIBRARY_ADMIN || user?.role === ROLES.LIBRARY_EMP)
        return <Navigate to="/library/dashboard" />;
      return <Navigate to="/e-book/home" />;
    }
    return <>{children}</>;
  }

   if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Role-based restrictions
  if (path.startsWith("/admin") && user?.role !== ROLES.SUDO_ADMIN) {
    return <Navigate to="/e-book/home" replace />;
  }

  if (path.startsWith("/library") && !(user?.role === ROLES.LIBRARY_ADMIN || user?.role === ROLES.LIBRARY_EMP)) {
    return <Navigate to="/e-book/home" replace />;
  }

  if (path.startsWith("/e-book") && user?.role !== "" && user?.role !== undefined) {
    // Only normal users can access /e-book
    return <Navigate to="/library/dashboard" replace />; // redirect library users or admin away
  }


  return <>{children}</>;
};

export default ProtectedRoute;
