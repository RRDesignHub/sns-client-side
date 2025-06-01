import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "../components/Shared/Loading";
import { useState } from "react";
import StudentCard from "../components/StudentCard";

export default function Students() {
  const [selectedClass, setSelectedClass] = useState("Play");
  const [session, setSession] = useState(new Date().getFullYear().toString());
  const [enabled, setUnabled] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    data: students = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", selectedClass, session],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_API
        }/client-all-students?className=${selectedClass}&session=${session}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError(null);
      }
      return data;
    },
    enabled,
  });

  const handleFilter = async () => {
    setServerError(null);
    setUnabled(true);
    refetch();
  };

  return (
    <div className="w-11/12 mx-auto pt-5 md:pt-10 mb-5 md:mb-10">
      <div className="grid grid-cols-4 max-sm:gap-4">
        {/* Filter Section */}
        <div className="col-span-4 md:col-span-3 flex max-sm:items-end gap-3 md:gap-8 ">
          <div className="flex max-sm:flex-col md:items-center  gap-2 md:gap-2">
            <p className="text-green-800 max-sm:text-xs">শ্রেণী:</p>
            <select
              className="border border-gray-300 p-2 rounded-md"
              defaultValue={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
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

          <div className="flex max-sm:flex-col md:items-center  gap-2 md:gap-2">
            <p className="text-green-800 max-sm:text-xs">শিক্ষাবর্ষ:</p>
            <select
              className="border border-gray-300 p-2 rounded-md"
              value={session}
              onChange={(e) => setSession(e.target.value.toString())}
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

          <button
            className="bg-green-200 max-sm:h-fit max-sm:text-sm text-green-950 px-4 py-2 rounded-md"
            onClick={handleFilter}
          >
            সার্চ করুন
          </button>
        </div>
        <div className="max-sm:col-span-4 col-span-1">
          <h3 className="text-sm max-sm:text-center md:text-2xl text-green-950">
            মোট শিক্ষার্থী:{" "}
            <span className="font-bold">{students?.length || 0}</span> জন
          </h3>
        </div>
      </div>
      <div className="divider my-0"></div>
      {/* Student Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {isLoading ? (
          <div className="col-span-4 ">
            <Loading />
          </div>
        ) : serverError ? (
          <p className="col-span-4 text-red-500 text-center max-sm:text-xs">{serverError}</p>
        ) : students.length > 0 ? (
          students
            .sort((a, b) => a.classRoll - b.classRoll)
            .map((student) => (
            <StudentCard key={student._id} student={student} />
          ))
        ) : (
          <h2 className="col-span-4 text-center pt-5 max-sm:text-xs">
            দয়া করে শ্রেণী নির্বাচন করুন এবং "Search" এ ক্লিক করুন...
          </h2>
        )}
      </div>
    </div>
  );
}
