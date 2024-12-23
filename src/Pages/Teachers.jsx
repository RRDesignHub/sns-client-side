import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import nejamSir from "./../assets/Teachers/Nejam_sir.jpg";
import reajSir from "./../assets/Teachers/Reaj_sir.jpg";
import ridoySir from "./../assets/Teachers/Ridoy_sir.jpg";
import bariSir from './../assets/Teachers/Bari_sir.png';
import { Helmet } from "react-helmet-async";
export const Teachers = () => {
  return (
    <>
      <Helmet>
        <title>SN-Teachers</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:w-full gap-5 w-11/12 mx-auto my-10">
        <div className="flex flex-col rounded-lg items-center py-5 px-5 bg-gray-100  ">
          <figure>
            <img className="w-40 shadow-md" src={nejamSir} alt="Shoes" />
          </figure>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Md. Nejam Uddin</h2>
            <h3 className="text-lg font-semibold">Assistant Teacher</h3>
            <h3 className="text-md text-center mt-0">
            <strong>Qualification: </strong>BBA Hons. (1st class), <br />{" "}
              Department of Managamant.
            </h3>

            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg items-center py-5 px-5 bg-gray-100  ">
          <figure>
            <img className="w-40 shadow-md" src={reajSir} alt="Shoes" />
          </figure>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Md. Reaj Uddin</h2>
            <h3 className="text-lg font-semibold">Assistant Teacher</h3>
            <h3 className="text-md text-center mt-0">
              <strong>Qualification: </strong> BBA Hons. (Final year), <br />{" "}
              Department of Managamant.
            </h3>

            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg items-center py-5 px-5 bg-gray-100  ">
          <figure>
            <img className="w-40 shadow-md" src={bariSir} />
          </figure>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Mohammad Abdul Bari</h2>
            <h3 className="text-lg font-semibold">Assistant Teacher</h3>
            <h3 className="text-md text-center mt-0">
              <strong>Qualification: </strong> Diploma in Civil Engineering(7th Semester)<br />{" "}
             
            </h3>

            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg items-center py-5 px-5 bg-gray-100  ">
          <figure>
            <img className="w-40 shadow-md" src={ridoySir} alt="Shoes" />
          </figure>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Ripanul Alam Ridoy</h2>
            <h3 className="text-lg font-semibold">Assistant Teacher</h3>
            <h3 className="text-md text-center mt-0">
              <strong>Qualification: </strong> BSS Hons. (Final year), <br />{" "}
              Department of Econoics.
            </h3>

            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg items-center py-5 px-5 bg-gray-100  ">
          <figure>
            
            <FaCircleUser className="text-[180px] "/>
          </figure>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Shahin Akther</h2>
            <h3 className="text-lg font-semibold">Assistant Teacher</h3>
            <h3 className="text-md text-center mt-0">
              <strong>Qualification: </strong> BA Hons. (2nd class), <br />{" "}
              Department of Bangla.
            </h3>

            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>
        
        <div className="flex flex-col rounded-lg items-center py-5 px-5 bg-gray-100  ">
          <figure>
          <FaCircleUser className="text-[180px] "/>
          </figure>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Tithi Chowdhury</h2>
            <h3 className="text-lg font-semibold">Assistant Teacher</h3>
            <h3 className="text-md text-center mt-0">
              <strong>Qualification: </strong> BA Hons. (2nd year), <br />{" "}
              Department of Philosphy.
            </h3>

            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
