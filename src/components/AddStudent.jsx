import Swal from 'sweetalert2'

export const AddStudent = () => {

  const handleStudentData = (e) =>{
    e.preventDefault();

    const form = e.target;
    const studentName = form.studentName.value;
    const className = form.className.value;
    const classRoll = form.classRoll.value;
    const fatherName = form.fatherName.value;
    const motherName = form.motherName.value;
    const photo = form.photo.value;

    const studentData = {
      studentName, className, classRoll, fatherName, motherName, photo
    }

    fetch('https://snkh-school-server-side.vercel.app/students', {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(studentData),
    }).then(res =>res.json()).then((data) =>{
      if(data.insertedId){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${studentName}'s data successfully added.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
  return (
    <>
      <div className="w-11/12 mx-auto my-10">
        <form onSubmit={handleStudentData} className="card-body max-sm:px-3 bg-green-50 rounded-2xl py-5 md:py-8 mt-5">
          <h1 className="text-2xl md:text-4xl font-bold text-center">Add Student Details</h1>
          <div className="grid gap-2 grid-cols-12">

            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Student Name:</span>
              </label>
              <input
                type="text"
                name="studentName"
                placeholder="Type student name..."
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Class Name:</span>
              </label>
              <input
                type="text"
                name="className"
                placeholder="Type class name..."
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text">Class Roll:</span>
              </label>
              <input
                type="number"
                name="classRoll"
                placeholder="Type class roll..."
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Father's Name:</span>
              </label>
              <input
                type="text"
                name="fatherName"
                placeholder="Father's name..."
                className="input input-bordered"
                
              />
            </div>
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Mother's Name:</span>
              </label>
              <input
                type="text"
                name="motherName"
                placeholder="Mother's name..."
                className="input input-bordered"
                
              />
            </div>
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text">Photo URL:</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo url..."
                className="input input-bordered"
                
              />
            </div>
          </div>

          <div className="form-control w-fit ms-auto mt-6">
            <button className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white">
              Add Student's Data
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
