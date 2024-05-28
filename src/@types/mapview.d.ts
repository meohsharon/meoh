type MapPin = {
  id: ID;
  id_in_dataset: ID;
  dataset: string; // origin dataset id
  info: string;
  label: string;
  lat: number;
  lon: number;
  marker_size?: number;
  marker_color?: string;
  tool_tip?: string;
}