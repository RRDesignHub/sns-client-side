import { useState } from "react";
import Swal from "sweetalert2";
import imageUpload from "../../Api/Utils";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
export const AddStudent = () => {
  const axiosSecure = useAxiosSec();
  const [session, setSession] = useState(new Date().getFullYear());
  const [className, setClassName] = useState("Play");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [gender, setGender] = useState("Male");
  const [religion, setReligion] = useState("Islam");
  const [imageFile, setImageFile] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());

  const handleStudentData = async (e) => {
    e.preventDefault();

    // image file upload to imageBB:
    let photoURL;
    if(imageFile){
      photoURL = await imageUpload(imageFile);
    }

    const form = e.target;
    const sectionName = form.branchName.value;
    const groupName = form.departmentName.value;
    const birthRegNo = parseInt(form.birthRegNo.value);
    const studentName = form.studentName.value;
    const classRoll = form.classRoll.value;
    const fatherName = form.fatherName.value;
    const motherName = form.motherName.value;

    const studentData = {
      studentID: `SN-${session}-${birthRegNo.toString().slice(-4)}`,
      className,
      classRoll,
      sectionName,
      groupName,
      birthRegNo,
      dateOfBirth: birthDate,
      session,
      studentName,
      fatherName,
      motherName,
      bloodGroup,
      gender,
      religion,
      image: photoURL,
    };

    try{
      const {data} = await axiosSecure.post(`/add-student`, studentData);
      if(data?.message){
       return Swal.fire({
          position: "center",
          icon: "info",
          title: `${data?.message}`,
        });
      }
      if(data.insertedId){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${studentName}'s data added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    }catch(err){
      console.log("Student data adding Error-->", err);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-10">
        <form
          onSubmit={handleStudentData}
          className="card-body max-sm:px-3 bg-green-200 rounded-2xl py-5 md:py-8 "
        >
          <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
            Add Student Details
          </h1>
          <div className="divider my-0"></div>
          <div className="grid gap-2 grid-cols-12">
            {/* class name */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Class Name:</span>
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
            {/* roll */}
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
            {/* section */}
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
            {/* Group */}
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
            {/* Birth reg no */}
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
            {/* Date of Birth */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Date Of Birth:</span>
              </label>
              <input
              type="date"
                selected={birthDate}
                required
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            {/* Academic year */}
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
            {/* student name */}
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
            {/* fathers name */}
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
            {/* Mother's name */}
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
            {/* Blood group */}
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
                <option value="" disabled>
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
            {/* Gender */}
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
                <option value="" disabled>
                  Select your gender
                </option>
                {["Male", "Female"].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            {/* Religion */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Religion:</span>
              </label>
              <select
                defaultValue={"Select religion"}
                name="gender"
                onChange={(e) => setReligion(e.target.value)}
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select religion
                </option>
                {["Islam", "Hindu", "Cristian"].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Image (jpg, jpeg, png)</span>
              </label>
              <input
                type="file"
                required
                name="imageFile"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className="select mb-2 px-4 py-2 select-bordered"
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
