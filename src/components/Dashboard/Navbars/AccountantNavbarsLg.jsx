import { NavLink, useLocation } from "react-router-dom";
import { PiUsersFourFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
const AccountantNavbarLg = () => {
  const location = useLocation();
  return (
    <>
      {/* overview */}
      <NavLink
        to="/dashboard"
        className={`${
          location.pathname == "/dashboard"
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }`}
      >
        <MdDashboard className="w-5 h-5" />
        ডেসবোর্ড
      </NavLink>

      {/* all students */}
      <NavLink
        to="/dashboard/students"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <PiUsersFourFill className="w-5 h-5" />
        সকল শিক্ষার্থী
      </NavLink>
    </>
  );
};
export default AccountantNavbarLg;
