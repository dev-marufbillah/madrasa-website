import Link from "next/link";
import { FileEdit, BookOpen, GraduationCap, Megaphone, ArrowRight } from "lucide-react";

const actions = [
  {
    title: "Admission",
    description: "Join our esteemed institution and build your future.",
    icon: FileEdit,
    href: "/admission",
  },
  {
    title: "Academic",
    description: "Explore our programs, subjects and academic structure.",
    icon: BookOpen,
    href: "/academic",
  },
  {
    title: "Student Portal",
    description: "Access your academic information, results and more.",
    icon: GraduationCap,
    href: "/student",
  },
  {
    title: "Notice Board",
    description: "Latest notices, circulars and important updates.",
    icon: Megaphone,
    href: "/notices",
  },
];

export default function QuickActions() {
  return (
    <section className="relative z-20 -mt-10 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="group bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(11,59,44,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#0b3b2c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className="text-white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-gray-900 mb-1.5 group-hover:text-[#0b3b2c] transition-colors">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                  {action.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-[#0b3b2c]">
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}