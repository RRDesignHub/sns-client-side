import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export const BooksOverview = () => {
  const { data: allSubjects = {}, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-subjects`
      );
      return data;
    },
  });
  return (
    <div className="bg-gradient-to-r from-green-50 via-green-200 to-green-100 mb-10">
      <div className="w-11/12 mx-auto py-8 lg:py-16">
        <div className="flex max-sm:flex-col gap-3 items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold text-green-800 text-center ">
            প্রাথমিক ও মাধ্যমিক স্তরের পাঠ্যপুস্তক
          </h2>
          <Link
            className="btn max-sm:text-sm bg-green-600 text-green-50 hover:bg-green-300 hover:text-green-950"
            to="/subjects"
          >
            আরও দেখুন
          </Link>
        </div>
        <div className="divider my-2"></div>
        {
         isLoading ? "Loading..." : <section >
            <h2 className="text-sm md:text-2xl text-gray-950/80 font-semibold mb-6 text-center">
              শ্রেণী: {allSubjects?.className} এর পাঠ্যপুস্তক ({allSubjects?.subjects.length} টি)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
              {allSubjects?.subjects?.slice(0, 6).map((subject, index) => (
                <a
                  key={index}
                  href={subject?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-opacity-70 border border-green-300 p-4 rounded-xl shadow-md transition-all duration-300 block cursor-pointer"
                >
                  <div className="text-sm md:text-lg text-green-950 font-medium">
                    {subject?.subjectName}
                  </div>
                  <div className="text-[8px] md:text-sm text-green-800/80 flex justify-between">
                    <span>{subject?.subjectType} | Code: {subject.subjectCode}</span>
                    <span>মোট নম্বর: {subject?.totalMarks}</span>
                  </div>
                </a>
              ))}
            </div>
        </section>
        }
      </div>
    </div>
  );
};
