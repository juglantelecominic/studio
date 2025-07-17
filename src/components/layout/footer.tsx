import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-headline text-2xl font-bold">Juglan TelecomInc</h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Cutting-edge solutions and unparalleled expertise in IT Consulting & Services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider">Services</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#services" className="text-sm hover:text-accent transition-colors">IT Consulting</a></li>
              <li><a href="#services" className="text-sm hover:text-accent transition-colors">Cybersecurity</a></li>
              <li><a href="#services" className="text-sm hover:text-accent transition-colors">Cloud Solutions</a></li>
              <li><a href="#services" className="text-sm hover:text-accent transition-colors">Managed Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#case-studies" className="text-sm hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#insights" className="text-sm hover:text-accent transition-colors">Insights</a></li>
              <li><a href="#contact" className="text-sm hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex mt-4 space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 hover:text-accent">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Juglan TelecomInc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
