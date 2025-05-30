import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { TeacherCard } from "../components/TeacherCard";
import { Loading } from "../components/Shared/Loading";
export const Teachers = () => {
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/teachers`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
       <Helmet>
            <title>শিক্ষক/শিক্ষিকা | আমাদের শিক্ষকমণ্ডলী</title>
          </Helmet>
          <div className="bg-green-50 min-h-screen py-5 md:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl md:text-4xl font-bold text-green-900 text-center mb-1">
                আমাদের শিক্ষকমণ্ডলী
              </h2>
              
          <div className="divider mt-0"></div>
              {isLoading ? (
                <Loading />
              ) : teachers.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                  কোনো শিক্ষক পাওয়া যায়নি।
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5">
                  {teachers.map((teacher, index) => (
                    <TeacherCard key={teacher._id || index} teacher={teacher} />
                  ))}
                </div>
              )}
            </div>
          </div>
    </>
  );
};
