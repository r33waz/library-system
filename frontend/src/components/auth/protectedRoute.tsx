import { ROLES } from "@/data/enum";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { authorizeThunk, me } from "@/rtk/thunk/auth.thunk";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PageLoading } from "../common/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const roleDefaultRoute: Record<ROLES, string> = {
  [ROLES.SUDO_ADMIN]: "/admin/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.LIBRARY_ADMIN]: "/library/dashboard",
  [ROLES.LIBRARY_EMP]: "/library/dashboard",
  [ROLES.USER]: "/e-book/home",
  [ROLES.STUDENT]: "/e-book/home",
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading, isUserLoading, isAuthChecked } =
    useAppSelector((state) => state.auth);
  console.log("🚀 ~ ProtectedRoute ~ user:", user);
  console.log("🚀 ~ ProtectedRoute ~ user.role:", user?.role);
  console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated);

  // Normalize role to uppercase to match enum
  const normalizedRole = user?.role?.toUpperCase() as ROLES;
  console.log("🚀 ~ ProtectedRoute ~ normalizedRole:", normalizedRole);
  console.log("🚀 ~ ProtectedRoute ~ user.role:", user?.role);
  console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname;

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    dispatch(authorizeThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(me());
    }
  }, [dispatch, isAuthenticated]);

  /* ---------------- LOADING ---------------- */
  if (!isAuthChecked || isLoading || isUserLoading) {
    return <PageLoading />;
  }

  /* ---------------- PUBLIC ROUTES ---------------- */
  const isAuthRoute =
    path.startsWith("/auth/login") || path.startsWith("/auth/register");

  if (isAuthRoute) {
    if (isAuthenticated && user) {
      return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
    }
    return <>{children}</>;
  }

  /* ---------------- NOT AUTHENTICATED ---------------- */
  if (!isAuthenticated || !user || !user.role) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  /* ---------------- ROLE-BASED ACCESS ---------------- */
  const isAdminRoute = path.startsWith("/admin");
  const isLibraryRoute = path.startsWith("/library");
  const isUserRoute = !isAdminRoute && !isLibraryRoute;

  if (isAdminRoute && normalizedRole !== ROLES.SUDO_ADMIN) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  if (
    isLibraryRoute &&
    ![ROLES.LIBRARY_ADMIN, ROLES.LIBRARY_EMP].includes(normalizedRole)
  ) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  // Additional restrictions
  // USER cannot access admin or library routes
  if (normalizedRole === ROLES.USER && (isAdminRoute || isLibraryRoute)) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  // SUDO_ADMIN cannot access user or library routes
  if (normalizedRole === ROLES.SUDO_ADMIN && (isUserRoute || isLibraryRoute)) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  // LIBRARY_ADMIN and LIBRARY_EMP cannot access user or admin routes
  if (
    [ROLES.LIBRARY_ADMIN, ROLES.LIBRARY_EMP].includes(normalizedRole) &&
    (isUserRoute || isAdminRoute)
  ) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  // Handle ADMIN and STUDENT similarly
  if (normalizedRole === ROLES.ADMIN && (isUserRoute || isLibraryRoute)) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  if (normalizedRole === ROLES.STUDENT && (isAdminRoute || isLibraryRoute)) {
    return <Navigate to={roleDefaultRoute[normalizedRole]} replace />;
  }

  /* ---------------- VALID ACCESS ---------------- */
  return <>{children}</>;
};

export default ProtectedRoute;
