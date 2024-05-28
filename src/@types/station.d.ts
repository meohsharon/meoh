type Refinery = {
  id: ID;
  refiner: string;
  location: string;
  fuel_type: string;
  fuel_type_detail: string;
  capacity: number; // barrels
  sources: Array<RefineryFuelSource>
}

type RefineryFuelSource = {
  source: string;
  volume: number; // ton or barrel, depends on type
  type: string;
  arrived_at: string;
  distance_km: number;
  transport_by: string;
  unit: string;
}