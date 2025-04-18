
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, PanelsTopLeft, ClipboardCheck, LucideIcon, Search, Shield, Brain } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Comprehensive Eye Examination",
    description: "Complete evaluation of eye health and vision to detect issues early and ensure optimal eye care.",
    icon: Eye,
  },
  {
    title: "Vision Testing",
    description: "Accurate assessment of your vision to determine if corrective lenses are needed for clear sight.",
    icon: Search,
  },
  {
    title: "Cataract Diagnosis",
    description: "Early detection and management plans for cataracts to preserve vision and quality of life.",
    icon: PanelsTopLeft,
  },
  {
    title: "Glaucoma Screening",
    description: "Regular pressure checks and screenings to prevent glaucoma-related vision loss.",
    icon: Shield,
  },
  {
    title: "Diabetic Eye Care",
    description: "Specialized care for diabetic patients to monitor and prevent diabetes-related eye complications.",
    icon: ClipboardCheck,
  },
  {
    title: "Neuro-Ophthalmology",
    description: "Evaluation and management of visual issues related to the nervous system and brain.",
    icon: Brain,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of eye care services to ensure your vision remains clear and your eyes stay healthy
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border border-border/50 bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-eyepurple/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-eyepurple" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
