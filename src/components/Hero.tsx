import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cars.jpg";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury cars on desert highway in Qatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Qatar's Premier
            <span className="block text-primary">Car Market Intelligence</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-foreground/80 max-w-2xl">
            Get accurate price estimates powered by machine learning analysis of 22,000+ real market transactions
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("estimate")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              Get Price Estimate
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("trends")}
              className="border-border bg-card/50 backdrop-blur-sm hover:bg-card"
            >
              View Market Trends
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
