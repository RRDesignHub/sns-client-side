import { Link, NavLink } from "react-router-dom";
import logo from './../assets/logo.png'
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const Navbar = () => {
  const {user , logoutUser} = useContext(AuthContext);
  const handleLogout = () =>{
    logoutUser();
  }
  const links = (
    <>
      <li>
      <NavLink 
      className={({ isActive }) => (isActive ? " text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
      to="/">Home</NavLink>
      </li>
      <li>
        <NavLink 
        className={({ isActive }) => (isActive ? "text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
        to="/teachers">Teachers</NavLink>
      </li>
      <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
          to="/management">Management</NavLink>
      </li>
      
      <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
            to="/result">Result</NavLink>
      </li>
      {
        user && <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
            to="/admin_access">Admin Access</NavLink>
      </li>
      }
      {
        user ? <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
            onClick={handleLogout}>Logout</NavLink>
      </li> : <li>
        <NavLink 
          className={({ isActive }) => (isActive ? "text-white underline bg-transparent focus:text-white focus:bg-transparent" : "")} 
            to="/login">Login</NavLink>
      </li>
      }
    </>
  );
  return (
    <div className="navbar  w-11/12 mx-auto text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-green-100 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className=" text-xl">
            <div className="flex items-center gap-3">
            <img className="w-10 md:w-20" src={logo} alt="" /> 
            <h3 className="text-3xl font-bold max-sm:hidden">Shah Neyamat (RH:) <br /> KG & High School</h3>
            </div>
            
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end max-sm:hidden">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
      </div>
  )
}
