import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { TeacherCard } from "../components/TeacherCard";
export const Teachers = () => {
  const [teachersData, setTeachersData] = useState();

  useEffect(() =>{
    fetch('teachersData.json')
    .then(res => res.json())
    .then(data => setTeachersData(data))
  }, [])
  return (
    <>
      <Helmet>
        <title>SN-Teachers</title>
      </Helmet>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:w-full gap-5 w-11/12 mx-auto my-10 ">
        {
          teachersData && teachersData.map((teacher, index) => <TeacherCard key={index} teacher={teacher}></TeacherCard>)
        }
      </div>
    </>
  );
};
