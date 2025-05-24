import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
export const AddSubject = () => {
  const axiosSecure = useAxiosSec();
  const [className, setClassName] = useState("Play");
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
    setSubjects([...subjects, subjectData]);
    form.reset();
  };

  const handleSubjectsDataSubmit = async () => {
    if (!className) {
      return setError("Please select a class...");
    }
    const subjectData = {
      className,
      subjects: subjects,
    };

    try {
      const { data } = await axiosSecure.post(
        `/add-subjects`,
        subjectData
      );
      if(data?.message === "Already subjecs added for this class."){
       return Swal.fire({
          position: "center",
          icon: "info",
          title: `${data?.message}!`,
        });
      }
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Class ${className}'s subjects added successfully!!!`,
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
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">বিষয় সংযুক্তি</h1>
        <div className="divider my-0"></div>
        
        <div className="flex justify-center items-center gap-4 mb-4">
          <label className="label text-xl font-semibold">শ্রেণী:</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
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
            <label className="label font-semibold">বিষয়ের নাম:</label>
            <input
              type="text"
              name="subject"
              placeholder="ইংরেজিতে বিষয়ের নাম..."
              className="input input-bordered w-full"
              required
            />
          </div>

          {/*subjectCode*/}
          <div className="flex flex-col">
            <label className="label font-semibold">বিষয় কোড:</label>
            <input
              type="text"
              name="subjectCode"
              placeholder="ইংরেজিতে বিষয় কোড..."
              className="input input-bordered w-full"
              required
            />
          </div>

          {/*subject type*/}
          <div className="flex flex-col">
            <label className="label font-semibold">বিষয়ের ধরণ:</label>
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
            <label className="label font-semibold">মোট নম্বর:</label>
            <input
              type="number"
              name="totalMarks"
              placeholder="কয় নম্বরে পরীক্ষা?"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/*assigned teacher*/}
          <div className="flex flex-col">
            <label className="label font-semibold">শিক্ষক/শিক্ষিকা:</label>
            <input
              type="text"
              name="teacher"
              placeholder="শিক্ষক/শিক্ষিকা যিনি পড়ান (Optional)"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col items-center justify-end">
            <button className="btn btn-outline w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              বিষয় যোগ করুন
            </button>
          </div>
        </form>

        {subjects.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-5">
            <h2 className="text-lg text-center font-semibold mb-3">সংযুক্ত বিষয়ের তালিকা : {subjects.length} টি</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>বিষয়ের নাম</th>
                    <th>বিষয় কোড</th>
                    <th>বিষয়ের ধরণ</th>
                    <th>মোট নম্বর</th>
                    <th>শিক্ষক/শিক্ষিকা</th>
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
            বিষয়সমূহ যোগ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
