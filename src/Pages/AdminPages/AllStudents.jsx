import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Loading } from "../../components/Shared/Loading";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
export default function AllStudents() {
  const [filterStudentsID, setFilterStudentsID] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const {data: students = [], isLoading, refetch} = useQuery({
    queryKey: ["studens", filterStudentsID, filterByClass],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/students?studentID=${filterStudentsID}&&className=${filterByClass}`);
      return data;
    }
  })

  // Delete Student Function
  const handleDelete = async(id)=> {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You have to again add this!",
        icon: "warning",
        color: "#064E3B",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_API}/student/${id}`);
          if(data.deletedCount){
            Swal.fire({
              title: "Deleted!",
              text: "Student has been deleted.",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch (err) {
      console.log("Delete student Error--->", err);
    }
  };

  if(isLoading){
    return <Loading />
  }
  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
        All Students
      </h2>
      <div className="divider"></div>
      <h3 className="text-xl text-green-950 font-semibold mb-2">Total: <span className="font-bold">{students.length}</span> students</h3>
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        
        <input
          type="text"
          placeholder="Filter by Class"
          name="className"
          value={filterByClass}
          onChange={(e) => setFilterByClass(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Filter by Student ID"
          name="classRoll"
          value={filterStudentsID}
          onChange={(e) => setFilterStudentsID(e.target.value)}
          className="input input-bordered w-full"
        />
       
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-green-600 text-white">
            <tr>
              <th>Student ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Class</th>
              <th>Roll</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {students.length > 0 ? (
              students.slice(0, 10).map((student) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td>{student.studentID}</td>
                  <td><img src={student?.image} className="w-10 h-10 border border-green-600 rounded-full" alt="" /></td>
                  <td>{student.studentName}</td>
                  <td>{student.className}</td>
                  <td>{student.classRoll}</td>
                  <td>
                    <Link to={`/dashboard/update-student/${student?._id}`} className="btn btn-sm bg-secondary hover:bg-primary mr-2">
                      <FaUserEdit />
                    </Link>
                    <button
                      className="btn btn-sm text-lg btn-error text-white"
                      onClick={() => handleDelete(student._id)}
                    >
                      < MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
