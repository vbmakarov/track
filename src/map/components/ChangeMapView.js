import { useMap } from "react-leaflet/hooks";

export function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, 8);
  return null;
}
