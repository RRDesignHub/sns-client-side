import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { TeacherCard } from "../components/TeacherCard";
import { Loading } from "../components/Shared/Loading";
export const Teachers = () => {
  const {data:teachers=[], isLoading} = useQuery({
      queryKey: ["teachers"],
      queryFn: async() =>{
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/teachers`
        );
        return data;
      },
    })
 
    if(isLoading) {
      return <Loading />
    }
  return (
    <>
      <Helmet>
        <title>SN-Teachers</title>
      </Helmet>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:w-full gap-5 w-11/12 mx-auto my-10 ">
        {
          teachers && teachers.map((teacher, index) => <TeacherCard key={index} teacher={teacher}></TeacherCard>)
        }
      </div>
    </>
  );
};
