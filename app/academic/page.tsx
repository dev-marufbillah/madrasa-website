import AcademicPrograms from "@/components/home/AcademicPrograms";

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] pt-10">
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b3b2c]">একাডেমিক কার্যক্রম</h1>
        <p className="text-gray-500 text-sm mt-2">আমাদের মাদ্রাসার সকল ক্লাস ও কারিকুলাম বিস্তারিত</p>
      </div>
      <AcademicPrograms />
    </div>
  );
}