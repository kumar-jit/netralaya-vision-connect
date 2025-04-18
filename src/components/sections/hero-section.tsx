
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "../../assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 heading-gradient">
              Your Vision, Our Priority
            </h1>
            <p className="text-lg text-muted-foreground mb-8 md:pr-12">
              Sudipa Netralaya provides comprehensive eye care with a gentle touch. 
              Dr. Puspendu Maity brings years of expertise to ensure your eye health is in safe hands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-eyepurple hover:bg-eyepurple-dark">
                <a href="#appointment">Book Appointment</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <a href="#services" className="flex items-center gap-2">
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-eyepurple/20 to-eyeblue/20 rounded-2xl transform rotate-3"></div>
              <img 
                src="/placeholder.svg" 
                alt="Eye care professional examining a patient" 
                className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
