import { useState } from "react";
import Swal from "sweetalert2";
export const AddResult = () => {
  const [student, setStudent] = useState(null);
  const [subjectsData, setSubjectsData] = useState(null);
  const [subject, setSubject] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDisplayStudentInfo = (e) => {
    e.preventDefault();
    const clsName = e.target.className.value;
    const clsRoll = e.target.classRoll.value;
    fetch(`https://snkh-school-server-side.vercel.app/students/${clsName}/${clsRoll}`)
      .then((res) => res.json())
      .then((data) => {
        setError(null);
        setStudent(null);
        if (data.message) {
          setError(data.message);
        } else {
          setStudent(data);
        }
      });

    fetch(`https://snkh-school-server-side.vercel.app/subjects/${clsName}`)
      .then((res) => res.json())
      .then((data) => setSubjectsData(data.subjects));

    console.log(subjectsData);
  };

  const handleSingleSubjectResult = (e) => {
    e.preventDefault();

    const form = e.target;
    // const subjectName = form.subject.value;
    const marks = form.marks.value;
    const GPA = form.gradePoint.value;
    const latterGrade = form.latterGrade.value;

    const resultData = {
      subjectName,
      marks,
      GPA,
      latterGrade,
    };

    setResult([...result, resultData]);
    form.reset();
  };

  const handleSubmitResult = () => {
    const resultData = {
      studentName: student?.studentName,
      clsName: student?.className,
      clsRoll: student?.classRoll,
      resultData: result,
    };

    fetch("https://snkh-school-server-side.vercel.app/results", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(resultData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${resultData.studentName}'s result data successfully added.`,
            showConfirmButton: false,
            timer: 1500,
          });
          setResult([]);
          setStudent(null);
        }
      });
  };

  return (
    <>
      <div className="w-11/12 mx-auto mb-10">
        <form
          onSubmit={handleDisplayStudentInfo}
          className="card-body w-3/4 mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5">
            <div className="form-control flex-row items-center gap-1">
              <label className="label">
                <span className="label-text text-lg md:text-xl font-semibold">
                  Class:
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                name="className"
                placeholder="Class 1-10"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-row items-center gap-1">
              <label className="label">
                <span className="label-text  md:text-xl font-semibold">
                  Class Roll:
                </span>
              </label>
              <input
                type="number"
                name="classRoll"
                placeholder="Student roll"
                className="input input-bordered "
                required
              />
            </div>
            <div className="form-control">
              <button className="btn bg-green-100  hover:bg-green-600 hover:text-white">
                Search
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        <div className="bg-green-50 px-3 rounded-lg py-5 md:py-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Add Student Result
          </h1>
          <div className="flex max-sm:flex-col justify-center md:gap-8 pt-5">
            <h3 className="text-lg">
              Student Name:{" "}
              <span className="font-semibold">
                {student?.studentName || ""}
              </span>
            </h3>
            <h3 className="text-lg">
              Class:{" "}
              <span className="font-semibold">{student?.className || ""}</span>
            </h3>
            <h3 className="text-lg">
              Class Roll:{" "}
              <span className="font-semibold">{student?.classRoll || ""}</span>
            </h3>
          </div>

          {result.length ? (
            <div className="bg-white p-5 rounded-xl mt-5 mx-8">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Subject Name</th>
                      <th>Marks</th>
                      <th>Grade Point</th>
                      <th>Latter Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((singleSubject, index) => (
                      <tr key={index}>
                        <td>{singleSubject.subjectName}</td>
                        <td>{singleSubject.marks}</td>
                        <td>{singleSubject.GPA}</td>
                        <td>{singleSubject.latterGrade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}

          <form
            onSubmit={handleSingleSubjectResult}
            className="card-body max-sm:px-0"
          >
            <div className="grid gap-3 grid-cols-12 items-end">
              <div className="mb-4 col-span-4 md:col-span-3">
                <label className="block font-medium text-gray-700">
                  Subject Name
                </label>
                <select
                  name="subjectName"
                  // value={subject}
                  // onChange={(e)=> setSubject(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value='Select' disabled>Select</option>
                  <option value='Select1' >Select1</option>
                  <option value='Select2' >Select2</option>
                  {
                    subjectsData && subjectsData.map((singleSubData, index) =>{
                      <option value={singleSubData.subjectName} key={index} >{singleSubData.subjectName}</option>
                    })
                  }
                </select>
              </div>
              <div className="form-control col-span-4 md:col-span-3">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>
                <input
                  type="number"
                  name="marks"
                  placeholder="Marks"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control col-span-6 md:col-span-2">
                <label className="label">
                  <span className="label-text">GPA</span>
                </label>
                <input
                  type="number"
                  name="gradePoint"
                  step="0.01"
                  placeholder="Grade Point"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control col-span-6 md:col-span-2">
                <label className="label">
                  <span className="label-text">Latter Grade</span>
                </label>
                <input
                  type="text"
                  name="latterGrade"
                  placeholder="Latter Grade"
                  className="input input-bordered"
                  required
                />
              </div>
              <button className="btn bg-green-100 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                Add
              </button>
            </div>

            <div className="form-control w-fit ms-auto mt-6">
              <button
                onClick={handleSubmitResult}
                className="btn bg-green-600 px-5 hover:bg-green-700 text-lg text-white"
              >
                Submit Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
