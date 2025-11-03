import { Hero } from "@/components/Hero";
import { Scanner } from "@/components/Scanner";
import { Features } from "@/components/Features";
import { Applications } from "@/components/Applications";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Scanner />
      <Features />
      <Applications />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;