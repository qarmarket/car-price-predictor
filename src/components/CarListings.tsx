import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Fuel, Gauge, MapPin, Calendar } from "lucide-react";

interface CarListing {
  source: string;
  listing_title: string;
  price: number;
  year: number;
  mileage_km: number;
  description: string;
  brand: string;
  model: string;
  fuel_type: string;
  transmission: string;
  city: string;
  url: string;
}

// Brand and model data
const carDatabase: Record<string, string[]> = {
  "Toyota": ["Land Cruiser", "Prado", "Camry", "Corolla", "Hilux", "RAV4", "Yaris", "Fortuner"],
  "Nissan": ["Patrol", "Pathfinder", "Altima", "Maxima", "X-Trail", "Kicks", "Sunny"],
  "Lexus": ["LX", "GX", "RX", "ES", "LS", "NX", "UX"],
  "BMW": ["X5", "X6", "X7", "3 Series", "5 Series", "7 Series", "X3", "X1"],
  "Mercedes-Benz": ["G-Class", "GLE", "GLC", "E-Class", "S-Class", "C-Class", "A-Class"],
  "Audi": ["Q7", "Q8", "Q5", "A6", "A4", "A3", "Q3"],
  "Honda": ["Accord", "Civic", "CR-V", "Pilot", "City"],
  "Hyundai": ["Tucson", "Santa Fe", "Elantra", "Sonata", "Creta"],
  "Kia": ["Sportage", "Sorento", "Seltos", "Cerato", "Carnival"],
  "Ford": ["Explorer", "Expedition", "F-150", "Edge", "Mustang"],
  "Chevrolet": ["Tahoe", "Suburban", "Traverse", "Silverado"],
  "GMC": ["Yukon", "Sierra", "Terrain", "Acadia"],
  "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Compass"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Discovery", "Defender"],
  "Porsche": ["Cayenne", "Macan", "Panamera", "911"],
  "Mitsubishi": ["Pajero", "Outlander", "Lancer", "Attrage"],
  "Mazda": ["CX-5", "CX-9", "CX-3", "3", "6"],
  "Volkswagen": ["Tiguan", "Touareg", "Passat", "Golf"],
  "Jetour": ["T2", "X70", "X90", "Dashing"]
};

// Sample data
const sampleListings: CarListing[] = [
  {
    source: "mzad",
    listing_title: "jetour t2",
    price: 126000,
    year: 2025,
    mileage_km: 0,
    description: "130000QR 0Km",
    brand: "Jetour",
    model: "T2",
    fuel_type: "Gasoline",
    transmission: "Automatic",
    city: "Doha",
    url: "https://mzadqatar.com/en/products/jetour-t2-93770596"
  },
  {
    source: "mzad",
    listing_title: "Land Cruiser 2019 GXR",
    price: 115000,
    year: 2019,
    mileage_km: 460000,
    description: "The car is in perfect condition 460000 km. Only the front bumper and the back bumper are replaced. Price negotiable.",
    brand: "Toyota",
    model: "Land Cruiser",
    fuel_type: "Gasoline",
    transmission: "Automatic",
    city: "Al Shamal",
    url: "https://mzadqatar.com/en/products/land-cruiser-2019-gxr-93782530"
  }
];

export const CarListings = () => {
  const [searchData, setSearchData] = useState({
    brand: "",
    model: "",
    yearFrom: "",
    yearTo: "",
  });
  const [listings, setListings] = useState<CarListing[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const handleBrandChange = (brand: string) => {
    setSearchData({ ...searchData, brand, model: "" });
    setAvailableModels(carDatabase[brand] || []);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder: Filter sample data based on search criteria
    const filtered = sampleListings.filter(listing => {
      const brandMatch = !searchData.brand || listing.brand.toLowerCase().includes(searchData.brand.toLowerCase());
      const modelMatch = !searchData.model || listing.model.toLowerCase().includes(searchData.model.toLowerCase());
      const yearMatch = (!searchData.yearFrom || listing.year >= parseInt(searchData.yearFrom)) &&
                       (!searchData.yearTo || listing.year <= parseInt(searchData.yearTo));
      return brandMatch && modelMatch && yearMatch;
    });
    
    setListings(filtered);
  };

  return (
    <section id="listings" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Find Your Perfect Car</h2>
          <p className="text-lg text-muted-foreground">
            Search through thousands of listings from multiple marketplaces
          </p>
        </div>

        <Card className="shadow-xl border-border mb-12">
          <CardHeader>
            <CardTitle>Search Listings</CardTitle>
            <CardDescription>Enter your preferences to find matching cars</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search-brand">Brand</Label>
                  <Select
                    value={searchData.brand}
                    onValueChange={handleBrandChange}
                  >
                    <SelectTrigger id="search-brand">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(carDatabase).sort().map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-model">Model</Label>
                  <Select
                    value={searchData.model}
                    onValueChange={(value) => setSearchData({ ...searchData, model: value })}
                    disabled={!searchData.brand}
                  >
                    <SelectTrigger id="search-model">
                      <SelectValue placeholder={searchData.brand ? "Select model" : "Select brand first"} />
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
                  <Label htmlFor="year-from">Year From</Label>
                  <Select
                    value={searchData.yearFrom}
                    onValueChange={(value) => setSearchData({ ...searchData, yearFrom: value })}
                  >
                    <SelectTrigger id="year-from">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => 2025 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year-to">Year To</Label>
                  <Select
                    value={searchData.yearTo}
                    onValueChange={(value) => setSearchData({ ...searchData, yearTo: value })}
                  >
                    <SelectTrigger id="year-to">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 25 }, (_, i) => 2025 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Search Listings
              </Button>
            </form>
          </CardContent>
        </Card>

        {listings.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              {listings.length} {listings.length === 1 ? 'Listing' : 'Listings'} Found
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((listing, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {listing.brand} {listing.model}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {listing.listing_title}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          QAR {listing.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {listing.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{listing.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-muted-foreground" />
                        <span>{listing.mileage_km.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-muted-foreground" />
                        <span>{listing.fuel_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{listing.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground uppercase">
                        {listing.source}
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <a href={listing.url} target="_blank" rel="noopener noreferrer">
                          View Listing
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
