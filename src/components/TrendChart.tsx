import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, X } from "lucide-react";

interface CarSelection {
  id: string;
  make: string;
  model: string;
  startYear: string;
  endYear: string;
}

// Sample data generator
const generateSampleData = (make: string, model: string, startYear: number, endYear: number) => {
  const data = [];
  const basePrice = Math.floor(Math.random() * 30000) + 40000;
  
  for (let year = startYear; year <= endYear; year++) {
    const variation = Math.floor(Math.random() * 10000) - 5000;
    data.push({
      year: year.toString(),
      [make]: basePrice + variation + (year - startYear) * 2000,
    });
  }
  
  return data;
};

export const TrendChart = () => {
  const [cars, setCars] = useState<CarSelection[]>([]);
  const [currentCar, setCurrentCar] = useState<Partial<CarSelection>>({
    make: "",
    model: "",
    startYear: "2013",
    endYear: "2024",
  });

  const addCar = () => {
    if (!currentCar.make || !currentCar.model) {
      return;
    }

    const newCar: CarSelection = {
      id: Date.now().toString(),
      make: currentCar.make,
      model: currentCar.model,
      startYear: currentCar.startYear || "2013",
      endYear: currentCar.endYear || "2024",
    };

    setCars([...cars, newCar]);
    setCurrentCar({
      make: "",
      model: "",
      startYear: "2013",
      endYear: "2024",
    });
  };

  const removeCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  // Generate combined chart data
  const chartData = (() => {
    if (cars.length === 0) return [];

    const startYear = Math.min(...cars.map((car) => parseInt(car.startYear)));
    const endYear = Math.max(...cars.map((car) => parseInt(car.endYear)));

    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    return years.map((year) => {
      const dataPoint: any = { year: year.toString() };
      
      cars.forEach((car) => {
        const carStartYear = parseInt(car.startYear);
        const carEndYear = parseInt(car.endYear);
        
        if (year >= carStartYear && year <= carEndYear) {
          const basePrice = Math.floor(Math.random() * 30000) + 40000;
          const variation = Math.floor(Math.random() * 10000) - 5000;
          dataPoint[`${car.make} ${car.model}`] = basePrice + variation + (year - carStartYear) * 2000;
        }
      });
      
      return dataPoint;
    });
  })();

  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <section id="trends" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Market Trend Analysis</h2>
          <p className="text-lg text-muted-foreground">
            Compare price trends across different makes and models over time
          </p>
        </div>

        <Card className="shadow-xl border-border mb-8">
          <CardHeader>
            <CardTitle>Add Cars to Compare</CardTitle>
            <CardDescription>Select multiple cars to view their price trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trend-make">Make</Label>
                <Select
                  value={currentCar.make}
                  onValueChange={(value) => setCurrentCar({ ...currentCar, make: value })}
                >
                  <SelectTrigger id="trend-make">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nissan">Nissan</SelectItem>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Lexus">Lexus</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Mercedes">Mercedes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trend-model">Model</Label>
                <Input
                  id="trend-model"
                  placeholder="e.g., Patrol"
                  value={currentCar.model}
                  onChange={(e) => setCurrentCar({ ...currentCar, model: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-year">Start Year</Label>
                <Select
                  value={currentCar.startYear}
                  onValueChange={(value) => setCurrentCar({ ...currentCar, startYear: value })}
                >
                  <SelectTrigger id="start-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => 2013 + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-year">End Year</Label>
                <Select
                  value={currentCar.endYear}
                  onValueChange={(value) => setCurrentCar({ ...currentCar, endYear: value })}
                >
                  <SelectTrigger id="end-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => 2013 + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={addCar}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!currentCar.make || !currentCar.model}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Car
                </Button>
              </div>
            </div>

            {cars.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Cars</Label>
                <div className="flex flex-wrap gap-2">
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-2 rounded-md"
                    >
                      <span className="text-sm">
                        {car.make} {car.model} ({car.startYear}-{car.endYear})
                      </span>
                      <button
                        onClick={() => removeCar(car.id)}
                        className="hover:bg-secondary-foreground/20 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {cars.length > 0 && chartData.length > 0 && (
          <Card className="shadow-xl border-border">
            <CardHeader>
              <CardTitle>Price Trends Over Time</CardTitle>
              <CardDescription>Historical price data in QAR</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="year"
                    stroke="hsl(var(--foreground))"
                  />
                  <YAxis
                    stroke="hsl(var(--foreground))"
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    formatter={(value: number) => [`QAR ${value.toLocaleString()}`, ""]}
                  />
                  <Legend />
                  {cars.map((car, index) => (
                    <Line
                      key={car.id}
                      type="monotone"
                      dataKey={`${car.make} ${car.model}`}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {cars.length === 0 && (
          <Card className="shadow-xl border-border border-dashed">
            <CardContent className="flex items-center justify-center py-16">
              <p className="text-muted-foreground text-lg">
                Add cars above to view price trend comparisons
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
