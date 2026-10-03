import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import About from "@/components/home/About";
import AcademicPrograms from "@/components/home/AcademicPrograms";
import NewsEvents from "@/components/home/NewsEvents";
import Gallery from "@/components/home/Gallery";

export default function InstitutionalHomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <About />
      <AcademicPrograms />
      <NewsEvents />
      <Gallery />
    </>
  );
}