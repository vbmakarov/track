export const addPoint = (setPoints, warning, setWarning) => {
  setPoints((prevPoints) => {
    console.log(prevPoints);
    let newPoint = prevPoints.length + 1;
    if (newPoint > 5) {
      setWarning(!warning);
      return prevPoints;
    } else {
      return [...prevPoints, ""];
    }
  });
};

export function getArrayCoords(points) {
  const arr = [];
  points.forEach((point, index) => {
    if (point["lon"] && point["lat"]) {
      const lon = +point["lon"];
      const lat = +point["lat"];
      const coords = [lon, lat];
      arr.push(coords);
    }
  });
  return arr;
}
