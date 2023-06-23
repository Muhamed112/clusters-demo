import { Marker } from "../types";

export function useFitBoundsToAreas(markers: Marker[]) {
  return (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    console.log(map);

    for (const { lat, lng } of markers) {
      bounds.extend({ lat, lng });
    }

    map.fitBounds(bounds);
  };
}
