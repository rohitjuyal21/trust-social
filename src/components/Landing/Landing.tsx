import Features from "./Features";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ReadyToGetStart from "./ReadyToGetStart";

export default function Landing() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <Features />
      <ReadyToGetStart />
      <Footer />
    </div>
  );
}
