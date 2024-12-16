import { Link, NavLink } from "react-router-dom";
import logo from './../assets/logo.png'
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";

export const Navbar = () => {
  const {user , logoutUser} = useContext(AuthContext);
  const [isOpen, setIsOpne] = useState(false);
  const [openCloseMenu, setOpenCloseMenu] = useState(true);
  const handleOpenCloseMenu = (status) => {
    setOpenCloseMenu(!status);
  };
  const handleProfileToagle = () => {
    setIsOpne(!isOpen);
  };
  const handleLogout = () =>{
    logoutUser();
  }
  const links = (
    <>
      <li>
      <NavLink 
      className={({ isActive }) => (isActive ? "text-green-950 lg:text-white underline bg-transparent focus:text-white max-sm:focus:text-green-600  focus:bg-transparent" : "text-green-950 lg:text-white")} 
      to="/">Home</NavLink>
      </li>
      <li>
        <NavLink 
        className={({ isActive }) => (isActive ? "text-green-950 lg:text-white underline bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent" : "text-green-950 lg:text-white")} 
        to="/teachers">Teachers</NavLink>
      </li>
      <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-green-950 lg:text-white underline bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent" : "text-green-950 lg:text-white")} 
          to="/management">Management</NavLink>
      </li>
      
      <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-green-950 lg:text-white underline bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent" : "text-green-950 lg:text-white")} 
            to="/result">Result</NavLink>
      </li>
      {
        user && <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-green-950 lg:text-white underline bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent" : "text-green-950 lg:text-white")} 
            to="/admin_access">Admin Access</NavLink>
      </li>
      }
      {
        user ? <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-green-950 lg:text-white  bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent" : "text-green-950 lg:text-white")} 
            onClick={handleLogout}>Logout</NavLink>
      </li> : <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-green-950 lg:text-white underline bg-transparent max-sm:focus:text-green-600 focus:text-white focus:bg-transparent" : "text-green-950 lg:text-white")} 
            to="/login">Admin Login</NavLink>
      </li>
      }
    </>
  );
  return (
    <div className="navbar w-11/12 mx-auto text-white max-sm:justify-between max-sm:items-center">
        <div className="navbar-start">
          
          <Link to="/" className=" text-xl">
            <div className="flex items-center gap-3">
            <img className="w-10 md:w-20" src={logo} alt="" /> 
            <h3 className="text-3xl font-bold max-sm:hidden">Shah Neyamat (RH:) <br /> KG & High School</h3>
            </div>
            
          </Link>
        </div>
       
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="flex-end lg:hidden mx-2">
          <div className="py-2 px-3 rounded-lg bg-green-200 text-green-950 ">
            {openCloseMenu ? (
              <TiThMenu
                onClick={() => handleOpenCloseMenu(true)}
                className="text-2xl flex  "
              />
            ) : (
              <FaWindowClose
                onClick={() => handleOpenCloseMenu(false)}
                className="text-2xl flex  "
              ></FaWindowClose>
            )}
          </div>

          <ul
            className={`absolute z-50 gap-5 justify-center duration-500 rounded-lg bg-green-100 drop-shadow-md py-6 px-10 max-sm:*:text-xl top-20  max-sm:*:font-medium ${
              openCloseMenu ? "-left-[1000px] " : "left-4 "
            }`}
          >
            {links}
          </ul>
        </div>
      </div>
  )
}
