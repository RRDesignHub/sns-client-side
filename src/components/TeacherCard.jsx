
import { FaCircleUser } from "react-icons/fa6";
export const TeacherCard = ({teacher}) => {
  const {name, profileImage, role, category, specialization, qualification} = teacher;
  
  return (
    <>
      <div className="card bg-gradient-to-r from-green-100 to-green-50 border border-green-400 shadow-md rounded-lg ">
        <div className="flex flex-col ">
          {/* Profile Image */}
          <div className="avatar placeholder flex flex-col justify-center items-center mb-4">
            <div className="  text-green-700 w-[200px] h-[265px] flex items-center justify-center ">
              {
                profileImage ? 
                <img src={profileImage} className="w-full object-cover object-top mt-5" alt={name} /> :
                <FaCircleUser className="text-green-700 text-[180px]" />
              }
            </div>
          </div>

          {/* Name and Role */}
          <h3 className="text-xl text-center font-bold text-green-700">
            {name}
          </h3>
          <p className="text-sm text-center text-gray-600 font-medium">{role}</p>

          {/* Details Section */}
          <div className="mt-4 px-3 pb-5">
            <p className="text-gray-700">
              <span className="font-semibold text-green-600">
                Teacher Category:
              </span>{" "}
              {category}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-green-600">
                Specialization:
              </span>{" "}
              {specialization}
            </p>
            <h3 className="text-md  mt-2">
              <strong className="block font-semibold text-green-700">
                Qualification:{" "}
              </strong>
              {
                qualification.map((qal,index) => <p className="block" key={index}>{qal}.</p>)
              }
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
