import { Hero } from "@/components/Hero";
import { PriceEstimationForm } from "@/components/PriceEstimationForm";
import { CarListings } from "@/components/CarListings";
import { TrendChart } from "@/components/TrendChart";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PriceEstimationForm />
      <CarListings />
      <TrendChart />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Qatar Car Market Intelligence - Powered by Machine Learning
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Based on 22,000+ real market transactions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
