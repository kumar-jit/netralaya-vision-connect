
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { DoctorSection } from "@/components/sections/doctor-section";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { LocationsSection } from "@/components/sections/locations-section";
import { AppointmentSection } from "@/components/sections/appointment-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { motion } from "framer-motion";

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <RevealOnScroll>
          <ServicesSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <DoctorSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ServiceShowcase />
        </RevealOnScroll>
        <RevealOnScroll>
          <LocationsSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <AppointmentSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <AboutSection />
        </RevealOnScroll>
        <RevealOnScroll>
          <ContactSection />
        </RevealOnScroll>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
