import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Loading } from "../components/Shared/Loading";
import { format } from "date-fns";

export const Notices = () => {
  const { data: notices = [], isLoading } = useQuery({
      queryKey: ["notices"],
      queryFn: async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/all-notice`
        );
        return data;
      },
    });

    if(isLoading) {
      return <Loading />
    }
  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-400 shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 text-center py-4">
        নোটিশ বোর্ড:
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            {/* Table Header */}
            <thead className="bg-green-200">
              <tr>
               
                <th className="px-1 md:px-4 py-2 text-left text-green-700 font-semibold">
                  শিরোনাম
                </th>
                <th className="px-1 md:px-4 py-2 text-left text-green-700 font-semibold">
                  তারিখ
                </th>
                <th className="px-1 md:px-4 py-2 text-left text-green-700 font-semibold">
                  PDF
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {notices.length > 0 ? (
                notices.map((notice, index) => (
                  <tr
                    key={notice._id}
                    className={index % 2 === 0 ? "bg-green-50" : "bg-white"}
                  >
                    <td className="px-1 md:px-4 py-2 max-sm:text-xs text-gray-700">{notice.title}</td>
                    <td className="px-1 md:px-4 py-2 max-sm:text-xs text-gray-700">{notice?.date && format(new Date(notice.date), "dd/MM/yyyy, EEEE")}</td>
                    <td className="px-1 md:px-4 py-2 max-sm:text-xs text-gray-700">
                      <Link className="text-green-800 text-xl" to={notice?.pdfUrl}><FaFile></FaFile></Link>
                    </td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2" // Adjust colspan based on number of columns
                    className="px-4 py-2 text-center text-gray-600"
                  >
                    No notices available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};