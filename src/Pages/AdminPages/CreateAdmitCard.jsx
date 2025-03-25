import { useEffect, useState } from "react";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";

export default function CreateAdmitCard() {
  const axiosSecure = useAxiosSec();
  const [classFilter, setClassFilter] = useState("Play");
  const [examName, setExamName] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [enabled, setUnabled] = useState(false);
  const [examDate, setExamDate] = useState(new Date());
  const [examFrom, setExamFrom] = useState("");
  const [examTo, setExamTo] = useState("");
  const [examData, setExamData] = useState([]);
  const [error, setError] = useState("");
  const [multipleAdd, setMultipleAdd] = useState("");

  const {
    data: subjectData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subjects", classFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/subjects?className=${classFilter}`
      );
      return data;
    },
    enabled,
  });

  useEffect(() => {
    // Handle success case
    if (!subjectData.subjects) {
      return setError("No subjects found for this class.");
    } else {
      setError("");
    }
  }, [subjectData]);

  const handleGetSubjects = (e) => {
    e.preventDefault();
    setUnabled(true);
    refetch();
  };

  const handleSingleExamData = async (e) => {
    e.preventDefault();
    const subjectName = e.target.subjectName.value;
    // Check if subject already exists in examData
    const isAlreadyAdded = examData.some(
      (data) => data.subjectName === subjectName
    );

    if (isAlreadyAdded) {
      setMultipleAdd("This subject has already been added!");
      return;
    }

    const singleExamData = {
      subjectName,
      examDate,
      examFrom,
      examTo,
    };

    setExamData([...examData, singleExamData]);
    // Optional: Reset form fields after successful addition
    setMultipleAdd("");
    e.target.reset();
    setExamDate(new Date());
    setExamFrom("");
    setExamTo("");
  };

  //final admit card data post to db
  const handleSubmitAdmitCard = async () => {
    if (!examData) {
      return setError("Please add subject.");
    }

    const admitCardData = {
      examName,
      session : parseInt(session),
      className: classFilter,
      examData,
    };

    try {
      const { data } = await axiosSecure.post(`/add-admit-card`, admitCardData);
      if(data.message === "Already added admit card."){
        Swal.fire({
          position: "center",
          icon: "info",
          title: `${admitCardData.className}'s admit card already added!`,
        });
      }
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${admitCardData.className}'s admit card added successfully!!!`,
        });
        setExamData([]);
      }
    } catch (err) {
      console.log("Add admit cart Error-->", err);
    }
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          Create Admit Card
        </h1>
        <div className="divider my-0"></div>
        {/* Class Filter */}

        <form onSubmit={handleGetSubjects} className="card-body w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-end gap-2 md:gap-5">
             {/* exam name */}
             <div className="form-control flex-col">
                <label className="label ">
                  Exam Name :
                </label>
                <select
                  onChange={(e) => setExamName(e.target.value)}
                  name="subjectName"
                  value={examName}
                  className={`w-full h-12 p-2 border rounded-md ${error === "Exam name select please." ? "border-red-400" : "border-gray-300 "}`}
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
            <div className="form-control flex-col">
              <label className="label">
                Academic Year:
              </label>
              <select
                onChange={(e) => setSession(e.target.value)}
                name="session"
                defaultValue={"Select a year"}
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

            {/* class name */}
            <div className="form-control flex-col">
              <label className="label">
                  Select Class:
              </label>
              <select
                onChange={(e) => setClassFilter(e.target.value)}
                className="select select-bordered bg-white w-64 text-gray-700"
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
                Search
              </button>
            </div>
          </div>
          {isLoading ? <h2 className="text-lg text-green-400 text-center">Loading...</h2> :
          error ? <p className="text-red-500 text-center">{error}</p> : ""
          }
        </form>

        

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th>Subject Name</th>
                <th className="text-center">Exam Date</th>
                <th className="text-center">Time</th>
              </tr>
            </thead>
            <tbody>
              {examData?.length > 0 ? (
                examData?.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectName}</td>
                    <td className="text-center">
                      {subject?.examDate &&
                        format(new Date(subject?.examDate), "dd-MM-yyyy, EEEE")}
                    </td>
                    <td className="text-center">
                      {subject?.examFrom} - {subject?.examTo}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No exam added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSingleExamData} className="card-body max-sm:px-0">
          <div className="grid gap-3 grid-cols-12 items-end">
            <div className="form-control col-span-12 md:col-span-3">
              <label className="block label text-gray-700">Subject Name</label>
              <select
                defaultValue="Select"
                name="subjectName"
                className="w-full h-12 p-2 border border-gray-300 rounded-md"
                required
              >
                <option disabled>Select</option>
                {subjectData.subjects &&
                  subjectData?.subjects?.map((singleSubData, index) => (
                    <option value={singleSubData.subjectName} key={index}>
                      {singleSubData.subjectName}
                    </option>
                  ))}
              </select>
            </div>

            {/* exam date choose */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Exam Date</span>
              </label>
              <input
                type="date"
                selected={examDate}
                required
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* time from */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Exam From</span>
              </label>
              <input
                type="time"
                selected={examFrom}
                required
                onChange={(e) => setExamFrom(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            {/* time to*/}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Exam To</span>
              </label>
              <input
                type="time"
                selected={examTo}
                required
                onChange={(e) => setExamTo(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <button className="max-sm:col-span-6 md:col-span-3 btn bg-green-100 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              Add
            </button>
            {multipleAdd && (
              <small className="col-span-6 text-red-400">{multipleAdd}</small>
            )}
          </div>

          <div className="form-control w-fit ms-auto mt-6">
            <button
              type="button"
              onClick={handleSubmitAdmitCard}
              className="btn bg-green-600 px-5 hover:bg-green-700 text-lg text-white"
            >
              Submit Admit Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
