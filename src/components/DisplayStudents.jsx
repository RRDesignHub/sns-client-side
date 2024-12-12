import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";

export const DisplayStudents = () => {
  const [students, setStudents] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [existingStudentData, setExistingStudentData] = useState(null);
  const [session, setSession] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const handleDisplayStudents = (e) => {
    e.preventDefault();

    const className = e.target.className.value;

    fetch(`https://snkh-school-server-side.vercel.app/students/${className}`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  const handleUpdatePopup = (id) => {
    setExistingStudentData(null);
    setShowModal(true);
    const findStudent = students.find((student) => student._id == id);
    setExistingStudentData(findStudent);
  };

  const handleUpdateData = (e) => {
    e.preventDefault();
    const form = e.target;
    const sectionName = form.branchName.value;
    const groupName = form.departmentName.value;
    const birthRegNo = form.birthRegNo.value;
    const dateOfBirth = form.dateOfBirth.value;
    const studentName = form.studentName.value;
    const className = form.className.value;
    const classRoll = form.classRoll.value;
    const fatherName = form.fatherName.value;
    const motherName = form.motherName.value;
    const photo = form.photo.value;

    const updatedStudentData = {
      sectionName,
      groupName,
      birthRegNo,
      dateOfBirth,
      session,
      bloodGroup,
      gender,
      religion,
      studentName,
      className,
      classRoll,
      fatherName,
      motherName,
      photo,
    };

    fetch(`https://snkh-school-server-side.vercel.app/students/${existingStudentData._id}`,{
      method: "PUT",
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify(updatedStudentData)
    })
      .then(res => res.json())
      .then(data => {
        if(data.modifiedCount){
          setShowModal(false)
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${studentName}'s data successfully updated.`,
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      })

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
            if (data.deletedCount) {
              const remainingStuudents = students.filter(
                (student) => student.classRoll != roll
              );
              setStudents(remainingStuudents);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
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

        {students ? (
          <div className="overflow-x-auto bg-gray-50 p-3 rounded-xl">
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
                  <tr className="*:py-1 " key={student._id}>
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
                      <button
                        onClick={() => handleUpdatePopup(student._id)}
                        className="text-lg p-1 rounded-full bg-green-700  text-white"
                      >
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
        ) :
        <><h3 className="text-center">Please type the class and click on Search button to find students...</h3></>
        }

        {/* update modal */}
        {showModal && (
          <dialog
            id="my_modal_5"
            className="modal modal-open bg-blue-50 sm:modal-middle"
          >
            <div className="modal-box">
              <div className="modal-action justify-start flex-col w-full">
                <form onSubmit={handleUpdateData}>
                  <h2 className="text-2xl md:text-4xl font-bold col-span-12 text-center text-green-950">
                    Update Student Details
                  </h2>
                  <div className="divider col-span-12 mt-0"></div>
                  <div className=" grid gap-2 grid-cols-12">
                    <div className="form-control col-span-6 md:col-span-3">
                      <label className="label">
                        <span className="label-text">Class Name:</span>
                      </label>
                      <input
                        type="text"
                        name="className"
                        defaultValue={existingStudentData.className}
                        placeholder="Type class name..."
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-3">
                      <label className="label">
                        <span className="label-text">Class Roll:</span>
                      </label>
                      <input
                        type="number"
                        name="classRoll"
                        defaultValue={existingStudentData.classRoll}
                        placeholder="Type class roll..."
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-3">
                      <label className="label">
                        <span className="label-text">Section:</span>
                      </label>
                      <input
                        type="text"
                        name="branchName"
                        defaultValue={existingStudentData.sectionName}
                        placeholder="Type branch name..."
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-3">
                      <label className="label">
                        <span className="label-text">Group:</span>
                      </label>
                      <input
                        type="text"
                        name="departmentName"
                        defaultValue={existingStudentData.groupName}
                        placeholder="Type department..."
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-12">
                      <label className="label">
                        <span className="label-text">
                          Birth Registration No:
                        </span>
                      </label>
                      <input
                        type="number"
                        name="birthRegNo"
                        defaultValue={existingStudentData.birthRegNo}
                        placeholder="Type birth registration no..."
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-6">
                      <label className="label">
                        <span className="label-text">Date Of Birth:</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        defaultValue={existingStudentData.dateOfBirth}
                        placeholder="Type date of birth..."
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-6">
                      <label className="label">
                        <span className="label-text">Academic Year:</span>
                      </label>
                      <select
                        onChange={(e) => setSession(e.target.value)}
                        name="session"
                        
                        className="select select-bordered"
                        required
                      >
                        <option value="" disabled selected>
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
                    <div className="form-control col-span-12 md:col-span-12">
                      <label className="label">
                        <span className="label-text">Student Name:</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        defaultValue={existingStudentData.studentName}
                        placeholder="Type student name..."
                        className="input input-bordered"
                        required
                      />
                    </div>
                    <div className="form-control col-span-12 md:col-span-12">
                      <label className="label">
                        <span className="label-text">Father's Name:</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        defaultValue={existingStudentData.fatherName}
                        placeholder="Father's name..."
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control col-span-12 md:col-span-12">
                      <label className="label">
                        <span className="label-text">Mother's Name:</span>
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        defaultValue={existingStudentData.motherName}
                        placeholder="Mother's name..."
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control col-span-6 md:col-span-4">
                      <label className="label">
                        <span className="label-text">Blood Group:</span>
                      </label>
                      <select
                        onChange={(e) => setBloodGroup(e.target.value)}
                        name="bloodGroup"
                        
                        className="select select-bordered"
                        required
                      >
                        <option value="" disabled selected>
                          Select a blood group
                        </option>
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                          (group) => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="form-control col-span-6 md:col-span-4">
                      <label className="label">
                        <span className="label-text">Gender:</span>
                      </label>
                      <select
                        onChange={(e) => setGender(e.target.value)}
                        name="gender"
                        
                        className="select select-bordered"
                        required
                      >
                        <option value="" disabled selected>
                          Select your gender
                        </option>
                        {["Male", "Female"].map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control col-span-6 md:col-span-4">
                      <label className="label">
                        <span className="label-text">Religion:</span>
                      </label>
                      <select
                        name="gender"
                        
                        onChange={(e) => setReligion(e.target.value)}
                        className="select select-bordered"
                        required
                      >
                        <option value="" disabled selected>
                          Select religion
                        </option>
                        {["Islam", "Hindu", "Cristian"].map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control col-span-12 md:col-span-12">
                      <label className="label">
                        <span className="label-text">Photo URL:</span>
                      </label>
                      <input
                        type="text"
                        name="photo"
                        defaultValue={existingStudentData.photo}
                        placeholder="Photo url..."
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn px-8 mt-5 bg-green-200 text-green-950  border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn bg-red-500 text-white px-8 w-fit hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
};
