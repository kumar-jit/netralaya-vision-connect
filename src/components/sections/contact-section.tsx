
import { useState } from "react";
import { Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    
    // Reset form and show success message
    setIsSubmitted(true);
    
    // This would be where we'd connect to Firebase in a real implementation
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">Contact Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need to reach us? We're here to help. Contact us through any of the methods below
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-eyepurple/10 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-eyepurple" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+91 8765432100</p>
                  <p className="text-muted-foreground">+91 8765432101</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-eyepurple/10 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-eyepurple" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">contact@sudipanetralaya.com</p>
                  <p className="text-muted-foreground">appointments@sudipanetralaya.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-eyepurple/10 p-3 rounded-full">
                  <MessageSquare className="h-5 w-5 text-eyepurple" />
                </div>
                <div>
                  <h4 className="font-medium">WhatsApp</h4>
                  <p className="text-muted-foreground">+91 8765432100</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            {isSubmitted ? (
              <Card className="border-eyepurple">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <CheckCircle className="h-12 w-12 text-eyepurple mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent Successfully</h3>
                  <p className="text-center text-muted-foreground">
                    Thank you for contacting Sudipa Netralaya. We'll get back to you as soon as possible.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Your Name</Label>
                  <Input 
                    id="contact-name" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder="Your message or inquiry" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-32"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-eyepurple hover:bg-eyepurple-dark"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
