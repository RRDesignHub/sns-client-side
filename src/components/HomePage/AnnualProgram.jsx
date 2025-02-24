import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import pro_1 from "../../assets/pro-1.jpg";
import pro_2 from "../../assets/pro-2.jpg";
export const AnnualProgram = () => {
  return (
    <section className="py-12 bg-base-200 text-primary">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">
          একাডেমিক প্রোগ্রাম
        </h2>
        <p className="text-lg mb-12 text-secondary">
          শাহ নেয়ামত স্কুল শিক্ষার্থীদের জন্য একাডেমিক ও সহশিক্ষা কার্যক্রম
          পরিচালনা করে, যা তাদের প্রতিভা বিকাশে সহায়তা করে।
        </p>

        {/* প্রধান প্রোগ্রাম সমূহ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card shadow-lg bg-white p-6 border-l-4 border-primary space-y-2">
            <h3 className="text-2xl font-semibold">
              বার্ষিক ক্রীড়া প্রতিযোগিতা
            </h3>
            <p className="text-secondary">
              আমাদের শিক্ষার্থীরা বার্ষিক ক্রীড়া প্রতিযোগিতায় তাদের শারীরিক
              দক্ষতা প্রদর্শন করে।
            </p>
          </div>
          <div className="card shadow-lg bg-white p-6 border-l-4 border-secondary space-y-2">
            <h3 className="text-2xl font-semibold">
              সাংস্কৃতিক ইভেন্ট ও প্রতিভা প্রদর্শনী
            </h3>
            <p className="text-secondary">
              নৃত্য, সঙ্গীত ও নাটকের মাধ্যমে শিক্ষার্থীরা তাদের প্রতিভা তুলে
              ধরে।
            </p>
          </div>
          <div className="card shadow-lg bg-white p-6 border-l-4 border-accent space-y-2">
            <h3 className="text-2xl font-semibold">একাডেমিক প্রতিযোগিতা</h3>
            <p className="text-secondary">
              বিতর্ক, বিজ্ঞান মেলা, কুইজ ও অন্যান্য শিক্ষামূলক কার্যক্রম।
            </p>
          </div>
        </div>

        {/* সাম্প্রতিক ইভেন্ট কারাউসেল */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-4">সাম্প্রতিক ইভেন্ট</h3>
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
              <div className="carousel-item h-80">
                <img
                  src={pro_2}
                  alt="ইভেন্ট ১"
                  className="w-full  h-full object-top rounded-lg"
                />
                <div className="absolute bottom-4 left-[50%] transform -translate-x-1/2 bg-primary text-white p-3 rounded-md shadow-lg">
                  <h4 className="text-xl font-bold">
                    বার্ষিক সাংস্কৃতিক প্রতিযোগিতা ২০২৪
                  </h4>
                  <p>
                    একটি প্রতিভা উন্মোচনের বিশেষ আয়োজন, যেখানে শিক্ষার্থীরা
                    অংশগ্রহণ করে।
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-item h-80">
                <img
                  src={pro_1}
                  alt="ইভেন্ট ১"
                  className="w-full h-full object-top rounded-lg"
                />
                <div className="absolute bottom-4 left-[50%] transform -translate-x-1/2 bg-primary text-white p-3 rounded-md shadow-lg">
                  <h4 className="text-xl font-bold">
                    বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৪
                  </h4>
                  <p>
                    একটি প্রতিভা উন্মোচনের বিশেষ আয়োজন, যেখানে শিক্ষার্থীরা
                    অংশগ্রহণ করে।
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* কল টু অ্যাকশন */}
        <div className="mt-12">
          <a href="/events" className="btn bg-primary text-white hover:bg-secondary transition">
            আরো ইভেন্ট দেখুন
          </a>
        </div>
      </div>
    </section>
  );
};
