import { useState } from "react";
import Swal from "sweetalert2";
export const AddResult = () => {
  const [student, setStudent] = useState(null);
  const [subjectsData, setSubjectsData] = useState([]);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [examName, setExamName] = useState("");
  const [clsName, setClsName] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [gpaAverage, setGpaAverage] = useState(0);
  const [averageLetterGrade, setAverageLetterGrade] = useState("");
  const handleDisplayStudentInfo = (e) => {
    e.preventDefault();
    const clsRoll = e.target.classRoll.value;
    fetch(
      `https://snkh-school-server-side.vercel.app/students/${clsName}/${clsRoll}`
    )
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
      .then((data) => setSubjectsData(data.subjects))
      .catch((err) => console.error("Failed to fetch subjects:", err));
  };

  const handleSingleSubjectResult = (e) => {
    e.preventDefault();

    const form = e.target;
    const subjectName = form.subjectName.value;
    const marks = parseInt(form.marks.value);
    let GPA, letterGrade;

    if (marks >= 80 && marks <= 100) {
      GPA = 5.0;
      letterGrade = "A+";
    } else if (marks >= 70 && marks <= 79) {
      GPA = 4.0;
      letterGrade = "A";
    } else if (marks >= 60 && marks <= 69) {
      GPA = 3.5;
      letterGrade = "A-";
    } else if (marks >= 50 && marks <= 59) {
      GPA = 3.0;
      letterGrade = "B";
    } else if (marks >= 40 && marks <= 49) {
      GPA = 2.0;
      letterGrade = "C";
    } else if (marks >= 33 && marks <= 39) {
      GPA = 1.0;
      letterGrade = "D";
    } else if (marks >= 0 && marks <= 32) {
      GPA = 0.0;
      letterGrade = "F";
    } else {
      alert(
        "Invalid marks entered! Please enter a valid number between 0 and 100."
      );
      return;
    }

    const resultData = {
      subjectName,
      marks,
      GPA,
      letterGrade,
    };

    const updatedResult = [...result, resultData];
    setResult(updatedResult);

    //calculate total marks:
    const totalMarks = updatedResult.reduce(
      (total, subject) => total + subject.marks,
      0
    );
    // Calculate GPA Average
    const totalGPA = updatedResult.reduce(
      (total, subject) => total + subject.GPA,
      0
    );
    const gpaAverage = totalGPA / updatedResult.length;

    // Determine Average Letter Grade
    let averageLetterGrade = "";
    if (gpaAverage >= 5) averageLetterGrade = "A+";
    else if (gpaAverage >= 4) averageLetterGrade = "A";
    else if (gpaAverage >= 3.5) averageLetterGrade = "A-";
    else if (gpaAverage >= 3) averageLetterGrade = "B";
    else if (gpaAverage >= 2) averageLetterGrade = "C";
    else if (gpaAverage >= 1) averageLetterGrade = "D";
    else averageLetterGrade = "F";

    setResult(updatedResult);
    setTotalMarks(totalMarks);
    setGpaAverage(gpaAverage);
    setAverageLetterGrade(averageLetterGrade);
    form.reset();
  };

  const handleSubmitResult = () => {
    const resultData = {
      examName: examName,
      studentName: student?.studentName,
      clsName: student?.className,
      clsRoll:student?.classRoll,
      resultData: result,
      totalMarks: totalMarks,
      totalGPA: gpaAverage,
      totalLG: averageLetterGrade,
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
            {/* class name */}
            <div className="form-control flex-row items-center gap-1">
              <label className="label">
                <span className="label-text text-lg md:text-xl font-semibold">
                  Class:
                </span>
              </label>
              <select
                defaultValue={"Select a class"}
                onChange={(e) => setClsName(e.target.value)}
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
          <div className="flex max-sm:flex-col justify-center items-center gap-2 md:gap-8 pt-5">
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
            <div className="form-control flex-row justify-center items-center">
              <label className="block w-full label text-lg">Exam Name :</label>
              <select
              onChange={(e) => setExamName(e.target.value)}
                name="subjectName"
                defaultValue="Select"
                className="w-full h-12 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled >
                  Select
                </option>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="Half Yearly">Half Yearly</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
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
                        <td>{singleSubject?.subjectName}</td>
                        <td>{singleSubject?.marks}</td>
                        <td>{singleSubject?.GPA}</td>
                        <td>{singleSubject?.letterGrade}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="font-bold">Total</td>
                      <td className="font-bold">{totalMarks}</td>
                      <td className="font-bold">{gpaAverage.toFixed(2)}</td>
                      <td className="font-bold">{averageLetterGrade}</td>
                    </tr>
                  </tfoot>
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
              <div className="form-control col-span-12 md:col-span-6">
                <label className="block label text-gray-700">
                  Subject Name
                </label>
                <select
                  defaultValue="Select"
                  name="subjectName"
                  className="w-full h-12 p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option disabled >
                    Select
                  </option>
                  {subjectsData &&
                    subjectsData.map((singleSubData, index) => (
                      <option value={singleSubData.subjectName} key={index}>
                        {singleSubData.subjectName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-control col-span-6 md:col-span-3">
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

              <button className="max-sm:col-span-6 md:col-span-3 btn bg-green-100 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
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
