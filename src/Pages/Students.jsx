import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "../components/Shared/Loading";
import { useState } from "react";
import StudentCard from "../components/StudentCard";

export default function Students() {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [enabled, setUnabled] = useState(false);
  const {
    data: students = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_API
        }/students?className=${selectedClass}&&session=${selectedYear}`
      );
      return data;
    },
    enabled,
  });

  const handleFilter = async () => {
    setUnabled(true);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log(students);
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="grid grid-cols-4 max-sm:gap-4">
        {/* Filter Section */}
        <div className="col-span-4 md:col-span-3 flex max-sm:flex-col gap-3 md:gap-8 ">
          <div className="flex items-center max-sm:justify-center gap-5 md:gap-2">
            <p className="text-green-800">শ্রেণী:</p>
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

          <div className="flex items-center max-sm:justify-center gap-5 md:gap-2">
            <p className="text-green-800">শিক্ষাবর্ষ:</p>
            <select
            className="border border-gray-300 p-2 rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
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
            className="bg-green-200 text-green-950 px-4 py-2 rounded-md"
            onClick={handleFilter}
          >
            সার্চ করুন
          </button>
        </div>
        <div className="col-span-4">
          <h3 className="text-2xl text-green-950">
            মোট শিক্ষার্থী: <span className="font-bold">{students?.length}</span> জন
          </h3>
        </div>
      </div>
      <div className="divider"></div>
      {/* Student Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {students.length === 0 ? (
          <>
            <h2 className="col-span-4 text-center pt-5 text-3xl font-semibold text-green-950/80">
              দয়া করে শ্রেণী নির্বাচন করুন...
            </h2>
          </>
        ) : (
          students?.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))
        )}
      </div>
    </div>
  );
}
