import { useMemo } from "react";
import type Supercluster from "supercluster";
import { Marker } from "../types";

type Props = {
  zoomLevel?: number;
  bounds: number[];
  markers: Marker[];
  supercluster: Supercluster;
  map: google.maps.Map | null;
};

export const DEFAULT_COLOR = "transparent";

export function useClusterMarkers({
  map,
  markers,
  supercluster,
  bounds,
  zoomLevel,
}: Props) {
  const [clusters, nonClusteredMarkers] = useMemo(() => {
    if (!map || markers.length === 0) {
      return [[], []];
    }

    supercluster.load(
      markers.map(({ lat, lng, markerId }) => {
        return {
          type: "Feature",
          properties: {
            markerId: markerId,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      })
    );

    const rawClusters = supercluster.getClusters(
      bounds as GeoJSON.BBox,
      Math.floor(zoomLevel || 0)
    );
  
    const clusters = rawClusters
      .filter((rawCluster) => rawCluster.properties.cluster)
      .map((cluster) => {
        const clusterColor = "#F63F18";

        return {
          ...cluster,
          properties: {
            ...cluster.properties,
            clusterColor,
          },
        };
      });

    const nonClusteredMarkers = rawClusters
      .filter((rawCluster) => !rawCluster.properties.cluster)
      .map((singlePoint) => {
        return markers.find(
          ({ markerId }) => markerId === singlePoint.properties.markerId
        );
      });

    return [clusters, nonClusteredMarkers];
  }, [zoomLevel, JSON.stringify(bounds), JSON.stringify(markers)]);

  return [clusters, nonClusteredMarkers];
}
