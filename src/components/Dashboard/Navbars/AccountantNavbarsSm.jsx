import { NavLink, useLocation } from "react-router-dom";
import { PiUsersFourFill } from "react-icons/pi";
import { TbCoinTakaFilled } from "react-icons/tb";
import { MdDashboard, MdAddChart} from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
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

      {/* fees receive */}
      <NavLink
        to="/dashboard/students-fees"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <TbCoinTakaFilled className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "মাসিক বেতন গ্রহণ" : ""}
        </span>
      </NavLink>
      {/* exam fees add */}
      <NavLink
        to="/dashboard/add-exam-fee"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <MdAddChart className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "পরীক্ষার ফি যোগ" : ""}
        </span>
      </NavLink>
      {/* items sell */}
      <NavLink
        to="/dashboard/goods-sell"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <FaSitemap className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "বিক্রি(খাতা, টাই...)" : ""}
        </span>
      </NavLink>
    </>
  );
};
export default AccountantNavbars;
