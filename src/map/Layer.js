import { TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { ChangeMapView } from "./components/ChangeMapView";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

export function Layer() {
  let activeOrder = useSelector(
    (state) => state.rootReducer.orderReducer.active
  );
  let orders = useSelector((state) => state.rootReducer.orderReducer.orders);

  let centerPoint = [];
  if (activeOrder && orders[activeOrder]) {
    let startPosition = [...orders[activeOrder].points];
    centerPoint = [+startPosition[0].lat, +startPosition[0].lon];
  } else {
    centerPoint = [55.702828, 37.530865];
  }

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {activeOrder && orders[activeOrder] && (
        <GeoJSON
          attribution="&copy; credits due..."
          key={uuidv4()}
          data={orders[activeOrder].track}
        />
      )}
      {activeOrder &&
        orders[activeOrder] &&
        orders[activeOrder].points.map((point, index) => {
          return (
            <Marker position={[point.lat, point.lon]} key={index}>
              <Popup>{point.display_name}</Popup>
            </Marker>
          );
        })}
      <ChangeMapView coords={centerPoint} />
    </>
  );
}
