import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const Testimonial = () => {
  return (
    <section className="py-12 bg-base-200 text-primary">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">
          গার্ডিয়ান ও শিক্ষার্থীদের মতামত
        </h2>
        <p className="text-lg mb-2 text-secondary">
          শাহ নেয়ামত স্কুলের শিক্ষার্থীদের অভিজ্ঞতা ও অভিভাবকদের সন্তুষ্টি
          আমাদের গর্ব।
        </p>
    
        <div className="divider my-0 mb-4"></div>
        {/* Guardians' Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold mb-6 text-secondary">
            🧑‍💼 অভিভাবকদের মতামত
          </h3>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="carousel-item flex-col p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg italic text-secondary">
                  "স্কুলের শিক্ষাগত মান ও পরিবেশ চমৎকার! আমার সন্তান এখানে পড়ে
                  আমি খুবই সন্তুষ্ট।"
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/153719362/photo/bengali-woman.jpg?s=612x612&w=0&k=20&c=I-fIq5gwUZJlmkOIqXJBNBJJKgy74oE39LZ83FCCGmQ="
                    alt="Guardian 2"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="text-primary font-bold">সাবিহা রহমান</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item flex-col p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg italic text-secondary">
                  "আমার সন্তান এখানে পড়ে এবং অসাধারণ শিক্ষা ও মূল্যবোধ অর্জন
                  করছে। শিক্ষকরা খুব যত্নশীল।"
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpRiHp36apIw_2UyEuwJT7_mdydt7x-mrrDw&s"
                    alt="Guardian 1"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="text-primary font-bold">মোহাম্মদ আমিন</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Students' Testimonials */}
        <div>
          <h3 className="text-3xl font-semibold mb-6 text-secondary">
            🎓 শিক্ষার্থীদের মতামত
          </h3>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="carousel-item flex-col p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg italic text-secondary">
                  "স্কুলের একাডেমিক ও সহশিক্ষা কার্যক্রম দারুণ! এখানে শেখার অনেক
                  সুযোগ আছে।"
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCF6NzolOdlU0gJg7GqWa6bgL5yH_CF8eWiw&s"
                    alt="Student 2"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="text-primary font-bold">সামিয়া আক্তার</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item flex-col p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg italic text-secondary">
                  "শিক্ষকরা খুব সহায়ক এবং ক্লাসগুলো আকর্ষণীয়! আমি আমার স্কুলকে
                  খুব ভালোবাসি।"
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src="https://shollaschoolcollege.edu.bd/front/img/students/5cb41981a80151.JPG"
                    alt="Student 1"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span className="text-primary font-bold">রফিকুল ইসলাম</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
