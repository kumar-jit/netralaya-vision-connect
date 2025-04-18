
import { Link } from "react-router-dom";
import { Eye, Facebook, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-6 w-6 text-eyepurple" />
              <span className="font-bold text-xl">Sudipa Netralaya</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your vision is our mission. Comprehensive eye care services with a gentle touch.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-eyepurple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-eyepurple transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:contact@sudipanetralaya.com" className="text-muted-foreground hover:text-eyepurple transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+918765432100" className="text-muted-foreground hover:text-eyepurple transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-muted-foreground hover:text-eyepurple transition-colors">Our Services</a></li>
              <li><a href="#doctor" className="text-muted-foreground hover:text-eyepurple transition-colors">Meet the Doctor</a></li>
              <li><a href="#locations" className="text-muted-foreground hover:text-eyepurple transition-colors">Locations & Hours</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-eyepurple transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-eyepurple transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-eyepurple" />
                +91 8765432100
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-eyepurple" />
                contact@sudipanetralaya.com
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Sudipa Netralaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
