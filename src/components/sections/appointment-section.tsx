
import { useState } from "react";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const locations = [
  "Sudipa Netralaya Main Clinic",
  "Sudipa Netralaya South Branch",
  "Sudipa Netralaya North Branch",
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export function AppointmentSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, date, location, timeSlot, notes });
    
    // Reset form and show success message
    setIsSubmitted(true);
    
    // This would be where we'd connect to Firebase in a real implementation
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setDate(undefined);
      setLocation("");
      setTimeSlot("");
      setNotes("");
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="appointment" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">Book an Appointment</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schedule your eye examination with Dr. Puspendu Maity. We'll get back to you promptly to confirm your appointment
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <Card className="border-eyepurple">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <CheckCircle className="h-16 w-16 text-eyepurple mb-4" />
                <h3 className="text-2xl font-bold mb-2">Appointment Request Received</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Thank you for scheduling with Sudipa Netralaya. We'll contact you shortly to confirm your appointment.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                >
                  Book Another Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span className="text-muted-foreground">Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Select value={location} onValueChange={setLocation} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific concerns or requirements" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-24"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-eyepurple hover:bg-eyepurple-dark"
                size="lg"
              >
                Request Appointment
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
