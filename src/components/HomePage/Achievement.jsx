
export const Achievement = () => {
  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-green-700 text-center mb-8">🏆 আমাদের শিক্ষার্থীদের অর্জন</h2>
        <p className="text-lg text-green-600 text-center mb-12">একাডেমিক, ক্রীড়া এবং প্রতিযোগিতায় শ্রেষ্ঠত্ব উদযাপন!</p>
        
        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Academic Excellence */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">🎓 একাডেমিক শ্রেষ্ঠত্ব</h3>
            <ul className="space-y-3 text-green-800">
              <li>🥇 <strong>রাহিম আহমেদ</strong> - GPA 5.00 - এইচএসসি ২০২৪</li>
              <li>🥈 <strong>সাদিয়া খান</strong> - GPA 5.00 - এসএসসি ২০২৩</li>
              <li>🥉 <strong>আরিয়ান সাহা</strong> - জেলা টপার - ৯৮% স্কোর</li>
            </ul>
          </div>
          
          {/* Sports Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">⚽ ক্রীড়া অর্জন</h3>
            <ul className="space-y-3 text-green-800">
              <li>🏆 চ্যাম্পিয়ন - আন্তঃবিদ্যালয় ফুটবল টুর্নামেন্ট ২০২৪</li>
              <li>🥈 রানার-আপ - জেলা ক্রিকেট চ্যাম্পিয়নশিপ ২০২৩</li>
              <li>🥇 স্বর্ণপদক - জাতীয় অ্যাথলেটিক্স প্রতিযোগিতা ২০২২</li>
            </ul>
          </div>
          
          {/* Interschool Competitions */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">🎭 প্রতিযোগিতা ও ইভেন্ট</h3>
            <ul className="space-y-3 text-green-800">
              <li>📖 ১ম স্থান - জাতীয় বিতর্ক প্রতিযোগিতা ২০২৪</li>
              <li>🔬 সেরা উদ্ভাবন পুরস্কার - বিজ্ঞান মেলা ২০২৩</li>
              <li>🎭 সেরা নাটক পারফরম্যান্স - সাংস্কৃতিক উৎসব ২০২২</li>
            </ul>
          </div>
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition">
            আরও দেখুন
          </button>
        </div>
      </div>
    </section>
  )
}
