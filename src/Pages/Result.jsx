import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../components/Shared/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const Result = () => {
  const [examName, setExamName] = useState("");
  const [clsName, setClsName] = useState("");
  const [classRoll, setClassRoll] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [enabled, setEnabled] = useState(false);


  const {data:resultData= {}, isLoading, refetch} = useQuery({
    enabled,
    queryKey: ["result", clsName, classRoll, examName],
    queryFn: async() =>{
      const {data} = await axios(`${import.meta.env.VITE_SERVER_API}/results/${examName}/${clsName}/${classRoll}`);
      return data;
    }
  })

  const handleDisplayStudentResult = () => {
   setEnabled(true);
   refetch();
  };

 
  return (
    <>
      <Helmet>
        <title>SN-Result</title>
      </Helmet>
      <div className="bg-blue-50">
        
          <div
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
                  onChange={(e) => setClassRoll(e.target.value)}
                  placeholder="Student roll"
                  className="input input-bordered "
                  required
                />
              </div>
              <div className="form-control">
                <button  
                onClick={handleDisplayStudentResult}
                className="btn bg-green-700  hover:bg-green-600 text-white">
                  Search
                </button>
              </div>
            </div>
            {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
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
            <p className="text-center">{serverError}</p>
          )}
          {isLoading && <Loading></Loading>}
          {resultData && (
            <>
              <div className={`max-sm:mx-2 md:w-11/12 mx-auto`}>
                <div
                  style={{ backgroundColor: "#bbf7d0" }}
                  className=" px-3 rounded-lg py-5 md:py-8"
                >
                  <div className="flex flex-col justify-center items-center">
                    <h2
                      style={{ color: "#052e16" }}
                      className="text-2xl md:text-4xl font-bold text-center"
                    >
                      Shah Neyamat (RH:) KG & High School
                    </h2>
                    <h3 className="text-lg md:text-xl text-center font-semibold">
                      {resultData?.examName} Exam: {resultData.academicYear}
                    </h3>
                  </div>
                  <div className="divider my-0"></div>
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
                          {resultData?.className}
                        </span>
                      </h3>
                      {/* Roll no */}
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-3">
                          Roll
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-8">
                          {resultData?.classRoll}
                        </span>
                      </h3>
                    </div>
                    <div className=" md:ms-auto col-span-12 md:col-span-5">
                      <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                        <strong className="col-span-6 md:col-span-7">
                          Total Marks
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData?.totalMarks}
                        </span>
                      </h3>
                      <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                        <strong className="col-span-6 md:col-span-7">
                          GPA
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData?.totalGPA < 1
                            ? 0
                            : resultData?.totalGPA?.toFixed(2)}
                        </span>
                      </h3>
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-7 ">
                          Letter Grade
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData?.totalLG}
                        </span>
                      </h3>
                      {/* Status */}
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-7">
                          Status
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData.status}
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
               
              </div>
              ;
            </>
          )}
        </div>
      </div>
    </>
  );
};
