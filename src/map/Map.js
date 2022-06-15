import { MapContainer } from "react-leaflet";
import { Layer } from "./Layer";
import "./style.scss";

export default function Map() {
  return (
    <MapContainer
      className="map"
      center={[55.702828, 37.530865]}
      zoom={18}
      scrollWheelZoom={true}
    >
      <Layer />
    </MapContainer>
  );
}
