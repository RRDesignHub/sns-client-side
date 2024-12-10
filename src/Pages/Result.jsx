import React, { useState } from "react";

export const Result = () => {
  const [resultData, setResultData] = useState(null);

  const handleDisplayStudentResult = (e) => {
    e.preventDefault();

    const form = e.target;
    const clsName = form.className.value;
    const classRoll = form.classRoll.value;

    fetch(
      `https://snkh-school-server-side.vercel.app/results/${clsName}/${classRoll}`
    )
      .then((res) => res.json())
      .then((data) => setResultData(data));
  };
  
  return (
    <>
      <div className="bg-blue-50">
        <div>
          <form
            onSubmit={handleDisplayStudentResult}
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
            {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          </form>
        </div>
        <div className="w-11/12 mx-auto ">
          {resultData ? (
            <div className="bg-white p-5 rounded-xl mt-5 mx-8">
              <div className="py-5 flex gap-y-2 justify-between p-5">
                <div className=" ">
                  <h3 className="text-lg ">
                    <strong>Student Name:</strong> {resultData?.studentName}
                  </h3>
                  <h3 className="text-lg ">
                    <strong>Class:</strong> {resultData?.clsName}
                  </h3>
                  <h3 className="text-lg ">
                    <strong>Roll:</strong> {resultData?.clsRoll}
                  </h3>
                </div>
                <div>
                <h3 className="text-lg ">
                  <strong>Total Marks:</strong> {resultData?.totalMarks}
                </h3>
                <h3 className="text-lg col-span-2">
                 <strong>GPA:</strong> {resultData?.totalGPA.toFixed(2)}
                </h3>
                <h3 className="text-lg col-span-2">
                  <strong>Letter Grade:</strong> {resultData?.totalLG}
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
                    {resultData?.resultData.map((singleSubject, index) => (
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
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
