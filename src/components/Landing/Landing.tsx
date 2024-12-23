import Features from "./Features";
import HeroSection from "./HeroSection";
import ReadyToGetStart from "./ReadyToGetStart";

export default function Landing() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <Features />
      <ReadyToGetStart />
    </div>
  );
}
