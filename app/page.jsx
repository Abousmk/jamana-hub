import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import BentoHub from "@/components/sections/BentoHub";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <BentoHub />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
