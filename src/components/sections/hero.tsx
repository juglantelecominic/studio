import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-800 to-accent opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
      
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center py-20">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
          Elevate Your Digital Landscape
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-primary-foreground/90">
          Welcome to Juglan TelecomInc, where cutting-edge solutions meet unparalleled expertise in IT Consulting & Services. We specialize in delivering tailored strategies, innovative technologies, and reliable support to optimize your business operations.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-white hover:text-accent text-accent-foreground transition-all duration-300 transform hover:scale-105">
            <a href="#services">Explore Services</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <a href="#contact">Request a Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
