import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartBig, Briefcase, CloudCog, Network, ServerCog, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: ServerCog,
    title: "IT Consulting",
    description: "Tailored strategies and expert advice to align your technology with your business goals for sustainable growth."
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Solutions",
    description: "Protect your digital assets with our comprehensive security services, from threat assessment to incident response."
  },
  {
    icon: CloudCog,
    title: "Cloud Services",
    description: "Leverage the power of the cloud with our migration, optimization, and management services for AWS, Azure, and GCP."
  },
  {
    icon: Network,
    title: "System Integration",
    description: "Seamlessly connect your disparate systems and applications to improve efficiency and data flow across your organization."
  },
  {
    icon: Briefcase,
    title: "Managed IT Services",
    description: "Proactive monitoring, maintenance, and support for your IT infrastructure, so you can focus on your core business."
  },
  {
    icon: BarChartBig,
    title: "Data Analytics",
    description: "Turn your data into actionable insights with our business intelligence and data analytics solutions."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Comprehensive IT Consulting & Services</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
            We provide a complete suite of IT services to help your business thrive in the digital age. From strategy to implementation, we are your trusted partner.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto bg-accent/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
