import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Shared/Loading";

const AllSubjects = () => {
  const [classFilter, setClassFilter] = useState("Play"); // Selected class filter
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(null);
  const {data: subjectsData = {}, isLoading, refetch} = useQuery({
    enabled: !!classFilter,
    queryKey: ["subjects", classFilter],
    queryFn: async() =>{
      const {data} = await axios.get(`${import.meta.env.VITE_SERVER_API}/subjects?className=${classFilter}`);
      return data;
    }
  })

  // Handle delete subject
  const handleDelete = async (id) => {
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
          const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_API}/delete-subject/${classFilter}/${selectedSubjectIdx}`);
          if (data.modifiedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Subject has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting subject:", error);
        }
      }
    });
  };

  // Open Edit Modal
  const openEditModal = (subject, index) => {
    setSelectedSubject(subject);
    setSelectedSubjectIdx(index);
    document.getElementById("editSubjectModal").showModal();
  };


  // Handle Form Submission for Update
  const handleUpdate = async(e) => {
    e.preventDefault();
    const updatedSubject = {
      subjectName: e.target.subjectName.value,
      subjectCode: e.target.subjectCode.value,
      totalMarks: e.target.totalMarks.value,
      assignedTeacher: e.target.assignedTeacher.value,
    };

    try{
      const {data} = await axios.patch(`${import.meta.env.VITE_SERVER_API}/update-subject/${classFilter}/${selectedSubjectIdx}`, updatedSubject);
      if(data.modifiedCount > 0){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Subject's data successfully updated!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("editSubjectModal").close();
        e.target.reset();
        refetch();
      }
    }catch(err){
      console.log("Update subject Error-->", err);
    }

  };

  if(isLoading){
    return <Loading />
  }
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">Class-Based Subjects</h1>
        <div className="divider my-0"></div>
        {/* Class Filter */}
        <div className="flex justify-end mb-4">
          <select
            onChange={(e) => setClassFilter(e.target.value)}
            className="select select-bordered bg-white w-64 text-gray-700"
          >
            {["Play", "Nursery", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((className) => (
              <option key={className} value={className}>
                Class {className}
              </option>
            ))}
          </select>
        </div>

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjectsData?.subjects?.length > 0 ? (
                subjectsData?.subjects?.map((subject, index) => (
                  <tr key={index} >
                    <td>{subject.subjectName}</td>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectType}</td>
                    <td>{subject.totalMarks}</td>
                    <td>{subject.assignedTeacher}</td>
                    <td className="flex gap-2">
                      <button 
                      onClick={() => openEditModal(subject, index)}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-600">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(subject._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No subjects found for this class.
                  </td>
                </tr>
              )}
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
                <input type="text" name="subjectName" defaultValue={selectedSubject.subjectName} className="input input-bordered w-full"  required/>
              </label>
              <label className="block mb-2">
                Subject Code:
                <input type="text" name="subjectCode" defaultValue={selectedSubject.subjectCode} className="input input-bordered w-full" />
              </label>
          
              <label className="block mb-2">
                Total Marks:
                <input type="number" name="totalMarks" defaultValue={selectedSubject.totalMarks} className="input input-bordered w-full" required />
              </label>
              <label className="block mb-2">
                Assigned Teacher:
                <input type="text" name="assignedTeacher" defaultValue={selectedSubject.assignedTeacher} className="input input-bordered w-full" />
              </label>
              <div className="modal-action">
                <button type="submit" className="btn bg-primary text-green-50 hover:bg-green-600">
                  Update
                </button>
                <button type="button" className="btn bg-red-400" onClick={() => document.getElementById("editSubjectModal").close()}>
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
