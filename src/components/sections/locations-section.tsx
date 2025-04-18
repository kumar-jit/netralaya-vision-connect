import { MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

type Location = {
  name: string;
  address: string;
  hours: {
    day: string;
    time: string;
  }[];
};

const locations: Location[] = [
  {
    name: "Sudipa Netralaya Main Clinic",
    address: "123 Medical Plaza, Kolkata, West Bengal",
    hours: [
      { day: "Monday", time: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
      { day: "Thursday", time: "9:00 AM - 5:00 PM" },
      { day: "Friday", time: "9:00 AM - 5:00 PM" },
      { day: "Saturday", time: "10:00 AM - 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  {
    name: "Sudipa Netralaya South Branch",
    address: "456 Health Center, Jadavpur, Kolkata",
    hours: [
      { day: "Monday", time: "Closed" },
      { day: "Tuesday", time: "10:00 AM - 4:00 PM" },
      { day: "Wednesday", time: "Closed" },
      { day: "Thursday", time: "10:00 AM - 4:00 PM" },
      { day: "Friday", time: "Closed" },
      { day: "Saturday", time: "10:00 AM - 4:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  {
    name: "Sudipa Netralaya North Branch",
    address: "789 Wellness Street, Dumdum, Kolkata",
    hours: [
      { day: "Monday", time: "1:00 PM - 6:00 PM" },
      { day: "Tuesday", time: "Closed" },
      { day: "Wednesday", time: "1:00 PM - 6:00 PM" },
      { day: "Thursday", time: "Closed" },
      { day: "Friday", time: "1:00 PM - 6:00 PM" },
      { day: "Saturday", time: "Closed" },
      { day: "Sunday", time: "10:00 AM - 1:00 PM" },
    ],
  },
];

export function LocationsSection() {
  return (
    <section 
      id="locations" 
      className="relative bg-[#131519] section-padding"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Locations & Hours
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visit us at any of our convenient locations across Kolkata. Each clinic is equipped with state-of-the-art technology for comprehensive eye care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <Card 
              key={index}
              className="bg-[#1a1d23]/50 border-purple-500/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {location.name}
                      </h3>
                      <p className="text-gray-400">{location.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="font-medium text-white">
                      Operating Hours
                    </span>
                  </div>

                  <ScrollArea className="h-[200px] w-full rounded-md">
                    <Table>
                      <TableBody>
                        {location.hours.map((schedule, idx) => (
                          <TableRow 
                            key={idx} 
                            className={`border-b border-gray-800 ${
                              schedule.time === "Closed" 
                                ? "text-gray-500" 
                                : "text-gray-300"
                            }`}
                          >
                            <TableCell className="py-2 pl-0 font-medium">
                              {schedule.day}
                            </TableCell>
                            <TableCell className="py-2">
                              {schedule.time}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
