
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Lightbulb, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">About Sudipa Netralaya</h2>
            <p className="text-muted-foreground mb-6">
              Sudipa Netralaya was founded with a singular vision: to provide exceptional eye care services to patients of all ages. Named after Dr. Puspendu Maity's mother, our practice embodies the nurturing care and attention that every patient deserves.
            </p>
            <p className="text-muted-foreground mb-6">
              With state-of-the-art equipment and a compassionate approach, we're committed to preserving and enhancing your vision. Our practice has grown from a single clinic to multiple locations throughout Kolkata, but our personalized approach remains unchanged.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Heart className="h-8 w-8 text-eyepurple mb-3" />
                  <h3 className="font-semibold mb-1">Compassionate Care</h3>
                  <p className="text-sm text-muted-foreground">Patient comfort is our top priority</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Lightbulb className="h-8 w-8 text-eyepurple mb-3" />
                  <h3 className="font-semibold mb-1">Advanced Treatment</h3>
                  <p className="text-sm text-muted-foreground">Latest medical technologies</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Users className="h-8 w-8 text-eyepurple mb-3" />
                  <h3 className="font-semibold mb-1">Family-Oriented</h3>
                  <p className="text-sm text-muted-foreground">Eye care for all ages</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-eyepurple/20 to-eyeblue/20 rounded-2xl transform rotate-3"></div>
            <img 
              src="/placeholder.svg" 
              alt="Sudipa Netralaya clinic" 
              className="w-full h-auto object-cover rounded-2xl shadow-lg relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
