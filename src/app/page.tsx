import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import CaseStudies from '@/components/sections/case-studies';
import Insights from '@/components/sections/insights';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <CaseStudies />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
