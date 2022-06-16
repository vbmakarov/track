import axios from "axios";

export async function fetchGeoJson(coords) {
  return await axios({
    method: "post",
    url: "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    data: {
      coordinates: [...coords],
    },
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept:
        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      Authorization: "5b3ce3597851110001cf624829825f6fed014a128936c1d5822f42a9",
    },
  });
}
