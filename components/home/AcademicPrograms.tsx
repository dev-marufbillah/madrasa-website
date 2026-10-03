import Link from "next/link";
import { BookOpen, Building2, Landmark, Award, GraduationCap, ArrowRight } from "lucide-react";

const programs = [
  {
    name: "Ebtedayee",
    level: "(Class 1 – 5)",
    icon: BookOpen,
    href: "/academic/ebtedayee",
  },
  {
    name: "Dakhil",
    level: "(Class 6 – 10)",
    icon: Building2,
    href: "/academic/dakhil",
  },
  {
    name: "Alim",
    level: "(Class 11 – 12)",
    icon: Landmark,
    href: "/academic/alim",
  },
  {
    name: "Fazil",
    level: "(Bachelor Level)",
    icon: Award,
    href: "/academic/fazil",
  },
  {
    name: "Kamil",
    level: "(Master Level)",
    icon: GraduationCap,
    href: "/academic/kamil",
  },
];

export default function AcademicPrograms() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* ===== LEFT SIDE ===== */}
          <div className="lg:col-span-7">
            <p className="text-[#0b3b2c] text-sm font-medium mb-2">
              Academic Programs
            </p>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#0b3b2c] leading-tight mb-3">
              Education for a Complete Life
            </h2>
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8 max-w-lg">
              We offer a comprehensive curriculum that blends Islamic teachings
              with modern education, preparing students for both this world and the Hereafter.
            </p>

            {/* 5 Program Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <Link
                    key={index}
                    href={program.href}
                    className="group bg-[#f7f9f8] hover:bg-white rounded-xl p-4 border border-transparent hover:border-gray-200 hover:shadow-md transition-all duration-300 text-center"
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-full bg-[#e8f0ec] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#0b3b2c] transition-colors duration-300">
                      <Icon
                        size={18}
                        className="text-[#0b3b2c] group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Name */}
                    <h4 className="text-[13px] font-bold text-gray-800 mb-0.5">
                      {program.name}
                    </h4>

                    {/* Level */}
                    <p className="text-[11px] text-gray-400 mb-2">
                      {program.level}
                    </p>

                    {/* Learn More */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0b3b2c]">
                      Learn More
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ===== RIGHT SIDE: Image + Quote ===== */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden h-[340px] md:h-[400px] shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070&auto=format&fit=crop"
                alt="Student reading Quran"
                className="w-full h-full object-cover"
              />
              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b3b2c]/85 via-[#0b3b2c]/30 to-transparent"></div>

              {/* Quote */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-[15px] md:text-[17px] font-medium italic leading-relaxed mb-1">
                  &quot;Seek knowledge from cradle to grave.&quot;
                </p>
                <p className="text-white/60 text-[12px]">
                  — Prophet Muhammad (ﷺ)
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}