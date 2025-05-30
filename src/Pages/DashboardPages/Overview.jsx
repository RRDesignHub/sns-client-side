import { useRole } from "../../Hooks/useRole";

export default function Overview() {
   const [userRole] = useRole();
  const { isTeacher, isAccountant, isAdmin } = userRole;

  return (
    <div className="p-2 md:p-6 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-primary text-white p-2 md:p-6 rounded-xl shadow-lg">
        <h1 className="md:text-3xl">{isTeacher ? <span className="font-extrabold">শিক্ষক/শিক্ষিকা</span> : isAccountant ? <span className="font-extrabold">একাউন্টেন্ড</span> : <span className="font-extrabold">এডমিন</span>} এর ডেসবোর্ডে আপনাকে স্বাগতম</h1>
        <p className="text-xs md:text-lg mt-2">
          শিক্ষক/শিক্ষিকা এবং শিক্ষার্থীর তথ্য পরিচালনা, এডমিট কার্ড ও রেজাল্ট
          তৈরি, নোটিশ প্রকাশ...
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mt-6">
        {/* Total Students */}
        <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-700">
          <h2 className="text-xs md:text-xl font-semibold text-primary">
            মোট শিক্ষার্থী
          </h2>
          <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
            1,245 জন
          </p>
        </div>

        {/* Total Teachers */}
        <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-600">
          <h2 className="text-xs md:text-xl font-semibold text-primary">
            শিক্ষক/ শিক্ষিকা
          </h2>
          <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
            56 জন
          </p>
        </div>

        {/* Total Classrooms */}
        <div className="bg-card p-2 md:p-6  rounded-xl shadow-md border-l-8 border-green-500">
          <h2 className="text-xs md:text-xl font-semibold text-primary">
            মোট শ্রেণীকক্ষ
          </h2>
          <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
            32 টি
          </p>
        </div>

        {/* Ongoing Exams */}
        <div className="bg-card p-2 md:p-6  rounded-xl shadow-md border-l-8 border-green-400">
          <h2 className="text-xs md:text-xl font-semibold text-primary">
            চলমান পরীক্ষা
          </h2>
          <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
            3 টি
          </p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card p-2 md:p-6  rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold text-primary">
          সর্বশেষ কার্যক্রম
        </h2>
        <ul className="mt-4 space-y-2 max-sm:text-xs">
          <li className="text-green-700">
            <span className="font-bold">শিক্ষার্থীর তথ্য:</span> নতুন ছাত্র "আরাফাত হোসেন" শ্রেণি ৬-এ ভর্তি হয়েছে।
          </li>
          <li className="text-green-700">
            <span className="font-bold">রেজাল্ট:</span> শ্রেণি ৮-এর চূড়ান্ত পরীক্ষার ফলাফল আপলোড করা হয়েছে।
          </li>
          <li className="text-green-700">
             <span className="font-bold">শিক্ষক/শিক্ষিকা:</span> প্রাইমারিতে "মিস আকি আকতার" যোগদান করেছেন।
          </li>
          <li className="text-green-700">
            <span className="font-bold">নোটিশ:</span> "অর্ধবার্ষিক পরীক্ষা-২০২৫" অনুষ্ঠিত হবে ২৭ জুন।
          </li>
        </ul>
      </div>
    </div>
  );
}
