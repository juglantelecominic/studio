import Image from 'next/image';

const StatsRing = ({ percentage, label }: { percentage: number; label: string }) => {
  const strokeWidth = 14;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-48 w-48 flex-shrink-0">
        <svg className="h-full w-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{percentage}%</span>
        </div>
      </div>
      <p className="text-lg text-foreground/80 max-w-xs">{label}</p>
    </div>
  );
};


const HybridChallenges = () => {
  return (
    <section id="hybrid-challenges" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              Challenges of the hybrid environment
            </h2>
            <p className="text-lg text-foreground/80">
              Many IT leaders are scrambling to support the evolving needs of hybrid workers, which takes them away from working on digital transformation efforts to streamline processes and improve efficiency.
            </p>
            <p className="text-lg text-foreground/80">
              To help regain focus on strategic imperatives, many IT leaders are leveraging trusted suppliers to manage functional/operational workloads and free up their valuable IT resources.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="IT leaders collaborating"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint="collaboration meeting"
            />
          </div>
        </div>
        <div className="mt-20 grid md:grid-cols-2 gap-12 justify-center">
          <StatsRing 
            percentage={81}
            label="of IT leaders are overwhelmed by the functional aspects of their job."
          />
           <StatsRing 
            percentage={76}
            label="of IT leaders struggle to balance business innovation and operational excellence."
          />
        </div>
      </div>
    </section>
  );
};

export default HybridChallenges;
