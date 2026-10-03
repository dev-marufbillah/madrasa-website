import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, ArrowLeft, GraduationCap, Clock, Award, FileEdit } from "lucide-react";

const programDetails: Record<
  string,
  {
    name: string;
    arabicName: string;
    level: string;
    duration: string;
    eligibility: string;
    description: string;
    subjects: string[];
    outcomes: string[];
  }
> = {
  ebtedayee: {
    name: "ইবতেদায়ী (Ebtedayee)",
    arabicName: "المرحلة الابتدائية",
    level: "প্রথম শ্রেণি থেকে পঞ্চম শ্রেণি (Class 1 – 5)",
    duration: "৫ বছর",
    eligibility: "বয়স ৫+ বছর এবং প্রাথমিক জ্ঞান",
    description:
      "ইবতেদায়ী হলো ইসলামী শিক্ষা ও প্রাথমিক সাধারণ শিক্ষার মূল ভিত্তি। এখানে কোমলমতি শিশুদের পবিত্র কুরআন তিলাওয়াত, তাজবিদ, প্রাথমিক কায়দা, মাসআলা-মাসায়েল ও দোয়ার পাশাপাশি বাংলা, ইংরেজি, গণিত ও পরিবেশ পরিচিতি শিক্ষা দেওয়া হয়।",
    subjects: [
      "কুরআন মাজিদ ও তাজবিদ",
      "আকাইদ ও ফিকাহ",
      "আরবি ভাষা (প্রাথমিক)",
      "বাংলা ভাষা ও সাহিত্য",
      "ইংরেজি ভাষা",
      "গণিত",
      "সাধারণ জ্ঞান ও বিজ্ঞান",
    ],
    outcomes: [
      "সঠিক মাখরাজ ও তাজবিদ সহকারে কুরআন তিলাওয়াতের যোগ্যতা অর্জন",
      "দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া ও মাসআলা শেখা",
      "বাংলা ও ইংরেজি সুন্দরভাবে পড়তে ও লিখতে পারা",
      "গণিতের প্রাথমিক হিসাব-নিকাশে পারদর্শী হওয়া",
    ],
  },
  dakhil: {
    name: "দাখিল (Dakhil)",
    arabicName: "المرحلة الثانوية",
    level: "ষষ্ঠ শ্রেণি থেকে দশম শ্রেণি (Class 6 – 10)",
    duration: "৫ বছর",
    eligibility: "ইবতেদায়ী / পিএসসি / সমমান পাস",
    description:
      "দাখিল স্তর হলো মাধ্যমিক শিক্ষার সমমান। এখানে শিক্ষার্থীদের সাধারণ মাধ্যমিক শিক্ষা বোর্ডের সমমানের সিলেবাসের সাথে গভীর ইসলামী জ্ঞান, আরবি ব্যাকরণ, হাদিস ও তাফসিরের বুনিয়াদি শিক্ষা প্রদান করা হয়। বিজ্ঞান ও সাধারণ উভয় শাখা বিদ্যমান।",
    subjects: [
      "আল-কুরআন ও তাফসির",
      "আল-হাদিস ও উসুলুল হাদিস",
      "আল-ফিকাহ ও উসুলুল ফিকাহ",
      "আরবি ১ম ও ২য় পত্র (নাহু-সরফ)",
      "বাংলা ১ম ও ২য় পত্র",
      "ইংরেজি ১ম ও ২য় পত্র",
      "সাধারণ গণিত",
      "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
      "পদার্থবিদ্যায়/রসায়ন (বিজ্ঞান বিভাগ)",
    ],
    outcomes: [
      "বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড কর্তৃক স্বীকৃত দাখিল (SSC সমমান) সনদ লাভ",
      "আরবি ভাষায় কথা বলা ও লেখার প্রাথমিক দক্ষতা অর্জন",
      "উচ্চতর ইসলামী শিক্ষা ও সায়েন্স কোর্সে ভর্তির যোগ্যতা অর্জন",
    ],
  },
  alim: {
    name: "আলিম (Alim)",
    arabicName: "المرحلة العالية",
    level: "একাদশ ও দ্বাদশ শ্রেণি (Class 11 – 12)",
    duration: "২ বছর",
    eligibility: "দাখিল / এসএসসি / সমমান পাস",
    description:
      "আলিম স্তর উচ্চ মাধ্যমিক শিক্ষার সমমান। উচ্চতর ইসলামী গবেষণা, তাফসির, হাদিস সাহিত্য ও শরিয়াহ আইনের গভীর অধ্যয়নের পাশাপাশি বিজ্ঞান, মানবিক ও তথ্যপ্রযুক্তি বিষয়ে পূর্ণাঙ্গ প্রস্তুতি গড়ে তোলা হয়।",
    subjects: [
      "তাফসিরুল কুরআন (জালালাইন)",
      "হাদিস শরীফ (মিশকাতুল মাসাবিহ)",
      "ফিকাহ ও ফরায়েজ (উত্তরাধিকার আইন)",
      "আরবি সাহিত্য ও অলংকার শাস্ত্র (বালাগাত-মানতিক)",
      "ইসলামের ইতিহাস",
      "বাংলা ও ইংরেজি (উচ্চতর)",
      "তথ্য ও যোগাযোগ প্রযুক্তি",
    ],
    outcomes: [
      "উচ্চ মাধ্যমিক (HSC সমমান) সনদ লাভ",
      "বিশ্ববিদ্যালয় ও ফাজিল অনার্সে ভর্তির পূর্ণাঙ্গ যোগ্যতা",
      "ইসলামী শরিয়াহ ও সমসাময়িক বিষয়ে গভীর জ্ঞান লাভ",
    ],
  },
  fazil: {
    name: "ফাজিল (Fazil)",
    arabicName: "مرحلة الفضيلة",
    level: "ডিগ্রী / অনার্স স্তর (Bachelor Degree Level)",
    duration: "৩ বছর (ডিগ্রী) / ৪ বছর (অনার্স)",
    eligibility: "আলিম / এইচএসসি / সমমান পাস",
    description:
      "ইসলামী আরবি বিশ্ববিদ্যালয় অধিভুক্ত ফাজিল অনার্স ও পাশ কোর্স। এখানে তাফসির ও কুরআন বিজ্ঞান, হাদিস ও ইসলামী গবেষণা, দাওয়াহ এবং আল-ফিকাহ বিষয়ে স্নাতক ডিগ্রী প্রদান করা হয়।",
    subjects: [
      "আল-কুরআন ও তাফসির বিজ্ঞান",
      "আল-হাদিস ও হাদিস গবেষণা",
      "উসুলুল ফিকাহ ও ইসলামী আইনশাস্ত্র",
      "আরবি ভাষা ও সাহিত্য (অ্যাডভান্সড)",
      "তুলনামূলক ধর্মতত্ত্ব ও দাওয়াহ",
      "স্বাধীন বাংলাদেশের অভ্যুদয়ের ইতিহাস",
    ],
    outcomes: [
      "ইসলামী আরবি বিশ্ববিদ্যালয় কর্তৃক স্বীকৃত স্নাতক (Bachelor) ডিগ্রী",
      "বিসিএসসহ সরকারি ও বেসরকারি উচ্চপদস্থ চাকরিতে আবেদনের যোগ্যতা",
      "গবেষক, মুফতি ও আরবি ব্যাকরণবিদ হিসেবে আত্মপ্রকাশের পথ সুগম",
    ],
  },
  kamil: {
    name: "কামিল (Kamil)",
    arabicName: "مرحلة الكمال",
    level: "মাস্টার্স স্তর (Master Degree Level)",
    duration: "২ বছর",
    eligibility: "ফাজিল অনার্স / ফাজিল পাস সমমান",
    description:
      "ইসলামী শিক্ষার সর্বোচ্চ প্রাতিষ্ঠানিক ডিগ্রি। হাদিস, তাফসির, ফিকাহ এবং আদব (আরবি সাহিত্য) বিষয়ে বিশেষজ্ঞ তৈরির জন্য এই স্নাতকোত্তর প্রোগ্রাম পরিচালিত হয়।",
    subjects: [
      "বুখারী শরীফ, মুসলিম শরীফসহ কুতুবে সিয়াহর গভীর গবেষণা",
      "তাফসিরে ইবনে কাসির ও তাফসিরে কাবির গবেষণা",
      "ফিকহুল মুকারান (তুলনামূলক আইনশাস্ত্র)",
      "ইসলামী অর্থনীতি ও আধুনিক ব্যাংকিং ব্যবস্থা",
      "গবেষণা পদ্ধতি ও থিসিস (Thesis)",
    ],
    outcomes: [
      "ইসলামী আরবি বিশ্ববিদ্যালয় কর্তৃক স্বীকৃত স্নাতকোত্তর (Master Degree) সনদ",
      "মুহাদ্দিস, মুফাসসির, ইসলামিক স্কলার ও গবেষক হিসেবে দায়িত্ব পালনের যোগ্যতা",
      "দেশ-বিদেশের স্বনামধন্য বিশ্ববিদ্যালয়ে গবেষণার সুযোগ",
    ],
  },
};

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();

  const program = programDetails[slug];

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-[#f8faf8] min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div>
          <Link
            href="/academic"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0b3b2c] hover:underline bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm"
          >
            <ArrowLeft size={16} />
            সকল একাডেমিক প্রোগ্রামে ফিরে যান
          </Link>
        </div>

        {/* Tailwind v4 linear gradient fix applied here */}
        <div className="bg-linear-to-r from-[#0b3b2c] to-[#115a44] rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
              Academic Program Details
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {program.name}
            </h1>
            <p className="text-lg text-[#4ade80] font-arabic tracking-wide font-medium">
              {program.arabicName}
            </p>
            <p className="text-xs md:text-sm text-gray-200 pt-1">
              স্তুর: <b>{program.level}</b>
            </p>
          </div>

          <Link
            href="/admission"
            className="inline-flex items-center gap-2 bg-[#4ade80] text-[#0b3b2c] hover:bg-white px-6 py-3.5 rounded-2xl text-xs font-extrabold transition-all shadow-lg self-start md:self-auto shrink-0"
          >
            <FileEdit size={16} />
            এই কোর্সে ভর্তি আবেদন করুন
          </Link>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0b3b2c]/10 text-[#0b3b2c] flex items-center justify-center shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase">মেয়াদ (Duration)</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{program.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase">ভর্তির যোগ্যতা</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{program.eligibility}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase">সনদের স্বীকৃতি</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">মাদ্রাসা শিক্ষা বোর্ড / ইআবি</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-[#0b3b2c] flex items-center gap-2 pb-2 border-b border-gray-100">
                <BookOpen size={20} />
                প্রোগাম ওভারভিউ (Overview)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed pt-2">
                {program.description}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#0b3b2c] flex items-center gap-2 pb-2 border-b border-gray-100">
                <BookOpen size={20} />
                প্রধান বিষয়সমূহ (Key Subjects)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {program.subjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#f8faf8] border border-gray-100 flex items-center gap-3 text-xs font-bold text-gray-800"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0b3b2c]"></div>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm h-fit space-y-4">
            <h2 className="text-base font-bold text-[#0b3b2c] pb-2 border-b border-gray-100 flex items-center gap-2">
              <CheckCircle2 size={18} />
              অর্জিত দক্ষতা ও অর্জন
            </h2>

            <ul className="space-y-3 text-xs text-gray-600">
              {program.outcomes.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/admission"
                className="w-full py-3 bg-[#0b3b2c] text-white text-xs font-bold rounded-xl hover:bg-[#082a1f] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                ভর্তির আবেদন করুন →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}