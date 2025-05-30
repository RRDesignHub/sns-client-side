import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";
import imageUpload from "../../../Api/Utils";
export default function UpdateStudent() {
  const axiosSecure = useAxiosSec();
  const navigate = useNavigate();
  const { id } = useParams();
  const [session, setSession] = useState(new Date().getFullYear());
  const [className, setClassName] = useState("Play");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [gender, setGender] = useState("Male");
  const [religion, setReligion] = useState("Islam");
  const [imageFile, setImageFile] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const { data: studentDetails = {}, isLoading } = useQuery({
    queryKey: ["studen", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/student/${id}`);
      return data;
    },
  });
  const handleUpdateData = async (e) => {
    e.preventDefault();
    // image file upload to imageBB:
    let photoURL;
    if (imageFile) {
      photoURL = await imageUpload(imageFile);
    } else {
      photoURL = studentDetails?.image;
    }

    const form = e.target;
    const sectionName = form.branchName.value;
    const groupName = form.departmentName.value;
    const birthRegNo = parseInt(form.birthRegNo.value);
    const studentName = form.studentName.value;
    const classRoll = parseInt(form.classRoll.value);
    const fatherName = form.fatherName.value;
    const motherName = form.motherName.value;
    const mobileNo = parseInt(form.mobileNo.value);
    const updateData = {
      className,
      classRoll,
      sectionName,
      groupName,
      birthRegNo,
      dateOfBirth: birthDate,
      session: session.toString(),
      studentName,
      fatherName,
      motherName,
      bloodGroup,
      gender,
      religion,
      image: photoURL,
      mobileNo,
    };
    try {
      const { data } = await axiosSecure.patch(
        `/update-student/${id}`,
        updateData
      );
      if (data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `সফলভাবে ${studentName} এর তথ্য পরিবর্তন করা হয়েছে!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        navigate("/dashboard/students");
      }
    } catch (err) {
      console.log("Student data adding Error-->", err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full md:w-11/12 max-sm:px-2 mx-auto my-10">
      <form
        onSubmit={handleUpdateData}
        className="card-body max-sm:px-2 bg-green-200 rounded-2xl py-5 md:py-8 "
      >
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          শিক্ষার্থীর তথ্য পরিবর্তন
        </h1>
        <div className="divider my-0"></div>
        <div className="grid gap-2 grid-cols-12">
          {/* class name */}
          <div className="form-control col-span-6 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">শ্রেণি:</span>
            </label>
            {studentDetails?.className && (
              <select
                // value={studentDetails?.className}
                onChange={(e) => setClassName(e.target.value)}
                name="class"
                className="select select-bordered"
                required
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
            )}
          </div>
          {/* roll */}
          <div className="form-control col-span-6 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">রোল নম্বর:</span>
            </label>
            <input
              type="number"
              name="classRoll"
              defaultValue={studentDetails.classRoll}
              placeholder="Type class roll..."
              className="input input-bordered"
              required
            />
          </div>
          {/* section */}
          <div className="form-control col-span-6 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">শাখা:</span>
            </label>
            <input
              type="text"
              name="branchName"
              defaultValue={studentDetails.sectionName}
              placeholder="Type branch name..."
              className="input input-bordered"
            />
          </div>
          {/* Group */}
          <div className="form-control col-span-6 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">বিভাগ:</span>
            </label>
            <input
              type="text"
              name="departmentName"
              defaultValue={studentDetails.groupName}
              placeholder="Type department..."
              className="input input-bordered"
            />
          </div>
          {/* Birth reg no */}
          <div className="form-control col-span-12 md:col-span-8">
            <label className="label">
              <span className="label-text max-sm:text-xs">
                জন্ম নিবন্ধন নম্বর:
              </span>
            </label>
            <input
              type="number"
              name="birthRegNo"
              defaultValue={studentDetails.birthRegNo}
              placeholder="Type birth registration no..."
              className="input input-bordered"
              required
            />
          </div>
          {/* Date of Birth */}
          <div className="form-control col-span-6 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-xs">জন্ম তারিখ:</span>
            </label>
            {studentDetails.dateOfBirth && (
              <DatePicker
                selected={studentDetails.dateOfBirth}
                required
                onChange={(date) => setBirthDate(date)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            )}
          </div>
          {/* Academic year */}
          <div className="form-control col-span-6 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-xs">শিক্ষাবর্ষ:</span>
            </label>

            <select
              onChange={(e) => setSession(e.target.value)}
              name="session"
              defaultValue={studentDetails.session}
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
              <span className="label-text max-sm:text-xs">
                শিক্ষার্থীর নাম:
              </span>
            </label>
            <input
              type="text"
              name="studentName"
              defaultValue={studentDetails.studentName}
              placeholder="Type student name..."
              className="input input-bordered"
              required
            />
          </div>
          {/* fathers name */}
          <div className="form-control col-span-12 md:col-span-6">
            <label className="label">
              <span className="label-text max-sm:text-xs">বাবার নাম:</span>
            </label>
            <input
              type="text"
              name="fatherName"
              defaultValue={studentDetails.fatherName}
              placeholder="Father's name..."
              className="input input-bordered"
            />
          </div>
          {/* Mother's name */}
          <div className="form-control col-span-12 md:col-span-6">
            <label className="label">
              <span className="label-text max-sm:text-xs">মায়ের নাম:</span>
            </label>
            <input
              type="text"
              name="motherName"
              defaultValue={studentDetails.motherName}
              placeholder="Mother's name..."
              className="input input-bordered"
            />
          </div>
          {/* Blood group */}
          <div className="form-control col-span-6 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">রক্তের গ্রুপ:</span>
            </label>

            <select
              defaultValue={studentDetails.bloodGroup}
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
              <span className="label-text max-sm:text-xs">লিঙ্গ:</span>
            </label>

            <select
              defaultValue={studentDetails.gender}
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
              <span className="label-text max-sm:text-xs">ধর্ম:</span>
            </label>

            <select
              defaultValue={studentDetails.religion}
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
              <span className="label-text max-sm:text-xs">
                ছবি (jpg, jpeg, png):
              </span>
            </label>
            <input
              type="file"
              name="imageFile"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
              className="select mb-2 px-4 py-2 select-bordered"
            />
          </div>

          {/* mobile no */}
          <div className="form-control col-span-12 md:col-span-6">
            <label className="label">
              <span className="label-text max-sm:text-xs">
                মা/বাবার মোবাইল নম্বর: (*)
              </span>
            </label>
            <input
              type="number"
              name="mobileNo"
              min={0}
              defaultValue={studentDetails?.mobileNo}
              placeholder="+880123-4567890"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control w-fit ms-auto mt-6">
          <button className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white">
            Update Student's Data
          </button>
        </div>
      </form>
    </div>
  );
}
