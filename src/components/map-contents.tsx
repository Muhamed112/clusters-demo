import { useGoogleMap } from "@react-google-maps/api";
import Supercluster from "supercluster";
import { useClusterMarkers } from "../hooks";
import { ClusterType, Marker } from "../types";
import { Markers } from "./markers";
import { Clusters } from "./clusters";

type MapContentsProps = {
  markers: Marker[];
  zoomLevel?: number;
  bounds: number[];
};

// Bigger value means "thicker" clusters
const CLUSTER_RADIUS = 190;

const supercluster = new Supercluster({
  radius: CLUSTER_RADIUS,
});

export function MapContents({ markers, zoomLevel, bounds }: MapContentsProps) {
  const map = useGoogleMap();

  const [clusters, nonClusteredMarkers] = useClusterMarkers({
    map,
    supercluster,
    markers,
    zoomLevel,
    bounds,
  });

  return (
    <>
      <Clusters
        clusters={clusters as ClusterType[]}
        supercluster={supercluster}
      />
      <Markers markers={nonClusteredMarkers as Marker[]} />
    </>
  );
}
