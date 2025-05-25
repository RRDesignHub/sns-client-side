import { useState } from "react";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { useQuery } from "@tanstack/react-query";
import { FaFilePdf } from "react-icons/fa";
import AdmitCardPDF from "../../components/Dashboard/AdmitCardPDF/AdmitCardPDF";
import { Loading } from "../../components/Shared/Loading";
export default function ClassAdmitCard() {
  const axiosSecure = useAxiosSec();
  const [classFilter, setClassFilter] = useState("Play");
  const [examName, setExamName] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [enabled, setUnabled] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [admitCardPdf, setAdmitCardPdf] = useState({});
  const [serverError, setServerError] = useState("");
  const {
    data: admitCards = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subjects", classFilter, examName, session],
    queryFn: async () => {
     try{
      const { data } = await axiosSecure.get(
        `/admit-cards/class?className=${classFilter}&examName=${examName}&session=${session}`
      );
      if(data.message){
        setServerError(data.message);
      }else{
        setServerError("");
      }
      return data;
     }catch(err){
      console.log(err);
     }
    },
    enabled,
    onError: (err) => {
      setServerError(err.message); 
    },
  });

  const handleAdmitCards = (e) => {
    e.preventDefault();
    setServerError("")
    setUnabled(true);
    setIsPrint(false)
    refetch();
  };

  
  
  //prind admit card 
  const handlePrintAdmitCard= async(cardData) =>{
    console.log(cardData);
    setAdmitCardPdf(cardData);
    setIsPrint(true);
  }
  return (
    <div className="w-full md:w-11/12 mx-auto max-sm:px-2 my-10">
      <div className="bg-green-200 px-2 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          প্রিন্ট এডমিট কার্ড
        </h1>
        <div className="divider my-0"></div>
        {/* Class Filter */}

        <form
          onSubmit={handleAdmitCards}
          className="card-body w-full mx-auto pt-2 pb-5 px-2"
        >
          <div className="flex flex-col md:flex-row justify-center md:items-end gap-2 md:gap-5">
            {/* exam name */}
            <div className="form-control flex-row md:flex-col">
              <label className="label ">পরীক্ষার নাম :</label>
              <select
                onChange={(e) => setExamName(e.target.value)}
                name="subjectName"
                value={examName}
                className={`w-1/2 md:w-full h-12 p-2 border rounded-md ${
                  error === "Exam name select please."
                    ? "border-red-400"
                    : "border-gray-300 "
                }`}
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

            {/* Academic year */}
            <div className="form-control flex-row md:flex-col">
              <label className="label">শিক্ষাবর্ষ:</label>
              <select
                onChange={(e) => setSession(e.target.value)}
                name="session"
                defaultValue={"Select a year"}
                className="w-1/2 md:w-full h-12 p-2 border rounded-md"
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

            {/* class name */}
            <div className="form-control flex-row md:flex-col">
              <label className="label">শ্রেণী:</label>
              <select
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-1/2 md:w-full h-12 p-2 border rounded-md"
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
                    Class {className}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <button className="btn bg-green-600  hover:bg-primary text-white">
                সার্চ
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : 
          serverError ? <p className="pt-3 text-base text-red-400 text-center">{serverError}</p> :
          (
            ""
          )}
        </form>

        {/* all students admit card data */}

        {admitCards.length > 0 && !isPrint && (
          <div className="overflow-x-auto border-2 border-green-600 shadow-md rounded-lg">
            <div className="py-2 flex max-sm: flex-wrap items-center gap-2 justify-evenly text-xl font-semibold">
              <h2>শ্রেণী : {admitCards[0]?.className}</h2>
              <h2>{admitCards[0]?.examName} পরীক্ষা-{admitCards[0]?.session}</h2>
            </div>
            <table className="table w-full">
              {/* Table Header */}
              <thead className="bg-green-600 text-white">
                <tr>
                  <th>শিক্ষার্থীর নাম</th>
                  <th>রোল</th>
                  <th>বাবার নাম</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {admitCards.length > 0 ? (
                  admitCards
                    .sort((a, b) => a.classRoll - b.classRoll)
                    .map((student) => (
                      <tr key={student.classRoll}>
                        <td>{student.studentName}</td>
                        <td>{student.classRoll}</td>
                        <td>{student.fatherName}</td>
                        <td>
                          <button
                            onClick={() =>handlePrintAdmitCard(student)}
                            className="btn btn-sm text-white bg-secondary hover:bg-primary mr-2"
                          >
                            <FaFilePdf /> Print
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-600">
                      কোনো শিক্ষার্থী পাওয়া যায়নি
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {
        isPrint && <AdmitCardPDF admitCardData={admitCardPdf} />
      }
    </div>
  );
}
