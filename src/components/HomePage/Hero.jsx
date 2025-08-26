
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import heroImg_1 from "./../../assets/Hero-1.jpg";
import Asembly from "./../../assets/Asembly (1).jpg";
import Teachers from "./../../assets/Teachers_1.jpg";
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
        spaceBetween={0}
        modules={[Autoplay]}
        className="mySwiper w-full"
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
            <img src={Teachers} className="h-full lg:w-full lg:h-[500px] object-cover" />
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div  className="w-full">
            <img src={Asembly} className="h-full lg:w-full lg:h-[500px] object-cover" />
            
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
