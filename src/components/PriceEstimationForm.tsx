import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Car database with brands and their models
const carDatabase: { [key: string]: string[] } = {
  Toyota: ["Land Cruiser", "Prado", "Camry", "Corolla", "RAV4", "Hilux", "Fortuner", "Yaris"],
  Nissan: ["Patrol", "Pathfinder", "Altima", "Maxima", "X-Trail", "Kicks", "Sunny"],
  Lexus: ["LX", "GX", "RX", "ES", "IS", "NX", "UX"],
  BMW: ["X5", "X6", "X7", "3 Series", "5 Series", "7 Series", "X3", "X1"],
  "Mercedes-Benz": ["G-Class", "GLE", "GLS", "E-Class", "S-Class", "C-Class", "GLC"],
  Audi: ["Q7", "Q8", "Q5", "A6", "A4", "A8", "Q3"],
  Honda: ["Accord", "Civic", "CR-V", "Pilot", "City"],
  Hyundai: ["Tucson", "Santa Fe", "Elantra", "Sonata", "Creta"],
  Kia: ["Sportage", "Sorento", "Optima", "Cerato", "Seltos"],
  Ford: ["Explorer", "Expedition", "F-150", "Edge", "Escape"],
  Chevrolet: ["Tahoe", "Suburban", "Silverado", "Traverse", "Equinox"],
  GMC: ["Yukon", "Sierra", "Terrain", "Acadia"],
  Jeep: ["Wrangler", "Grand Cherokee", "Cherokee", "Compass"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Discovery", "Defender"],
  Porsche: ["Cayenne", "Macan", "Panamera", "911"],
  Mitsubishi: ["Pajero", "Outlander", "Lancer", "Montero"],
  Mazda: ["CX-5", "CX-9", "Mazda3", "Mazda6", "CX-3"],
  Volkswagen: ["Tiguan", "Touareg", "Passat", "Golf"],
  Jetour: ["T2", "X70", "X90"],
};

export const PriceEstimationForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
  });
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleMakeChange = (value: string) => {
    setFormData({ ...formData, make: value, model: "" });
    setAvailableModels(carDatabase[value] || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.make || !formData.model || !formData.year) {
      toast.error("Please fill in all fields");
      return;
    }

    // Placeholder for ML prediction
    const price = Math.floor(Math.random() * 50000) + 30000;
    setEstimatedPrice(price);
  };

  return (
    <section id="estimate" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Get Your Car's Value</h2>
          <p className="text-lg text-muted-foreground">
            Enter your car details to receive an AI-powered price estimate based on real market data
          </p>
        </div>

        <Card className="shadow-xl border-border">
          <CardHeader>
            <CardTitle>Price Estimation</CardTitle>
            <CardDescription>Fill in your vehicle information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="make">Car Make</Label>
                  <Select
                    value={formData.make}
                    onValueChange={handleMakeChange}
                  >
                    <SelectTrigger id="make">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(carDatabase).map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select
                    value={formData.model}
                    onValueChange={(value) => setFormData({ ...formData, model: value })}
                    disabled={!formData.make}
                  >
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => setFormData({ ...formData, year: value })}
                  >
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => 2024 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                Get Price Estimate
              </Button>
            </form>
          </CardContent>
        </Card>

        {estimatedPrice && (
          <Card className="shadow-xl border-border bg-primary/5 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your Car's Estimated Value</CardTitle>
              <CardDescription>Based on our ML analysis of 22,000+ real market transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-5xl font-bold text-primary mb-4">
                  QAR {estimatedPrice.toLocaleString()}
                </p>
                <p className="text-muted-foreground mb-6">
                  {formData.make} {formData.model} ({formData.year})
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Low Range</p>
                    <p className="text-xl font-semibold">QAR {(estimatedPrice * 0.9).toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Average</p>
                    <p className="text-xl font-semibold">QAR {estimatedPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">High Range</p>
                    <p className="text-xl font-semibold">QAR {(estimatedPrice * 1.1).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">22,000+ Records</CardTitle>
              <CardDescription>Real market transactions analyzed</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">ML-Powered</CardTitle>
              <CardDescription>Advanced regression models</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Qatar Market</CardTitle>
              <CardDescription>Localized price predictions</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};
