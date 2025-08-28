import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useState } from "react";
import { Loading } from "../../../components/Shared/Loading";
import SeatCardPDF from "../../../components/Dashboard/ExamSeatCardPDF/SeatCardPDF";

const SpecialTask = () => {
  const axiosSecure = useAxiosSec();
  const [examName, setExamName] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [serverError, setServerError] = useState("");
  const [enabled, setUnabled] = useState(false);
  const [seatCards, setSeatCards] = useState(false);

  // all students data fro admin and teachers dashboard
  const {
    data: students = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", filterByClass, session],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students?session=${session}&&className=${filterByClass}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError("");
      }
      return data || [];
    },
    enabled,
  });

  

  // filter all students from db
  const handleFilter = (e) => {
    e.preventDefault();
    const form = e.target;
    const className = form.className.value;
    const session = form.session.value;
    setFilterByClass(className);
    setSession(session);
    setUnabled(true);
    refetch();
  };

  // whole class pdf open modal:
  const openSeatCards = () => {
    if(examName == ""){
      return setServerError("পরীক্ষার নাম নির্বাচন করুন।")
    }
    setSeatCards(true);
  };
  // whole class pdf open modal:
  const closeSeatCards = () => {
    setSeatCards(false);
  };

  const tasks = [
    { id: 1, name: "পরীক্ষার সিট কার্ড তৈরি", action: "Generate", clickFunc: openSeatCards },
    { id: 2, name: "শিক্ষার্থীর আইডি কার্ড তৈরি", action: "Generate" },
    { id: 3, name: "অ্যাডমিট কার্ড প্রিন্ট", action: "Print" },
    { id: 4, name: "রিপোর্ট কার্ড তৈরি", action: "Generate" },
  ];

  return (
    <>
      <div className="p-6 min-h-screen">
        {/* Filter Inputs */}
        <form
          className="grid grid-cols-12 gap-4 mb-5 bg-green-100 p-4 rounded-lg justify-items-center"
          onSubmit={handleFilter}
        >
          {/* choose class */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">শ্রেণী:</span>
            </label>
            <select
              defaultValue={""}
              name="className"
              className="select select-bordered w-full"
              required
            >
              <option value="">শ্রেণী নির্বাচন করুন</option>
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
                  শ্রেণী-{className}
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
              name="session"
              defaultValue={""}
              className="select select-bordered"
              required
            >
              <option value="">শিক্ষাবর্ষ নির্বাচন করুন</option>
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

          <div className="col-span-6 md:col-span-2 flex items-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                students.length === 0 ? "bg-red-500" : "bg-green-600"
              }  text-white  hover:bg-green-700 transition`}
            >
              সার্চ করুন
            </button>
          </div>

          <div className="col-span-6 md:col-span-5 my-auto">
            {students.length > 0 && (
              <div className="text-sm md:text-lg text-green-950 font-semibold">
                <h2>শ্রেণী : {filterByClass}</h2>
                <h2>মোট শিক্ষার্থী: {students.length} জন</h2>
              </div>
            )}
          </div>
        </form>

        {isLoading && <Loading />}

        {/* table for the diffrent task */}

        {students.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">টাস্কের নাম</th>
                  <th className="py-3 px-4 text-left">টাস্ক তথ্য</th>
                  <th className="py-3 px-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-green-50">
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {task.name}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      <select
                    onChange={(e) => setExamName(e.target.value)}
                    name="examName"
                    value={examName}
                    className={`w-full h-10 md:h-12 p-2 border rounded-md ${examName == "" ? "border-red-500" : ""}`}
                    required
                  >
                    <option value={""} disabled>
                      Select
                    </option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="1st Model Test">1st Model Test</option>
                    <option value="2nd Model Test">2nd Model Test</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Annual">Annual</option>
                  </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button 
                      onClick={task.clickFunc}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2">
                        {task.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* creating exam sit card popup */}
        {students && seatCards && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative">
              <button
                onClick={closeSeatCards}
                className="absolute bottom-2 right-8 text-lg bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <SeatCardPDF students={students} examName={examName} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SpecialTask;
