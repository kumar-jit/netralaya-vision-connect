
import { BadgeCheck, Award, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DoctorSection() {
  return (
    <section id="doctor" className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-eyepurple/20 to-eyeblue/20 rounded-2xl transform -rotate-3"></div>
            <img 
              src="/placeholder.svg" 
              alt="Dr. Puspendu Maity" 
              className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
            />
            <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg shadow-lg border border-border z-20">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-eyepurple" />
                <span className="font-semibold">15+ Years Experience</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">Meet Your Doctor</h2>
            <h3 className="text-2xl font-semibold mb-2">Dr. Puspendu Maity</h3>
            <p className="text-muted-foreground mb-6">
              Dr. Puspendu Maity is a highly skilled ophthalmologist with over 15 years of experience in eye care. His dedication to providing personalized care and expertise in the latest eye treatment technologies has helped thousands of patients achieve better vision and eye health.
            </p>
            
            <div className="space-y-4 mb-6">
              <Card className="border border-border/50">
                <CardContent className="pt-6 flex items-start gap-4">
                  <GraduationCap className="h-5 w-5 text-eyepurple mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Education & Qualifications</h4>
                    <p className="text-muted-foreground">MBBS, MS (Ophthalmology), Fellowship in Cataract and Refractive Surgery</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border/50">
                <CardContent className="pt-6 flex items-start gap-4">
                  <Award className="h-5 w-5 text-eyepurple mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Specialization</h4>
                    <p className="text-muted-foreground">Cataract Surgery, Glaucoma Treatment, Comprehensive Eye Care, Pediatric Ophthalmology</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <blockquote className="border-l-4 border-eyepurple pl-4 italic text-muted-foreground">
              "My mission is to provide accessible, high-quality eye care that improves the quality of life for all my patients. Your vision is my priority."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
