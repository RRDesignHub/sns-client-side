import { useState } from "react";
import Swal from 'sweetalert2';
export const AddSubject = () => {
  const [clsName, setClsName] = useState(null);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectType, setSubjectType] = useState("Select");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddSubject = (e) => {
    e.preventDefault();

    const form = e.target;
    const subjectName = form.subject.value;
    const subjectType = form.subjectType.value;
    const totalMarks = form.totalMarks.value;
    const passMarks = form.passMarks.value;

    const subjectData = {
      subjectName,
      subjectType,
      totalMarks,
      passMarks,
    };

    setSubjects([...subjects, subjectData]);
    form.reset();
    setSubjectType('Select')
  };

  const handleSubjectsDataSubmit = () => {
    if(!clsName){
      return setError("Class name required.")
    }
    const subjectData = {
      clsName: clsName,
      subjects: subjects,
    };

    fetch('https://snkh-school-server-side.vercel.app/subjects', {
      method: "POST",
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(subjectData)
    })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${clsName}'s subjects data successfully added.`,
            showConfirmButton: false,
            timer: 1500
          });
          setSubjects([]);
          setClsName(null);
          setError("")
        }
      })
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-50 px-3 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Add Subject
        </h1>
        <div className="grid grid-cols-12 ">
          <div className="form-control col-span-12 justify-center mt-5 flex-row  ">
            <label className="label">
              <span className="label-text text-lg font-semibold">Class: </span>
            </label>
            <select
                defaultValue={"Select a class"}
                onChange={(e) => setClsName(e.target.value)}
                name="class"
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select a class
                </option>
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
          
        </div>
        {error && <p className="text-center pt-1 pb-5 text-red-500">{error}</p>}
        {subjects.length ? (
          <div className="bg-white p-5 rounded-xl mt-5 mx-8">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Subject Name</th>
                    <th>Subject Type</th>
                    <th>Total Marks</th>
                    <th>Pass Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((singleSubject, index) => (
                    <tr key={index}>
                      <td>{singleSubject.subjectName}</td>
                      <td>{singleSubject.subjectType}</td>
                      <td>{singleSubject.totalMarks}</td>
                      <td>{singleSubject.passMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}

        <form onSubmit={handleAddSubject} className="card-body max-sm:px-0">
          <div className="grid gap-3 grid-cols-12 items-end">
            <div className="form-control col-span-12 md:col-span-4">
              <label className="label">
                <span className="label-text">Subject Name</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="input input-bordered"
                required
              />
            </div>
            <div className="dropdown dropdown-bottom col-span-8 md:col-span-2">
              <label className="label">
                <span className="label-text">Subject Type</span>
              </label>
              <div
                tabIndex={0}
                role="button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="btn bg-white hover:bg-green-100 w-full"
              >
                {subjectType}
              </div>
              {isOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu border border-green-500 bg-green-50 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a
                      onClick={(e) => {
                        setSubjectType("Compulsory");
                        setIsOpen(false);
                      }}
                    >
                      Compulsory
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        setSubjectType("Optional");
                        setIsOpen(false);
                      }}
                    >
                      Optional
                    </a>
                  </li>
                </ul>
              )}
            </div>
            {/* Hidden input to store subjectType */}
            <input type="hidden" name="subjectType" value={subjectType} />
            <div className="form-control col-span-4 md:col-span-2">
              <label className="label">
                <span className="label-text">Total Marks</span>
              </label>
              <input
                type="number"
                name="totalMarks"
                placeholder="Marks"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text">Pass Marks</span>
              </label>
              <input
                type="number"
                name="passMarks"
                placeholder="Pass marks..."
                className="input input-bordered"
                required
              />
            </div>

            <button className="max-sm:col-span-6 md:col-span-2 btn bg-green-100 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              Add
            </button>
          </div>

          
        </form>
        <div className=" w-fit ms-auto mt-6">
            <button
              onClick={handleSubjectsDataSubmit}
              className="btn bg-green-600 px-5 hover:bg-green-700 text-lg text-white"
            >
              Submit
            </button>
          </div>
      </div>
    </div>
  );
};
