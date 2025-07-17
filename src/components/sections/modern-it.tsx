import Image from "next/image";

const ModernIt = () => {
  return (
    <section id="modern-it" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Team discussing IT strategy"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint="team meeting"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              Managing IT in the modern age
            </h2>
            <p className="text-lg text-foreground/80">
              Comprising a wide range of service options, Lenovo Managed IT Services gives your end users a premium technology experience from start to finish, while providing your IT team with peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernIt;
