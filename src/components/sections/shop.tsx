"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { PaymentForm } from "./payment-form";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
  features: string[];
}

const products: Product[] = [
  {
    id: "crm-integration",
    name: "CRM Integration Services",
    price: 350,
    description: "Seamlessly integrate your Customer Relationship Management system with existing business tools and workflows for enhanced productivity.",
    category: "Integration",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    features: ["Salesforce Integration", "HubSpot Setup", "Custom CRM Development", "Data Migration", "24/7 Support"]
  },
  {
    id: "custom-api",
    name: "Custom API Integrations",
    price: 250,
    description: "Connect disparate systems with custom-built API solutions tailored to your specific business requirements and technical stack.",
    category: "Development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    features: ["REST API Development", "GraphQL Implementation", "Webhook Integration", "API Documentation", "Testing & Monitoring"]
  },
  {
    id: "icloud-solution",
    name: "ICloud Solution",
    price: 100,
    description: "Comprehensive cloud storage and synchronization solutions for businesses looking to modernize their data management.",
    category: "Cloud Services",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    features: ["Cloud Migration", "Data Synchronization", "Access Control", "Backup Solutions", "Mobile Integration"]
  },
  {
    id: "strategic-it",
    name: "Strategic IT Planning",
    price: 150,
    description: "Develop comprehensive IT strategies aligned with your business goals to drive growth and operational efficiency.",
    category: "Consulting",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    features: ["Technology Roadmap", "Budget Planning", "Risk Assessment", "Vendor Selection", "Implementation Strategy"]
  },
  {
    id: "managed-it",
    name: "Managed IT Services",
    price: 200,
    description: "Complete IT infrastructure management and support services to keep your business running smoothly 24/7.",
    category: "Support",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    features: ["24/7 Monitoring", "Help Desk Support", "System Maintenance", "Software Updates", "Performance Optimization"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Solutions",
    price: 250,
    description: "Protect your business with comprehensive cybersecurity measures including threat detection, prevention, and response.",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=300&fit=crop",
    badge: "Best Seller",
    features: ["Threat Detection", "Firewall Configuration", "Security Audits", "Employee Training", "Incident Response"]
  },
  {
    id: "system-integration",
    name: "System Integration",
    price: 300,
    description: "Unify your business systems and applications to create a cohesive, efficient technology ecosystem.",
    category: "Integration",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop",
    features: ["ERP Integration", "Database Connectivity", "Process Automation", "Data Consistency", "Performance Tuning"]
  },
  {
    id: "network-solutions",
    name: "Network Solutions",
    price: 175,
    description: "Design, implement, and maintain robust network infrastructure to support your business operations and growth.",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
    badge: "New",
    features: ["Network Design", "WiFi Setup", "VPN Configuration", "Network Security", "Performance Monitoring"]
  },
  {
    id: "support-consulting",
    name: "Support Consulting",
    price: 225,
    description: "Expert technical consulting services to optimize your IT operations and solve complex technology challenges.",
    category: "Consulting",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    features: ["Technical Assessment", "Solution Architecture", "Best Practices", "Training & Documentation", "Ongoing Support"]
  }
];

export function ShopSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedProduct(null);
  };

  if (showPayment && selectedProduct) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <Button 
                onClick={handleClosePayment}
                variant="outline"
                className="mb-4"
              >
                ← Back to Shop
              </Button>
              <h2 className="text-3xl font-bold mb-4">Complete Your Purchase</h2>
              <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                    <p className="text-muted-foreground">{selectedProduct.category}</p>
                    <p className="text-2xl font-bold text-primary">${selectedProduct.price}</p>
                  </div>
                </div>
              </div>
            </div>
            <PaymentForm 
              prefilledAmount={selectedProduct.price.toString()}
              prefilledService={selectedProduct.id}
              productName={selectedProduct.name}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Products & Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional IT solutions designed to accelerate your business growth and streamline operations. 
            Choose from our comprehensive range of services tailored to meet your specific needs.
          </p>
          <div className="flex items-center justify-center mt-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {products.length} Products Available
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge 
                    className="absolute top-4 left-4 bg-primary text-primary-foreground"
                  >
                    {product.badge}
                  </Badge>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                      {product.features.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{product.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now - ${product.price}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              Don't see exactly what you're looking for? We specialize in creating custom IT solutions 
              tailored to your unique business requirements.
            </p>
            <Button 
              onClick={() => handleBuyNow({
                id: "custom",
                name: "Custom IT Solution",
                price: 0,
                description: "Custom tailored solution for your specific needs",
                category: "Custom",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                features: ["Consultation", "Custom Development", "Implementation", "Support"]
              })}
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
