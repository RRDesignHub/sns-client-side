import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useRole } from "../../../Hooks/useRole";
import { useState } from "react";
import { Loading } from "../../../components/Shared/Loading";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
const AllStudentsFees = () => {
  const axiosSecure = useAxiosSec();
  const [userRole] = useRole();
  const [filterStudentsID, setFilterStudentsID] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [serverError, setServerError] = useState("");
  const [enabled, setUnabled] = useState(false);
  const { isTeacher, isAccountant, isAdmin } = userRole;
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  // all students data for accountant from studentsFeesCollection
  const {
    data: studentsFees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["studentsFees", filterByClass, session],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students-fees?session=${session}&&className=${filterByClass}`
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

  const handleUpdateFees = async (e) => {
    e.preventDefault();
    const newFee = parseInt(e.target.newFee.value);
    try {
      const { data } = await axiosSecure.patch("/update-fee", {
        studentID: selectedStudent.studentID,
        newFee,
      });

      if (data.modifiedCount) {
        setIsAdjustModalOpen(false);
        Swal.fire({
          title: "পরিবর্তিত!",
          text: `${selectedStudent.studentName}-এর বেতন পরিবর্তন হয়েছে!!!`,
          icon: "success",
        });
        setSelectedStudent({});
      }
    } catch (err) {
      console.log("Adjust fees Errro--->", err);
    }

    
  };

  // whole class pdf open modal:
  const openAdjustModal = (student) => {
    setIsAdjustModalOpen(true);
    setSelectedStudent(student);
  };

  // whole class pdf open modal:
  const closeAdjustModal = () => {
    setIsAdjustModalOpen(false);
  };
  return (
    <>
      <div className="p-6 min-h-screen">
        <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          সকল শিক্ষার্থী
        </h2>
        <div className="divider"></div>

        {/* Filter Inputs */}
        <form
          className="grid grid-cols-12 md:grid-cols-10 gap-4 mb-5"
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
                  {className}
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

          {/* choose exam */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">
                শিক্ষার্থী আইডি:
              </span>
            </label>
            <input
              type="text"
              placeholder="যেমন: 'SN-20251234'"
              name="classRoll"
              value={filterStudentsID}
              onChange={(e) => setFilterStudentsID(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-6 md:col-span-2 flex items-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              সার্চ করুন
            </button>
          </div>
        </form>
        <div className="divider my-0"></div>
        {studentsFees.length > 0 && (
          <div className="pb-2 flex justify-evenly items-center text-sm md:text-lg text-green-950 font-semibold">
            <h2>শ্রেণী : {filterByClass}</h2>
            <button
              // onClick={openTablePdfModal}
              className="btn btn-md bg-green-600 text-green-50 hover:bg-green-500"
            >
              সকল শিক্ষার্থী <FaFilePdf />
            </button>
            <h2>মোট শিক্ষার্থী: {studentsFees.length} জন</h2>
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : studentsFees.length > 0 ? (
          <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
            <table className="table w-full bg-white rounded shadow">
              <thead className="bg-gradient-to-r from-green-100 to-green-300 text-green-950">
                <tr>
                  <th className="py-2 px-4 text-center">রোল</th>
                  <th className="py-2 px-4 text-left">নাম</th>
                  <th className="py-2 px-4 text-center">মাসিক বেতন(৳)</th>
                  <th className="py-2 px-4 text-center">বকেয়া(৳)</th>
                  <th className="py-2 px-4 text-center">বকেয়া মাস</th>
                  <th className="py-2 px-4 text-center">সর্বশেষ পরিশোধ</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsFees
                  .sort((a, b) => a.classRoll - b.classRoll)
                  .map((stu, index) => (
                    <tr key={stu._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 text-center">{stu.classRoll}</td>
                      <td className="py-2 px-4">{stu.studentName}</td>
                      <td className="py-2 px-4 text-center">
                        {stu.amount ? `${stu?.amount}৳` : `300৳`}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {stu.dueAmount}৳
                      </td>
                      <td className="py-2 px-4 text-center">
                        {stu?.dueMonths && stu?.dueMonths.length} মাসের
                      </td>
                      <td>
                        {stu?.paidAt &&
                          format(new Date(stu?.paidAt), "MMMM dd, yyyy")}
                      </td>
                      <td className="py-2 px-4 mx-auto flex justify-center items-center gap-2 *:rounded-md">
                        <button
                          onClick={() => console.log("Pay", stu)}
                          className="btn-sm bg-green-500 hover:bg-green-700 text-white"
                        >
                          পরিশোধ
                        </button>
                        <button
                          onClick={() => console.log("Details", stu)}
                          className="btn-sm bg-gray-600 text-green-50 hover:bg-gray-700"
                        >
                          বিবরণী
                        </button>
                        <button
                          onClick={() => openAdjustModal(stu)}
                          className="btn-sm bg-transparent border border-green-500 hover:bg-green-500 text-green-600 hover:text-white"
                        >
                          বেতন পরিবর্তন
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : serverError ? (
          <p className="text-center py-4 text-red-400">{serverError}</p>
        ) : (
          <p className="text-center py-4">শ্রেণী ও শিক্ষাবর্ষ নির্বাচন করুন.</p>
        )}
      </div>

      {/* pdf popup */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-[70%] h-[90%] rounded shadow-lg relative p-10">
            <form onSubmit={handleUpdateFees} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                বেতন পরিবর্তন
              </h2>

              {/* Student Details (Read-only) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষার্থীর নাম
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.studentName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষার্থীর ID
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.studentID || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    শ্রেণী
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.className || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    রোল
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.classRoll || "N/A"}
                  </p>
                </div>
              </div>

              {/* Editable Fee Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  মাসিক বেতন পরিবর্তন
                </label>
                <input
                  type="number"
                  defaultValue={selectedStudent?.amount}
                  name="newFee"
                  min="0"
                  step="1"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new fee amount"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAdjustModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AllStudentsFees;
