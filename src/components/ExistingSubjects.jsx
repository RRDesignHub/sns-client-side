import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Loading } from "./Shared/Loading";
export const ExistingSubjects = () => {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [className, setClassName] = useState(null);
  const handleDisplaySubjects = (e) => {
    e.preventDefault();

    fetch(`https://snkh-school-server-side.vercel.app/subjects/${className}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setSubjects(data);
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleDisplaySubjects}
          className="card-body w-1/2 flex-row justify-center items-center mx-auto"
        >
          <div className="form-control flex-row items-center gap-3">
            <label className="label">
              <span className="label-text  text-xl font-semibold">Class:</span>
            </label>
            <select
                defaultValue={"Select a class"}
                onChange={(e) => setClassName(e.target.value)}
                name="class"
                className="select select-bordered"
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

          <div className="form-control">
            <button className="btn bg-green-100  hover:bg-green-600 hover:text-white">
              Search
            </button>
          </div>
        </form>

        {
          loading ? 
          <Loading></Loading> :
          subjects ? (
            <div className="overflow-x-auto bg-gray-50 p-5 rounded-xl">
              <table className="table py-0">
                {/* head */}
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Subject Type</th>
                    <th>Total Marks</th>
                    <th>Pass Marks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects?.subjects.map((subject, index) => (
                    <tr className="*:py-1" key={index}>
                      <td>{subject.subjectName}</td>
                      <td>{subject.subjectType}</td>
                      <td>{subject.totalMarks}</td>
                      <td>{subject.passMarks}</td>
                      <td className="flex items-center gap-1">
                        <button className="text-lg p-1 rounded-full bg-green-700  text-white">
                          <MdDriveFileRenameOutline />
                        </button>
                        <button
                          // onClick={() =>
                          //   handleDeleteStudent(
                          //     student.className,
                          //     student.classRoll
                          //   )
                          // }
                          className="text-4xl text-red-500"
                        >
                          <TiDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) :
          <><h3 className="text-center">Please type class and click on the Search button to display all added subjects...</h3></>
        }
      </div>
    </>
  );
};
