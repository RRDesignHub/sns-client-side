import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";

export const ExistingSubjects = () => {
  const [subjects, setSubjects] = useState(null);
  const handleDisplaySubjects = (e) => {
    e.preventDefault();

    const className = e.target.className.value;

    fetch(`https://snkh-school-server-side.vercel.app/subjects/${className}`)
      .then((res) => res.json())
      .then((data) => setSubjects(data));
  };

  // const handleDeleteStudent = (clsName, roll) => {
  //   const queryInfo = { clsName, roll };

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to server!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`https://snkh-school-server-side.vercel.app/students`, {
  //         method: "DELETE",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(queryInfo),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if(data.deletedCount){
  //             const remainingStuudents = students.filter(student=> student.classRoll != roll);
  //             setStudents(remainingStuudents);
  //             Swal.fire({
  //               title: "Deleted!",
  //               text: "Your file has been deleted.",
  //               icon: "success"
  //             });
  //           }
  //         });

  //     }
  //   });
  // };

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
            <input
              type="number"
              min="1"
              max="10"
              name="className"
              placeholder="Class 1-10"
              className="input input-bordered w-[150px]"
              required
            />
          </div>

          <div className="form-control">
            <button className="btn bg-green-100  hover:bg-green-600 hover:text-white">
              Search
            </button>
          </div>
        </form>

        {subjects ? (
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
