export default function Overview() {
  return (
    <div className="p-6 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-primary text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold">
          Welcome to <span className="font-bold text-green-50 text-3xl">Shah Neyamat (RH:) KG & High School</span>
        </h1>
        <p className="text-lg mt-2">
          Manage students, teachers, and school operations efficiently.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Total Students */}
        <div className="bg-card p-6 rounded-xl shadow-md border-l-8 border-green-700">
          <h2 className="text-xl font-semibold text-primary">Total Students</h2>
          <p className="text-4xl font-bold mt-2 text-green-700">1,245</p>
        </div>

        {/* Total Teachers */}
        <div className="bg-card p-6 rounded-xl shadow-md border-l-8 border-green-600">
          <h2 className="text-xl font-semibold text-primary">Total Teachers</h2>
          <p className="text-4xl font-bold mt-2 text-green-700">56</p>
        </div>

        {/* Total Classrooms */}
        <div className="bg-card p-6 rounded-xl shadow-md border-l-8 border-green-500">
          <h2 className="text-xl font-semibold text-primary">
            Total Classrooms
          </h2>
          <p className="text-4xl font-bold mt-2 text-green-700">32</p>
        </div>

        {/* Ongoing Exams */}
        <div className="bg-card p-6 rounded-xl shadow-md border-l-8 border-green-400">
          <h2 className="text-xl font-semibold text-primary">Ongoing Exams</h2>
          <p className="text-4xl font-bold mt-2 text-green-700">3</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-card p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-xl font-semibold text-primary">
          Recent Activities
        </h2>
        <ul className="mt-4 space-y-2">
          <li className="text-green-700">
            ✅ New student "Arafat Hossain" admitted to Class 6.
          </li>
          <li className="text-green-700">
            ✅ Final term results uploaded for Class 8.
          </li>
          <li className="text-green-700">
            ✅ Teacher "Ms. Rahima Begum" added to Mathematics Department.
          </li>
          <li className="text-green-700">
            ✅ "Science Fair 2025" scheduled for March 10.
          </li>
        </ul>
      </div>
    </div>
  );
}
