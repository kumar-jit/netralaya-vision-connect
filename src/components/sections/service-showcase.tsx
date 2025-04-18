
import { Card, CardContent } from "@/components/ui/card";

type ServiceItem = {
  image: string;
  title: string;
  description: string;
};

const serviceItems: ServiceItem[] = [
  {
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    title: "Comprehensive Eye Examination",
    description: "Complete eye health evaluation using state-of-the-art equipment"
  },
  {
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    title: "Cataract Surgery",
    description: "Advanced surgical procedures with minimal recovery time"
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Glaucoma Management",
    description: "Early detection and treatment of glaucoma to preserve vision"
  },
  {
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    title: "Pediatric Eye Care",
    description: "Specialized care for children's vision development"
  }
];

export function ServiceShowcase() {
  return (
    <section className="relative bg-muted/30 section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 heading-gradient">
          Our Services in Action
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((item, index) => (
            <Card 
              key={index} 
              className="glass-card overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-video relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
