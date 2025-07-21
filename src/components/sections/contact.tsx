import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./contact-form";
import { AirwallexPaymentForm } from "./airwallex-payment";

const Contact = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h3 className="font-headline text-2xl font-semibold mb-6">Send us a Message</h3>
            <ContactForm />
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h3 className="font-headline text-2xl font-semibold mb-6">Airwallex Payment</h3>
            <AirwallexPaymentForm />
          </div>
          <div className="space-y-8">
            <h3 className="font-headline text-2xl font-semibold">Contact Information</h3>
            <p className="text-foreground/80">
              Our team is available to answer your questions and help you with your IT needs. Reach out to us through any of the channels below.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 flex-shrink-0 bg-accent text-accent-foreground rounded-full p-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Our Office</h4>
                  <p className="text-foreground/80">123 Tech Avenue, Silicon Valley, CA 94000</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 flex-shrink-0 bg-accent text-accent-foreground rounded-full p-3">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p className="text-foreground/80">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 flex-shrink-0 bg-accent text-accent-foreground rounded-full p-3">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p className="text-foreground/80">contact@juglantelecominc.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
