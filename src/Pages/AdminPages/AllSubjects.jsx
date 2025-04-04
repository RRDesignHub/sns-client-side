import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Shared/Loading";
import { useAxiosSec } from "../../Hooks/useAxiosSec";

const AllSubjects = () => {
  const axiosSecure = useAxiosSec();
  const [classFilter, setClassFilter] = useState("Play"); // Selected class filter
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(null);
  const {
    data: subjectsData = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!classFilter,
    queryKey: ["subjects", classFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/subjects?className=${classFilter}`
      );
      return data;
    },
  });

  // Handle delete subject
  const handleDelete = async (className) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#16A34A",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(
            `/delete-subject/${className}`
          );
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Subject has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting subject:", error);
        }
      }
    });
  };

 

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          Class-Based Subjects
        </h1>
        <div className="divider my-0"></div>
        {/* Class Filter */}
        <div className="flex justify-end mb-4">
          <select
            onChange={(e) => setClassFilter(e.target.value)}
            className="select select-bordered bg-white w-64 text-gray-700"
          >
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
                Class {className}
              </option>
            ))}
          </select>
        </div>

        {isLoading && <Loading />}

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Subject Type</th>
                <th>Total Marks</th>
                <th>Assigned Teacher</th>
              </tr>
            </thead>
            <tbody>
              {subjectsData?.subjects?.length > 0 ? (
                subjectsData?.subjects?.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectName}</td>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectType}</td>
                    <td>{subject.totalMarks}</td>
                    <td>{subject.assignedTeacher}</td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No subjects found for this class.
                  </td>
                </tr>
              )}
              {
                subjectsData && <tr className="text-left">
                <td></td>
                <td></td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(subjectsData?.className)}
                    className="btn btn-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete All Subjects
                  </button>
                </td>
                <td></td>
                <td></td>
                
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Subject Modal */}
      <dialog id="editSubjectModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit Subject</h3>
          {selectedSubject && (
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                Subject Name:
                <input
                  type="text"
                  name="subjectName"
                  defaultValue={selectedSubject.subjectName}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Subject Code:
                <input
                  type="text"
                  name="subjectCode"
                  defaultValue={selectedSubject.subjectCode}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="block mb-2">
                Total Marks:
                <input
                  type="number"
                  name="totalMarks"
                  defaultValue={selectedSubject.totalMarks}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Assigned Teacher:
                <input
                  type="text"
                  name="assignedTeacher"
                  defaultValue={selectedSubject.assignedTeacher}
                  className="input input-bordered w-full"
                />
              </label>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-primary text-green-50 hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn bg-red-400"
                  onClick={() =>
                    document.getElementById("editSubjectModal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AllSubjects;
