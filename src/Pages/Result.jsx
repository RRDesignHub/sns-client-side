import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../components/Shared/Loading";
export const Result = () => {
  const [resultData, setResultData] = useState(null);
  const [examName, setExamName] = useState("");
  const [clsName, setClsName] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [status, setStatus] = useState(null);

  const handleDisplayStudentResult = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const classRoll = form.classRoll.value;
    fetch(
      `https://snkh-school-server-side.vercel.app/results/${examName}/${clsName}/${classRoll}`
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || "Failed to fetch results");
          });
        }
        return res.json(); 
      })
      .then((data) => {
        setResultData(data);
        
        setLoading(false); 
      })
      .catch((err) => {
        setLoading(false); 
        setServerError(err.message); 
      });
  };

    useEffect(() =>{
      const allPassed = resultData?.resultData?.every(
        singleSubject => singleSubject?.marks >= 33
      );
      setStatus(allPassed ? "Pass" : "Fail");
    }, [resultData])
  return (
    <>
      <Helmet>
        <title>SN-Result</title>
      </Helmet>
      <div className="bg-blue-50">
        <div>
          <form
            onSubmit={handleDisplayStudentResult}
            className="card-body lg:w-3/4 md:mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-center md:items-center gap-2 md:gap-5">
              {/* exam name */}
              <div className="form-control flex-row justify-start md:justify-center md:items-center">
                <label className="block w-full label text-lg md:text-xl font-semibold">
                  Exam Name :
                </label>
                <select
                  defaultValue={"Select"}
                  onChange={(e) => setExamName(e.target.value)}
                  name="subjectName"
                  className="w-full h-12 p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="Half Yearly">Half Yearly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
              {/* class name */}
              <div className="form-control flex-row justify-between md:items-start gap-1">
                <label className="label">
                  <span className="label-text w-full text-lg md:text-xl font-semibold">
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
              {/* class roll */}
              <div className="form-control flex-row justify-start md:items-center gap-1">
                <label className="label">
                  <span className="label-text text-lg md:text-xl font-semibold">
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
            {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          </form>
        </div>
        <div className="w-[95%] md:w-11/12 mx-auto pb-5">
          {/* Initial Message */}
          {!resultData && !loading && !serverError && (
            <p className="text-center">
              Please enter the exam details and click "Search" to view the
              result.
            </p>
          )}
          {!resultData && !loading && serverError && (
            <p className="text-center">
              {serverError}
            </p>
          )}
          {loading && <Loading></Loading>}
          {resultData && (
            <>
              <div className="bg-white py-5 px-2 md:p-5 rounded-xl mt-5 md:mx-8">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-2xl md:text-3xl text-center font-semibold">
                    Shah Neyamat (RH:) KG & High School
                  </h2>
                  <h3 className="text-lg md:text-xl text-center font-semibold">
                    {resultData?.examName} Exam: 2024
                  </h3>
                </div>
                <div className="py-5 grid grid-cols-12 gap-y-2 justify-between p-5">
                  <div className="col-span-12 md:col-span-7 max-sm:space-y-2 ">
                    {/* student name */}
                    <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                      <strong className="col-span-6 md:col-span-3">
                        Student Name
                      </strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-8">
                        {resultData?.studentName}
                      </span>
                    </h3>
                    {/* class name */}
                    <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                      <strong className="col-span-6 md:col-span-3">
                        Class
                      </strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-8">
                        {resultData?.clsName}
                      </span>
                    </h3>
                    {/* Roll no */}
                    <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                      <strong className="col-span-6 md:col-span-3">Roll</strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-8">
                        {resultData?.clsRoll}
                      </span>
                    </h3>
                    
                  </div>
                  <div className=" md:ms-auto col-span-12 md:col-span-5">
                    <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                      <strong className="col-span-6 md:col-span-7">Total Marks</strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-4">
                        {resultData?.totalMarks}
                      </span>
                    </h3>
                    <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                      <strong className="col-span-6 md:col-span-7">GPA</strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-4">
                        {resultData?.totalGPA?.toFixed(2)}
                      </span>
                    </h3>
                    <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                      <strong className="col-span-6 md:col-span-7 ">Letter Grade</strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-4">{resultData?.totalLG}</span>
                    </h3>
                    {/* Status */}
                    <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                      <strong className="col-span-6 md:col-span-7">Status</strong>{" "}
                      <span className="col-span-1">:</span>{" "}
                      <span className="col-span-5 md:col-span-4">
                        {status}
                      </span>
                    </h3>
                  </div>
                </div>
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
                      {resultData?.resultData?.map((singleSubject, index) => (
                        <tr key={index}>
                          <td>{singleSubject?.subjectName}</td>
                          <td>{singleSubject?.marks}</td>
                          <td>{singleSubject?.GPA}</td>
                          <td>{singleSubject?.letterGrade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
