import { useState } from "react";
import Swal from "sweetalert2";

export const AddStudent = () => {
  const [session, setSession] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const handleStudentData = (e) => {
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

    const studentData = {
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

    fetch("https://snkh-school-server-side.vercel.app/students", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${studentName}'s data successfully added.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <>
      <div className="w-11/12 mx-auto my-10">
        <form
          onSubmit={handleStudentData}
          className="card-body max-sm:px-3 bg-green-50 rounded-2xl py-5 md:py-8 "
        >
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Add Student Details
          </h1>
          <div className="grid gap-2 grid-cols-12">
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Class Name:</span>
              </label>
              <input
                type="text"
                name="className"
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
                placeholder="Type department..."
                className="input input-bordered"
                
              />
            </div>
            <div className="form-control col-span-12 md:col-span-8">
              <label className="label">
                <span className="label-text">Birth Registration No:</span>
              </label>
              <input
                type="number"
                name="birthRegNo"
                placeholder="Type birth registration no..."
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Date Of Birth:</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Type date of birth..."
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Academic Year:</span>
              </label>
              <select
                onChange={(e) => setSession(e.target.value)}
                name="session"
                defaultValue={"Select a year"}
                className="select select-bordered"
                required
              >
                <option value="" disabled >
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
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Student Name:</span>
              </label>
              <input
                type="text"
                name="studentName"
                placeholder="Type student name..."
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Father's Name:</span>
              </label>
              <input
                type="text"
                name="fatherName"
                placeholder="Father's name..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Mother's Name:</span>
              </label>
              <input
                type="text"
                name="motherName"
                placeholder="Mother's name..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Blood Group:</span>
              </label>
              <select
              defaultValue={"Select blood group"}
                onChange={(e) => setBloodGroup(e.target.value)}
                name="bloodGroup"
                className="select select-bordered"
                required
              >
                <option value="" disabled >
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
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Gender:</span>
              </label>
              <select
              defaultValue={"Select gender"}
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                className="select select-bordered"
                required
              >
                <option value="" disabled >
                  Select your gender
                </option>
                {["Male", "Female"].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Religion:</span>
              </label>
              <select 
              defaultValue={"Select religion"}
                name="gender" 
                onChange={(e) => setReligion(e.target.value)}
                className="select select-bordered" required>
                <option value="" disabled >
                  Select religion
                </option>
                {["Islam", "Hindu", "Cristian"].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Photo URL:</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo url..."
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="form-control w-fit ms-auto mt-6">
            <button className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white">
              Add Student's Data
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
