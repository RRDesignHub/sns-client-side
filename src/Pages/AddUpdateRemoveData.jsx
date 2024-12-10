import { NavLink, Outlet } from "react-router-dom"

export const AddUpdateRemoveData = () => {
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="my-5 flex justify-center gap-3">
          <NavLink 
          to='/add/add_student'
          className={({ isActive }) => (isActive ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700" : "btn bg-green-50 hover:bg-green-100")}
          >Add Student</NavLink>
          <NavLink 
          to='/add/students'
          className={({ isActive }) => (isActive ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700" : "btn bg-green-50 hover:bg-green-100")}
          >Students</NavLink>
          <NavLink 
          to='/add/add_subject'
          className={({ isActive }) => (isActive ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700" : "btn bg-green-50 hover:bg-green-100")}
          >Add Subject</NavLink>
          <NavLink 
          to='/add/display_subject'
          className={({ isActive }) => (isActive ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700" : "btn bg-green-50 hover:bg-green-100")}
          >Subjects</NavLink>
          <NavLink 
          to='/add/add_result'
          className={({ isActive }) => (isActive ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700" : "btn bg-green-50 hover:bg-green-100")}
          >Add Result</NavLink>
        </div>

        <div className="divider mb-0"></div>

        {/* Dynamic sec */}
        <Outlet></Outlet>
      </div>
    </>
  )
}
