import { ShopSection } from "../../components/sections/shop";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ShopSection />
      </main>
      <Footer />
    </>
  );
}
