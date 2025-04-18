
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Doctor", href: "#doctor" },
  { name: "Locations", href: "#locations" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-2" : "py-4"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-eyepurple" />
          <span className="font-bold text-lg md:text-xl">Sudipa Netralaya</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-foreground/80 hover:text-eyepurple transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}
          
          <ThemeToggle />
          
          {!isMobile ? (
            <Button asChild className="bg-eyepurple hover:bg-eyepurple-dark">
              <a href="#appointment">Book Appointment</a>
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md py-4 border-t">
          <nav className="flex flex-col gap-2 px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="py-2 px-4 hover:bg-muted rounded-md transition-colors"
                onClick={closeMenu}
              >
                {item.name}
              </a>
            ))}
            <Button asChild className="mt-2 bg-eyepurple hover:bg-eyepurple-dark">
              <a href="#appointment" onClick={closeMenu}>Book Appointment</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
