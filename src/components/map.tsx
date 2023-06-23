import { useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { mapConfig } from "../constans";
import { useFitBoundsToAreas } from "../hooks";
import { MapContents } from "./map-contents";
import { Marker } from "../types";

type MapProps = {
  markers: Marker[];
};

const config = { ...mapConfig };

export function Map({ markers }: MapProps) {
  const mapRef = useRef<google.maps.Map>();
  const [bounds, setBounds] = useState<number[]>([]);
  const [zoomLevel, setZoomLevel] = useState<number | undefined>(
    mapRef.current?.getZoom()
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKGchZJxp86C6dz2tM0qcg9MwK5GJoeYs",
    libraries: ["places", "geometry"],
  });

  const fitToAreas = useFitBoundsToAreas(markers);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      options={config}
      onLoad={(map) => {
        fitToAreas(map);
        mapRef.current = map;
      }}
      onBoundsChanged={() => {
        const bounds = mapRef.current?.getBounds();
        const cords = bounds?.toJSON();
        if (cords) {
          const { west, south, east, north } = cords;
          setBounds([west, south, east, north]);
        }
      }}
      onZoomChanged={() => {
        setZoomLevel(mapRef.current?.getZoom());
      }}
    >
      <MapContents markers={markers} bounds={bounds} zoomLevel={zoomLevel} />
    </GoogleMap>
  ) : null;
}
