import { Link } from "react-router-dom";
import img from "./../assets/Hero-1.jpg";
export const About = () => {
  return (
    <>
      <div className="bg-green-700 py-8 lg:py-10 lg:px-20 mb-10">
        <div className="w-11/12 mx-auto flex max-sm:flex-col gap-y-6 md:gap-5 items-center justify-between">
        
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-2">আমাদের সম্পর্কে</h2>
            <p className="text-white mb-8">
              শাহ নেয়ামত (আরএইচ:) কেজি অ্যান্ড হাই স্কুল একটি আদর্শ
              শিক্ষাপ্রতিষ্ঠান, যেখানে শিক্ষার্থীদের মানসম্মত শিক্ষা ও নৈতিক
              মূল্যবোধের বিকাশে সর্বোচ্চ গুরুত্ব দেওয়া হয়। আমাদের লক্ষ্য
              শিক্ষার্থীদের জ্ঞান, দক্ষতা, এবং সৃজনশীলতায় পরিপূর্ণ করে
              ভবিষ্যতের চ্যালেঞ্জ মোকাবিলায় সক্ষম করে তোলা। আমাদের স্কুলে
              আধুনিক পাঠদানের পাশাপাশি সহশিক্ষামূলক কার্যক্রম, ক্রীড়া এবং নৈতিক
              শিক্ষার মাধ্যমে শিক্ষার্থীদের সর্বাঙ্গীন উন্নয়নে বিশেষ নজর দেওয়া
              হয়। আমরা বিশ্বাস করি, প্রতিটি শিক্ষার্থীই অনন্য এবং তাদের
              প্রতিভার বিকাশ আমাদের প্রধান দায়িত্ব।
            </p>
            <Link
              to="/management"
              className="btn bg-white text-black rounded-3xl"
            >
              পরিচালকমণ্ডলী
            </Link>
          </div>
          <div className="flex-1">
            <img
              className="w-full rounded-xl drop-shadow-white"
              src={img}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
