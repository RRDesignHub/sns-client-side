import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { useRole } from "../../Hooks/useRole";
import { Loading } from "../../components/Shared/Loading";
export default function AllStudents() {
  const axiosSecure = useAxiosSec();
  const [userRole] = useRole();
  const [filterStudentsID, setFilterStudentsID] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [serverError, setServerError] = useState("");
  const [enabled, setUnabled] = useState(false);
  const { isTeacher, isAccountant, isAdmin } = userRole;
  const {
    data: students = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["resultData", filterByClass, session],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students?session=${session}&&className=${filterByClass}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError("");
      }
      return data;
    },
    enabled,
  });

  const handleFilter = () => {
    setUnabled(true);
    refetch();
  };

  // Delete Student Function
  const handleDelete = async (id) => {
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
          const { data } = await axiosSecure.delete(`/delete-student/${id}`);
          if (data?.deletedCount) {
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

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
        সকল শিক্ষার্থী
      </h2>
      <div className="divider"></div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-12 md:grid-cols-10 gap-4 mb-5">
        {/* choose class */}
        <div className="form-control col-span-12 md:col-span-3">
          <label className="label">
            <span className="label-text max-sm:text-lg">শ্রেণী:</span>
          </label>
          <select
            defaultValue={filterByClass}
            onChange={(e) => setFilterByClass(e.target.value)}
            name="class"
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select a class
            </option>
            {[
              "Play",
              "Nursery",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
            ].map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>

        {/* select year */}
        <div className="form-control col-span-12 md:col-span-2">
          <label className="label">
            <span className="label-text max-sm:text-lg">শিক্ষাবর্ষ:</span>
          </label>
          <select
            onChange={(e) => setSession(parseInt(e.target.value))}
            name="session"
            value={session}
            className="select select-bordered"
          >
            <option value="" disabled>
              Select a year
            </option>
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        {/* choose exam */}
        <div className="form-control col-span-12 md:col-span-3">
          <label className="label">
            <span className="label-text max-sm:text-lg">শিক্ষার্থী আইডি:</span>
          </label>
          <input
            type="text"
            placeholder="যেমন: 'SN-20251234'"
            name="classRoll"
            value={filterStudentsID}
            onChange={(e) => setFilterStudentsID(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="col-span-6 md:col-span-2 flex items-end">
          <button
            onClick={handleFilter}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            সার্চ করুন
          </button>
        </div>
      </div>
      <div className="divider my-0"></div>
      {students.length > 0 && (
        <div className="pb-2 flex justify-evenly text-sm md:text-lg text-green-950 font-semibold">
          <h2>শ্রেণী : {filterByClass}</h2>
          <h2>মোট শিক্ষার্থী: {students.length} জন</h2>
        </div>
      )}
      {isLoading ? (
        <Loading />
      ) : students.length > 0 ? (
        <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-green-600 text-white">
              <tr>
                <th>Student ID</th>
                <th>শিক্ষার্থীর ছবি</th>
                <th>নাম</th>
                <th>রোল</th>
                <th>জন্ম তাং</th>
                <th>বাবার নাম</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {students.length > 0 &&
                students
                  .sort((a, b) => a.classRoll - b.classRoll)
                  .map((student) => (
                    <tr key={student._id}>
                      <td>{student.studentID}</td>
                      <td>
                        <img
                          src={student?.image}
                          className="w-10 h-10 border border-green-600 rounded-full"
                          alt=""
                        />
                      </td>
                      <td>{student.studentName}</td>
                      <td>{student.classRoll}</td>
                      <td>
                        {student?.dateOfBirth &&
                          format(
                            new Date(student?.dateOfBirth),
                            "MMMM dd, yyyy"
                          )}
                      </td>
                      <td>{student.fatherName}</td>
                      {isAdmin ? (
                        <td>
                          <Link
                            to={`/dashboard/update-student/${student?._id}`}
                            className="btn btn-sm bg-secondary text-white hover:bg-primary mr-2"
                          >
                            <FaUserEdit />
                          </Link>
                          <button
                            className="btn btn-sm text-lg btn-error text-white"
                            onClick={() => handleDelete(student._id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      ) : (
                        <td>
                          <Link to={`/dashboard/student-details/${student._id}`} className="btn btn-sm bg-secondary text-white hover:bg-primary mr-2">Details</Link>
                        </td>
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      ) : serverError ? (
        <p className="text-center py-4 text-red-400">{serverError}</p>
      ) : (
        <p className="text-center py-4">শ্রেণী ও শিক্ষাবর্ষ নির্বাচন করুন.</p>
      )}
    </div>
  );
}
