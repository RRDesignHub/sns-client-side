import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function StudentsOverview() {
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["stedents"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-students`
      );
      return data;
    },
  });
  return (
    <section className="bg-green-100">
      <div className="w-11/12 mx-auto py-16 ">
        <div className="flex max-sm:flex-col gap-3 items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold text-green-700 text-center ">
            আমাদের শিক্ষার্থীরা
          </h2>
          <Link
            className="btn border border-green-600 bg-transparent text-green-600 hover:bg-green-700 hover:text-green-50"
            to="/students"
          >
            আরও দেখুন
          </Link>
        </div>
        <div className="divider my-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white border-2 border-green-300 shadow-lg rounded-lg p-3 md:px-4 md:py-2 md:pb-5 flex flex-col items-center"
            >
              <div className="text-green-700 w-[200px] h-[265px] flex items-center justify-center">
                {
                  student?.image ? <img src={student?.image} className="w-full object-cover object-top mt-2"
                  alt={student.studentName} /> : 
                  <FaUserGraduate className="text-green-400 text-[180px]" />
                }
              </div>
              <h3 className="text-lg text-green-950 text-center font-semibold">{student.studentName}</h3>
              <p className="text-green-800/90">শ্রেণী : {student.className}</p>
              <p className="text-green-800/90">রোল : {student.classRoll}</p>
              <p className="text-green-800/80">রক্তের গ্রুপ: {student?.bloodGroup}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
