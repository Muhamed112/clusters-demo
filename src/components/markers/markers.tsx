import { useGoogleMap } from "@react-google-maps/api";
import { type Marker } from "../../types";
import { SingleMarker } from "./single-marker";

type MarkersProps = {
  markers: Marker[];
};

const Markers = ({ markers }: MarkersProps) => {
  const map = useGoogleMap();

  return (
    <>
      {markers.map(({ lat, lng, markerId }) => (
        <SingleMarker
          key={markerId}
          position={{ lat, lng }}
          map={map}
          onClick={() => {}}
        />
      ))}
    </>
  );
};

export { Markers };
