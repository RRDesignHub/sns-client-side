import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";

export const DisplayStudents = () => {
  const [students, setStudents] = useState(null);
  const handleDisplayStudents = (e) => {
    e.preventDefault();

    const className = e.target.className.value;

    fetch(`https://snkh-school-server-side.vercel.app/students/${className}`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  const handleDeleteStudent = (clsName, roll) => {
    const queryInfo = { clsName, roll };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to server!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://snkh-school-server-side.vercel.app/students`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(queryInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.deletedCount){
              const remainingStuudents = students.filter(student=> student.classRoll != roll);
              setStudents(remainingStuudents);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });

        
      }
    });
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleDisplayStudents}
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

        {students && (
          <div className="overflow-x-auto bg-gray-50 p-5 rounded-xl">
            <table className="table py-0">
              {/* head */}
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Studnet Name</th>
                  <th>Class</th>
                  <th>Class Roll</th>
                  <th>Father's Name</th>
                  <th>Mother's Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr className="*:py-1" key={student._id}>
                    <td>
                      {student.photo && (
                        <img
                          className="border-2 border-green-100 w-10 h-10 rounded-full"
                          src={student.photo}
                          alt=""
                        />
                      )}
                    </td>
                    <td className="font-semibold ">{student.studentName}</td>
                    <td>{student.className}</td>
                    <td>{student.classRoll}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.motherName}</td>
                    <td className="flex items-center gap-1">
                      <button className="text-lg p-1 rounded-full bg-green-700  text-white">
                        <MdDriveFileRenameOutline />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteStudent(
                            student.className,
                            student.classRoll
                          )
                        }
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
        )}
      </div>
    </>
  );
};
