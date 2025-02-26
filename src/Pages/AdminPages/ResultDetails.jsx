import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResultDetails() {
  const { id } = useParams();
  console.log(id);

  const {
    data: resultData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/result?id=${id}`
      );
      return data;
    },
  });
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
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
              <strong className="col-span-6 md:col-span-3">Student Name</strong>{" "}
              <span className="col-span-1">:</span>{" "}
              <span className="col-span-5 md:col-span-8">
                {resultData?.studentName}
              </span>
            </h3>
            {/* class name */}
            <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
              <strong className="col-span-6 md:col-span-3">Class</strong>{" "}
              <span className="col-span-1">:</span>{" "}
              <span className="col-span-5 md:col-span-8">
                {resultData?.className}
              </span>
            </h3>
            {/* Roll no */}
            <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
              <strong className="col-span-6 md:col-span-3">Roll</strong>{" "}
              <span className="col-span-1">:</span>{" "}
              <span className="col-span-5 md:col-span-8">
                {resultData?.classRoll}
              </span>
            </h3>
          </div>
          <div className=" md:ms-auto col-span-12 md:col-span-5">
            <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
              <strong className="col-span-6 md:col-span-7">Total Marks</strong>{" "}
              <span className="col-span-1">:</span>{" "}
              <span className="col-span-5 md:col-span-4">
                {resultData?.totalMarks}
              </span>
            </h3>
            <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
              <strong className="col-span-6 md:col-span-7">GPA</strong>{" "}
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
              <strong className="col-span-6 md:col-span-7">Status</strong>{" "}
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
  );
}
