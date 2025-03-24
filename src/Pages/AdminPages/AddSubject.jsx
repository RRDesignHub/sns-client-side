import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
export const AddSubject = () => {
  const axiosSecure = useAxiosSec();
  const [clsName, setClsName] = useState(null);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectType, setSubjectType] = useState("Compulsory");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddSubject = (e) => {
    e.preventDefault();

    const form = e.target;
    const subjectName = form.subject.value;
    const subjectID = `SUB_${subjectName.slice(0, 3)}`;
    const totalMarks = parseInt(form.totalMarks.value, 10);
    const subjectCode = form.subjectCode.value;
    const assignedTeacher = form.teacher.value;

    const subjectData = {
      subjectID,
      subjectName,
      subjectType,
      totalMarks,
      subjectCode,
      assignedTeacher,
    };
    console.log(subjectData);
    setSubjects([...subjects, subjectData]);
    form.reset();
  };

  const handleSubjectsDataSubmit = async () => {
    if (!clsName) {
      return setError("Please select a class...");
    }
    const subjectData = {
      className: clsName,
      subjects: subjects,
    };

    try {
      const { data } = await axiosSecure.post(
        `/add-subjects`,
        subjectData
      );
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Class ${clsName}'s subjects added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setSubjects([]);
        setError("");
      }
    } catch (err) {
      console.log("Add subject Error-->", err);
    }
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-6 py-8 rounded-lg">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">Add Subject</h1>
        <div className="divider my-0"></div>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <label className="label text-xl font-semibold">Class:</label>
          <select
            value={clsName}
            onChange={(e) => setClsName(e.target.value)}
            className={`select select-bordered max-w-xl ${error ? "border-red-400" : ""}`}
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
                {className}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-center mb-1">{error}</p>}

        <form
          onSubmit={handleAddSubject}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* subject name */}
          <div className="flex flex-col">
            <label className="label font-semibold">Subject Name:</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/*subjectCode*/}
          <div className="flex flex-col">
            <label className="label font-semibold">Subject Code:</label>
            <input
              type="text"
              name="subjectCode"
              placeholder="Subject Code"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/*subject type*/}
          <div className="flex flex-col">
            <label className="label font-semibold">Subject Type:</label>
            <select
              name="subjectType"
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="Compulsory">Compulsory</option>
              <option value="Optional">Optional</option>
            </select>
          </div>

          {/*totalMarks*/}
          <div className="flex flex-col">
            <label className="label font-semibold">Total Marks:</label>
            <input
              type="number"
              name="totalMarks"
              placeholder="Total Marks"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/*assigned teacher*/}
          <div className="flex flex-col">
            <label className="label font-semibold">Assigned Teacher:</label>
            <input
              type="text"
              name="teacher"
              placeholder="Assigned Teacher (Optional)"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col items-center justify-end">
            <button className="btn btn-outline w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              Add Subject
            </button>
          </div>
        </form>

        {subjects.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-5">
            <h2 className="text-lg font-semibold mb-3">Subject List</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Total Marks</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subj, index) => (
                    <tr key={index}>
                      <td>{subj.subjectName}</td>
                      <td>{subj.subjectCode}</td>
                      <td>{subj.subjectType}</td>
                      <td>{subj.totalMarks}</td>
                      <td>{subj.assignedTeacher || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubjectsDataSubmit}
            className="btn bg-green-600 hover:bg-green-700 text-white px-6 text-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
