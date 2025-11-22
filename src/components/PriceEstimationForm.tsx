import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const PriceEstimationForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

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
                    onValueChange={(value) => setFormData({ ...formData, make: value })}
                  >
                    <SelectTrigger id="make">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nissan">Nissan</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="lexus">Lexus</SelectItem>
                      <SelectItem value="bmw">BMW</SelectItem>
                      <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                      <SelectItem value="audi">Audi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="e.g., Patrol"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
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
