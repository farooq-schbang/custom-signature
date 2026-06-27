import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Compare } from "@/components/sections/Compare";
import { InteractiveDesign } from "@/components/sections/InteractiveDesign";
import { Builder } from "@/components/sections/Builder";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main style={{ background: "#020208" }}>
      <Navbar />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Compare />
      <InteractiveDesign />
      <Builder />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
