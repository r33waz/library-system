import LibEmpProfileComp from "@/components/Library/libEmpProfileComp";
import LibProfileComp from "@/components/Library/libProfileComp";
import { ROLES } from "@/data/enum";
import { useAppSelector } from "@/hooks/hooks";
import { useParams } from "react-router-dom";

export function AdminLibraryProfile() {
  const { id } = useParams();
  return <LibProfileComp id={id as string} />;
}

export function EmployeeLibraryProfile() {
  const { id } = useParams();
  return <LibEmpProfileComp id={id as string} />;
}

export default function LibraryProfileRouter() {
  const { userDeatails } = useAppSelector((state) => state.auth);
  const isAdmin = userDeatails?.role === ROLES.LIBRARY_ADMIN;

  return isAdmin ? <AdminLibraryProfile /> : <EmployeeLibraryProfile />;
}
