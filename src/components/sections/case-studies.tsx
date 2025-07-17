import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Juglan TelecomInc transformed our IT infrastructure, leading to a 40% increase in efficiency. Their team is top-notch and their strategic insights are invaluable.",
    name: "Sarah Johnson",
    title: "CEO, TechCorp",
    avatar: "https://placehold.co/40x40.png",
    initials: "SJ",
  },
  {
    quote: "The cybersecurity solutions provided were robust and seamlessly integrated. We feel much more secure thanks to their expertise. Highly recommended for any business.",
    name: "Michael Chen",
    title: "IT Director, Innovate Ltd.",
    avatar: "https://placehold.co/40x40.png",
    initials: "MC",
  },
  {
    quote: "Migrating to the cloud was a breeze with Juglan's support. Their team handled everything professionally, minimizing downtime and maximizing performance.",
    name: "Emily Rodriguez",
    title: "Operations Manager, Global Logistics",
    avatar: "https://placehold.co/40x40.png",
    initials: "ER",
  },
   {
    quote: "Their managed IT services have been a game-changer for us. Proactive support and rapid response times have allowed us to focus on our core business.",
    name: "David Lee",
    title: "Founder, Creative Solutions",
    avatar: "https://placehold.co/40x40.png",
    initials: "DL",
  },
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Proven Success, Trusted by Leaders</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Don't just take our word for it. See how we've helped businesses like yours to innovate and grow.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                       <div className="flex text-yellow-400 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-foreground/90 italic mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person" />
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default CaseStudies;
