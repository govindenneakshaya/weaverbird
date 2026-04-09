import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import UploadSection from "@/components/UploadSection";
import BookSlotSection from "@/components/BookSlotSection";
import AIChatWidget from "@/components/AIChatWidget";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <UploadSection />
      <BookSlotSection />
      <FooterSection />
      <AIChatWidget />
    </div>
  );
};

export default Index;
