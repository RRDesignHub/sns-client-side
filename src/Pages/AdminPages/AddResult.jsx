import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Loading } from "../../components/Shared/Loading";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
export const AddResult = () => {
  const axiosSecure = useAxiosSec();
  const [studentData, setStudentData] = useState({});
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [examName, setExamName] = useState("");
  const [className, setClassName] = useState("Play");
  const [totalMarks, setTotalMarks] = useState(0);
  const [status, setStatus] = useState("");
  const [gpaAverage, setGpaAverage] = useState(0);
  const [averageLetterGrade, setAverageLetterGrade] = useState("");
  const [serverError, setServerError] = useState("");

  // bring student and subject data from db:
  const handleDisplayStudentInfo = async(e) => {
    e.preventDefault();
    const classRoll = e.target.classRoll.value;
    setError(null)
    setStudentData({})
    try{
      const {data} = await axiosSecure.get(`/student?className=${className}&&classRoll=${parseInt(classRoll)}`);
      if(data?.message){
        setServerError(data.message);
      }else{
        setServerError("");
      }
      setStudentData(data);
    }catch(err){
      setError(err.response.data.message);
      console.log("Bring student data Error-->", err);
    }
  };

  const handleSingleSubjectResult = (e) => {
    e.preventDefault();

    const form = e.target;
    const subjectName = form.subjectName.value;
    const marks = parseInt(form.marks.value);

    // Find the subject from studentData.subjects to get totalMarks
    const subject = studentData.subjects.find(
      (sub) => sub.subjectName === subjectName
    );
    if (!subject) {
      Swal.fire("Subject not found!");
      return;
    }

    const totalMarksForSubject = subject.totalMarks; // 100 or 50

    // Validate marks based on totalMarks
    if (marks < 0 || marks > totalMarksForSubject) {
      Swal.fire(
        `Invalid marks entered! Please enter a valid number between 0 and ${totalMarksForSubject}.`
      );
      return;
    }

    // Calculate percentage to standardize grading
    const percentage = (marks / totalMarksForSubject) * 100;
    let GPA, letterGrade;

    // Assign GPA and Letter Grade based on percentage
    if (percentage >= 80) {
      GPA = 5.0;
      letterGrade = "A+";
    } else if (percentage >= 70) {
      GPA = 4.0;
      letterGrade = "A";
    } else if (percentage >= 60) {
      GPA = 3.5;
      letterGrade = "A-";
    } else if (percentage >= 50) {
      GPA = 3.0;
      letterGrade = "B";
    } else if (percentage >= 40) {
      GPA = 2.0;
      letterGrade = "C";
    } else if (percentage >= 33) {
      GPA = 1.0;
      letterGrade = "D";
    } else {
      GPA = 0.0;
      letterGrade = "F";
    }

    const resultData = {
      subjectName,
      marks,
      totalMarks: totalMarksForSubject, // Include totalMarks in result
      GPA,
      letterGrade,
    };

    const updatedResult = [...result, resultData];
    setResult(updatedResult);

   // Calculate total marks achieved
   const totalMarksAchieved = updatedResult.reduce(
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


    // Update status (Pass/Fail) - Check all subjects;  if less 33% = fail
    const hasFailed = updatedResult.some(
      (result) => (result.marks / result.totalMarks) * 100 < 33 
    );
    setStatus(hasFailed ? "Fail" : "Pass");

    //update states
    setTotalMarks(totalMarksAchieved);
    setGpaAverage(gpaAverage);
    setAverageLetterGrade(averageLetterGrade);
    form.reset();
  };

  const handleSubmitResult = async() => {

    if(!examName){
      return setServerError("Exam name select please.")
    }
    const resultInfo = {
      studentID: studentData?.studentID,
      studentName: studentData?.studentName,
      fatherName: studentData.fatherName,
      motherName: studentData.motherName,
      image: studentData.image,
      className: studentData?.className,
      classRoll: studentData?.classRoll,
      examName: examName,
      session: studentData?.session,
      resultData: result,
      totalMarks: totalMarks,
      totalGPA: gpaAverage,
      totalLG: averageLetterGrade,
      status
    };

    try {
      const { data } = await axiosSecure.post(
        `/add-result`,
        resultInfo
      );
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${resultInfo?.studentName}'s result added successfully!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setResult([]);
        setError(null);
        setTotalMarks(0);
        setGpaAverage(0);
        setAverageLetterGrade("");
        setStatus("");
      }
    } catch (err) {
      console.log("Add subject Error-->", err);
    }
  };
console.log(studentData)
  return (
    <>
      <div className="w-11/12 mx-auto my-10">
        <div className="bg-green-200 px-6 py-8 rounded-lg">
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
                  defaultValue={className}
                  name="className"
                  onChange={(e) => setClassName(e.target.value)}
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

              {/* class roll */}
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
                <button className="btn bg-green-600  hover:bg-primary text-white">
                  Search
                </button>
              </div>
            </div>
            {serverError && <p className="text-red-500 text-md text-center pt-3">{serverError}</p>}
          </form>

          <div className="bg-green-100 px-3 rounded-lg py-5 md:py-8">
            <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
              Add Student Result
            </h1>
            <div className="divider my-0"></div>
            <div className="flex max-sm:flex-col justify-center items-center gap-2 md:gap-8 pt-2">
              <h3 className="text-lg">
                Student Name:{" "}
                <span className="font-semibold">
                  {studentData?.studentName || ""}
                </span>
              </h3>
              <h3 className="text-lg">
                Class:<span className="font-semibold">{studentData?.className || ""}</span>
              </h3>
              <h3 className="text-lg">
                Class Roll:<span className="font-semibold">
                  {studentData?.classRoll || ""}
                </span>
              </h3>

              {/* exam name */}
              <div className="form-control flex-row justify-center items-center">
                <label className="block w-full label text-lg">
                  Exam Name :
                </label>
                <select
                  onChange={(e) => setExamName(e.target.value)}
                  name="subjectName"
                  value={examName}
                  className={`w-full h-12 p-2 border rounded-md ${error === "Exam name select please." ? "border-red-400" : "border-gray-300 "}`}
                  required
                >
                  <option value={""} disabled>
                    Select
                  </option>
                  <option value="1st-Semester">1st Semester</option>
                  <option value="2nd-Semester">2nd Semester</option>
                  <option value="3rd-Semester">3rd Semester</option>
                  <option value="Half-Yearly">Half Yearly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
            </div>

            {result.length ? (
              <div className="bg-green-50 p-5 rounded-xl mt-5 mx-8">
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
                    <option disabled>Select</option>
                    {studentData.subjects &&
                      studentData?.subjects?.map((singleSubData, index) => (
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
                type="button"
                  onClick={handleSubmitResult}
                  className="btn bg-green-600 px-5 hover:bg-green-700 text-lg text-white"
                >
                  Submit Result
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
