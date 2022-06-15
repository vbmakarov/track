import { useMap } from "react-leaflet/hooks";

export function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords);
  return null;
}
