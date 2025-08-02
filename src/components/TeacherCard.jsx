import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
export const TeacherCard = ({ teacher }) => {
  const {
    _id,
    name,
    profileImage,
    role,
    category,
    specialization,
    qualification,
  } = teacher;

  return (
    <>
      <Link to={`/teacher-details/${_id}`}>
        <div className="group relative bg-white border border-green-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full ">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative h-full flex flex-col items-center p-2 md:p-6">
            {/* Profile Image */}
            <div className="avatar mb-2 md:mb-4">
              <div className="w-20 h-24 md:w-40 md:h-48 rounded-sm overflow-hidden border-2 border-green-500 drop-shadow-lg">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/160")
                    }
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-100">
                    <FaCircleUser className="text-green-600 text-6xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Name and Role */}
            <h3 className="text-sm md:text-xl font-bold text-green-800 text-center md:mb-2">
              {name || "N/A"}
            </h3>
            <p className="text-xs md:text-sm font-medium text-gray-600 text-center">
              {role || "N/A"}
            </p>
            <div className="flex-grow"></div>
            {/* Details Section */}
            <div className="mt-2 md:mt-4 w-full space-y-1 md:space-y-3">
              <p className="text-gray-700 max-sm:text-xs flex  md:items-center gap-2">
                <span className="font-semibold max-sm:text-[10px] text-green-600">
                  ক্যাটেগরি:
                </span>
                <span>
                  {category == "Primary"
                    ? "প্রাথমিক"
                    : category == "Higher"
                    ? "মাধ্যমিক"
                    : category == "Primary & Higher"
                    ? "প্রাথমিক ও মাধ্যমিক"
                    : "N/A"}
                </span>
              </p>
              <p className="text-gray-700 max-sm:text-xs flex  md:items-center gap-2">
                <span className="font-semibold max-sm:text-[10px] text-green-600">
                  বিশেষত্ব:
                </span>
                <span>{specialization || "N/A"}</span>
              </p>
              <div>
                <p className="font-semibold max-sm:text-[10px] text-green-600 mb-1">
                  যোগ্যতা:
                </p>
                {qualification?.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 max-sm:text-[10px] space-y-1">
                    {qualification.map((qal, index) => (
                      <li key={index}>{qal}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
