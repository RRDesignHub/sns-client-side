import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import heroImg_1 from "./../assets/Hero-1.jpg";
export const Hero = () => {
  return (
    <>
      
      <Swiper
      loop={true}
      speed={1000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
        spaceBetween={30}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div  className="w-full">
            <img
              src={heroImg_1}
              className="h-full lg:w-full lg:h-[500px] object-cover"
            />
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div  className="w-full">
            <img src='https://i.ibb.co.com/Y0zBFKS/Banner-2.png' className="h-full lg:w-full lg:h-[500px] object-cover" />
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div  className="w-full">
            <img src='https://i.ibb.co.com/XVscVds/Banner-1.png' className="h-full lg:w-full lg:h-[500px] object-cover" />
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div  className="w-full">
            <img src='https://i.ibb.co.com/YBJpkQG/Banner-3.png' className="h-full lg:w-full lg:h-[500px] object-cover" />
            
          </div>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
};
