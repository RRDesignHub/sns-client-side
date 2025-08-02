import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";
import imageUpload from "../../../Api/Utils";
export default function UpdateStudent() {
  const { id } = useParams();
  const axiosSecure = useAxiosSec();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: async () => {
      const res = await axiosSecure.get(`/student/${id}`);
      const student = res.data;
      return {
        ...student,
        dateOfBirth: new Date(student.dateOfBirth),
      };
    },
  });

  const onSubmit = async (data) => {
    try {
      // upload image if any
      if (imageFile) {
        const photoURL = await imageUpload(imageFile);
        data.image = photoURL;
      }

      const { data: response } = await axiosSecure.patch(
        `/update-student/${id}`,
        data
      );

      if (response.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `সফলভাবে ${data.studentName} এর তথ্য পরিবর্তন করা হয়েছে!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset(); // reset form
        navigate("/dashboard/students");
      }
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div className="w-full md:w-11/12 max-sm:px-2 mx-auto my-10">
      {!register ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body max-sm:px-2 bg-green-200 rounded-2xl py-5 md:py-8 "
        >
          <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
            শিক্ষার্থীর তথ্য পরিবর্তন
          </h1>
          <div className="divider my-0"></div>
          <div className="grid gap-2 grid-cols-12">
            {/* Class Name */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">শ্রেণি:</span>
              </label>
              <select
                {...register("className")}
                className="select select-bordered"
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
                ].map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Roll Number */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">রোল নম্বর:</span>
              </label>
              <input
                type="number"
                {...register("classRoll", { required: true })}
                placeholder="Type class roll..."
                className="input input-bordered"
              />
            </div>

            {/* Section */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">শাখা:</span>
              </label>
              <input
                type="text"
                {...register("sectionName")}
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
                {...register("groupName")}
                placeholder="Type department..."
                className="input input-bordered"
              />
            </div>

            {/* Birth Registration No */}
            <div className="form-control col-span-12 md:col-span-8">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  জন্ম নিবন্ধন নম্বর:
                </span>
              </label>
              <input
                type="number"
                {...register("birthRegNo", { required: true })}
                placeholder="Type birth registration no..."
                className="input input-bordered"
              />
            </div>

            {/* Date of Birth */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text max-sm:text-xs">জন্ম তারিখ:</span>
              </label>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                )}
              />
            </div>

            {/* Session */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text max-sm:text-xs">শিক্ষাবর্ষ:</span>
              </label>
              <select
                {...register("session")}
                className="select select-bordered"
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

            {/* Student Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  শিক্ষার্থীর নাম:
                </span>
              </label>
              <input
                type="text"
                {...register("studentName", { required: true })}
                placeholder="Type student name..."
                className="input input-bordered"
              />
            </div>

            {/* Father's Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">বাবার নাম:</span>
              </label>
              <input
                type="text"
                {...register("fatherName")}
                placeholder="Father's name..."
                className="input input-bordered"
              />
            </div>

            {/* Mother's Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">মায়ের নাম:</span>
              </label>
              <input
                type="text"
                {...register("motherName")}
                placeholder="Mother's name..."
                className="input input-bordered"
              />
            </div>

            {/* Blood Group */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">রক্তের গ্রুপ:</span>
              </label>
              <select
                {...register("bloodGroup")}
                className="select select-bordered"
              >
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
                {...register("gender")}
                className="select select-bordered"
              >
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
                {...register("religion")}
                className="select select-bordered"
              >
                {["Islam", "Hindu", "Cristian"].map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
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

            {/* Mobile Number */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  মা/বাবার মোবাইল নম্বর: (*)
                </span>
              </label>
              <input
                type="number"
                min={0}
                {...register("mobileNo", { required: true })}
                placeholder="+880123-4567890"
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="form-control w-fit ms-auto mt-6">
            <button className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white">
              Update Student's Data
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
