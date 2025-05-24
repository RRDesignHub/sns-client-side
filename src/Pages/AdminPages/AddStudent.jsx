import { useState } from "react";
import Swal from "sweetalert2";
import imageUpload from "../../Api/Utils";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
export const AddStudent = () => {
  const axiosSecure = useAxiosSec();
  const [session, setSession] = useState(new Date().getFullYear().toString());
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
    const classRoll = form.classRoll.value.toString();
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
            শিক্ষার্থীর তথ্য সংযুক্তি
          </h1>
          <div className="divider my-0"></div>
          <div className="grid gap-2 grid-cols-12">
            {/* class name */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">শ্রেণী: (*)</span>
              </label>
              <select
                defaultValue={"Select a class"}
                onChange={(e) => setClassName(e.target.value)}
                name="class"
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                একটি শ্রেণী নির্বাচন করুন...
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
                <span className="label-text">রোল: (*)</span>
              </label>
              <input
                type="number"
                name="classRoll"
                min={1}
                placeholder="শ্রেণী রোল..."
                className="input input-bordered"
                required
              />
            </div>
            {/* section */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">শাখা:</span>
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
                <span className="label-text">বিভাগ:</span>
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
                <span className="label-text">জন্মনিবন্ধন নম্বর: (*)</span>
              </label>
              <input
                type="number"
                name="birthRegNo"
                placeholder="জন্মনিবন্ধন নম্বর লিখুন..."
                className="input input-bordered"
                required
              />
            </div>
            {/* Date of Birth */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">জন্ম তারিখ: (*)</span>
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
                <span className="label-text">শিক্ষাবর্ষ: (*)</span>
              </label>
              <select
                onChange={(e) => setSession(e.target.value.toString())}
                name="session"
                defaultValue={"একটি বছর নির্বাচন করুন..."}
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
                <span className="label-text">শিক্ষার্থীর নাম: (*)</span>
              </label>
              <input
                type="text"
                name="studentName"
                placeholder="ইংরেজিতে শিক্ষার্থীর নাম..."
                className="input input-bordered"
                required
              />
            </div>
            {/* fathers name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">বাবার নাম: (*)</span>
              </label>
              <input
                type="text"
                name="fatherName"
                placeholder="ইংরেজিতে বাবার নাম..."
                className="input input-bordered"
              />
            </div>
            {/* Mother's name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">মায়ের নাম: (*)</span>
              </label>
              <input
                type="text"
                name="motherName"
                placeholder="ইংরেজিতে মায়ের নাম..."
                className="input input-bordered"
              />
            </div>
            {/* Blood group */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">রক্তের গ্রুফ:</span>
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
                <span className="label-text">লিঙ্গ: (*)</span>
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
                <span className="label-text">ধর্ম:</span>
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
                <span className="label-text">শিক্ষার্থীর ছবি (jpg, jpeg, png)</span>
              </label>
              <input
                type="file"
                name="imageFile"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className="select mb-2 px-4 py-2 select-bordered"
              />
            </div>
          </div>

          <div className="form-control w-fit ms-auto mt-6">
            <button className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white">
              শিক্ষার্থীর তথ্য যোগ করুন
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
