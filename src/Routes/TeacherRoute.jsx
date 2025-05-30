import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useRole } from "../Hooks/useRole";
import { Loading } from "../components/Shared/Loading";

const TeacherRoute = ({ children}) => {
  const { user, loading} = useAuth();
  const [userRole, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loading />;
  if (user && userRole.isTeacher) return children;

  return <Navigate to="/dashboard" state={location.pathname} />;
};

export default TeacherRoute;
