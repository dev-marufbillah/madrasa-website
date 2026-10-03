import Link from "next/link";
import { Play, Target, Eye, Gem, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-[#f8faf8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Campus Image with Play Button */}
          <div className="lg:col-span-4 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
                alt="Campus Tour"
                className="w-full h-[320px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              
              {/* Play Button */}
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play size={28} className="text-[#0b3b2c] ml-1" fill="#0b3b2c" />
                </div>
              </button>

              {/* Bottom Label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={10} fill="white" />
                </div>
                <span>Watch Our Campus Tour</span>
              </div>
            </div>
          </div>

          {/* Middle: About Content */}
          <div className="lg:col-span-4">
            <p className="text-[#0b3b2c] text-sm font-medium mb-2">
              About Alia Madrasa
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b3b2c] leading-tight mb-4">
              A Legacy of Knowledge
              <br />
              and Righteousness
            </h2>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
              Alia Madrasa is a renowned Islamic educational institution 
              with a rich history of academic excellence and spiritual 
              growth. We combine traditional Islamic values with modern 
              education to develop well-rounded individuals.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#0b3b2c] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#082a1f] hover:scale-105 transition-all duration-300"
            >
              Learn More
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right: Mission, Vision, Values */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Mission */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0b3b2c]/10 flex items-center justify-center flex-shrink-0">
                  <Target size={20} className="text-[#0b3b2c]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">Our Mission</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    To provide quality Islamic and modern education for a better society.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0b3b2c]/10 flex items-center justify-center flex-shrink-0">
                  <Eye size={20} className="text-[#0b3b2c]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">Our Vision</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    To be a leading center of Islamic and academic excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0b3b2c]/10 flex items-center justify-center flex-shrink-0">
                  <Gem size={20} className="text-[#0b3b2c]" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">Our Values</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    Faith, Knowledge, Discipline, Service, Integrity.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}