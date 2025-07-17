import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const blogPosts = [
  {
    title: "The Future of AI in Business IT",
    category: "AI & ML",
    image: "https://placehold.co/600x400.png",
    aiHint: "artificial intelligence",
    excerpt: "Discover how artificial intelligence is reshaping business IT, from automating operations to providing predictive insights.",
  },
  {
    title: "Top 5 Cybersecurity Threats to Watch in 2024",
    category: "Cybersecurity",
    image: "https://placehold.co/600x400.png",
    aiHint: "cyber security",
    excerpt: "Stay ahead of malicious actors. Our experts break down the most significant cybersecurity threats for businesses this year.",
  },
  {
    title: "Optimizing Your Business with Multi-Cloud Strategy",
    category: "Cloud Solutions",
    image: "https://placehold.co/600x400.png",
    aiHint: "cloud computing",
    excerpt: "Leveraging multiple cloud providers can be complex. Learn the strategies to optimize cost, performance, and security.",
  },
];

const Insights = () => {
  return (
    <section id="insights" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Insights Hub</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Expert insights, industry trends, and company updates to keep you ahead of the curve.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.aiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2 bg-accent/10 text-accent">{post.category}</Badge>
                <CardTitle className="font-headline text-xl leading-snug">{post.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 text-accent">
                  <a href="#">
                    Read More <MoveRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
