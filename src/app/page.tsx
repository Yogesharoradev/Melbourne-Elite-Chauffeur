import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { VehicleGallery } from "@/components/sections/VehicleGallery";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MapSection } from "@/components/sections/MapSection";
import { WhatsAppFloat } from "@/components/floatingWhatsapp";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex-1">
        <HeroSection />
        <StatsSection />
        <VehicleGallery />
        {/* <DestinationsSection /> */}
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <MapSection />
      </div>
      <Footer />
      <WhatsAppFloat
        phoneNumber={process.env.NEXT_PUBLIC_APP_WHATSAPP || ""}
      />
    </main>
  );
}
