import React from "react";
import { FaUserGraduate } from "react-icons/fa6";
export default function StudentCard({ student }) {
  const { studentName, image, className, classRoll, bloodGroup } = student;

  return (
    <div className="card bg-gradient-to-r from-green-100 to-green-50 shadow-md rounded-lg">
      <div className="flex flex-col">
        {/* Profile Image */}
        <div className="avatar placeholder flex flex-col justify-center items-center mb-2">
          <div className=" mt-3 text-green-700 w-[120px] h-[170px] flex items-center justify-center">
            {image ? (
              <img
                src={image}
                className="w-full object-top shadow-md rounded-lg"
                alt={studentName}
              />
            ) : (
              <FaUserGraduate className="text-green-700 text-[150px]" />
            )}
          </div>
        </div>

        {/* Name and Details */}
        <h3 className="text-xl text-center font-semibold text-green-700 mb-2">
          {studentName}
        </h3>
        <p className="text-center text-green-950/90 font-medium">
          শ্রেণী: {className}
        </p>
        <div className="grow"></div>
        <div className="text-center pb-3">
          <p className="text-green-950/80">
            <span className=" text-green-900">রোল নং:</span> {classRoll}
          </p>
          {/* <p className="text-green-950/80">
            <span className=" text-green-900">শিক্ষার্থী আইডি:</span>
          </p> */}
          <p className="text-green-950/80">
            <span className=" text-green-900">রক্তের গ্রুপ:</span> {bloodGroup}
          </p>
        </div>
      </div>
    </div>
  );
}
