import { NavLink, useLocation } from "react-router-dom";
import { PiUsersFourFill } from "react-icons/pi";
import { MdDashboard} from "react-icons/md";
const AccountantNavbars = ({ openCloseMenu }) => {
  const location = useLocation();
  return (
    <>
      {/* overview */}
      <NavLink
        to="/dashboard"
        className={`${
          location.pathname == "/dashboard"
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white"
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition"
        }`}
      >
        <MdDashboard className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "ডেসবোর্ড" : ""}</span>
      </NavLink>

      {/* all students */}
      <NavLink
        to="/dashboard/students-fees"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <PiUsersFourFill className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "সকল শিক্ষার্থী" : ""}
        </span>
      </NavLink>
    </>
  );
};
export default AccountantNavbars;
