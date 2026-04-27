import Navbar from "./comps/Navbar";
import Hero from "./comps/Hero";
import About from "./comps/About";
import Why from "./comps/Why";
import Strategy from "./comps/Strategy";
import Models from "./comps/Models";
import CTA from "./comps/CTA";
import Footer from "./comps/Footer";
export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#F7FAF8] text-[#1A2E2F]">
      <Navbar />
      <Hero />
      <About />
      <Why />
      <Strategy />
      <Models />
      <CTA />
      <Footer />
    </main>
  );
}
