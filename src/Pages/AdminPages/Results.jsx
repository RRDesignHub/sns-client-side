import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { Loading } from "../../components/Shared/Loading";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { FaFilePdf } from "react-icons/fa";
const Results = () => {
  const axiosSecure = useAxiosSec();
  const [className, setClassName] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [examName, setExamName] = useState("");
  const [enabled, setUnabled] = useState(false);
  const [error, setError] = useState(
    "শ্রেণী, শিক্ষাবর্ষ ও পরীক্ষা নির্বাচন করুন!"
  );

  const {
    data: resultData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["resultData", className, session, examName],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/results?className=${className}&&session=${session}&&examName=${examName}`
      );
      if (data?.message) {
        setError(data.message);
      } else {
        setError(null);
      }
      return data;
    },
    enabled,
  });

  const handleFilter = () => {
    if (className === "" && examName === "") {
      setError("শ্রেণী, শিক্ষাবর্ষ ও পরীক্ষা নির্বাচন করুন!");
      return;
    }
    setUnabled(true);
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You have to again add this!",
        icon: "warning",
        color: "#064E3B",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/result/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Result has been deleted.",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch (err) {
      console.log("Delete student Error--->", err);
    }
  };

  return (
    <div className="max-sm:ml-1 max-sm:mt-1 md:w-11/12 mx-auto md:my-10">
      <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
        <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          শ্রেণী/ বিষয় ভিত্তিক ফলাফল
        </h2>
        <div className="divider my-0"></div>
        {/* Filter Inputs */}
        <div className="grid grid-cols-12 md:grid-cols-10 gap-4 mb-5">
          {/* choose class */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">শ্রেণী:</span>
            </label>
            <select
              onChange={(e) => setClassName(e.target.value)}
              value={className}
              className="select select-bordered bg-white  text-gray-700"
            >
              <option value="">Choose class...</option>
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
                  Class {className}
                </option>
              ))}
            </select>
          </div>

          {/* select year */}
          <div className="form-control col-span-12 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-lg">শিক্ষাবর্ষ:</span>
            </label>
            <select
              onChange={(e) => setSession(parseInt(e.target.value))}
              name="session"
              value={session}
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

          {/* choose exam */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">পরীক্ষার নাম:</span>
            </label>
            <select
              onChange={(e) => setExamName(e.target.value)}
              name="subjectName"
              value={examName}
              className={`select select-bordered`}
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

          <div className="col-span-6 md:col-span-2 flex items-end">
            <button
              onClick={handleFilter}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              সার্চ করুন
            </button>
          </div>
        </div>
        <div className="divider my-0"></div>

        {isLoading && <Loading />}
        {/* Display Results */}
        {resultData.length === 0 ? (
          <p className="text-center text-gray-500">{error}</p>
        ) : error ? (
          <p className="py-2 text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full table">
            <thead>
              <tr className="bg-green-600 text-green-50 ">
                <th>শিক্ষার্থীর নাম</th>
                <th>শ্রেণী</th>
                <th>রোল</th>
                <th>মোট নম্বর</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!error &&
                resultData.length > 0 &&
                resultData?.map((result) => (
                  <tr key={result._id} className="">
                    <td>{result.studentName}</td>
                    <td>{result.className}</td>
                    <td>{result.classRoll}</td>
                    <td>{result.totalMarks}</td>
                    <td>{result.totalLG}</td>
                    <td>{result.status}</td>
                    <td className="flex justify-center gap-1 items-center">
                      <Link
                        to={`/dashboard/result/${result._id}`}
                        className="btn btn-sm bg-green-50 text-primary"
                      >
                        Print <FaFilePdf />
                      </Link>
                      <button
                        onClick={() => handleDelete(result._id)}
                        className="btn btn-sm text-lg bg-red-500 hover:bg-red-600 text-white"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Results;
