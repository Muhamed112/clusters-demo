import { useGoogleMap } from "@react-google-maps/api";
import { ClusterType } from "../../types";
import { SingleCluster } from "./single-cluster";
import type Supercluster from "supercluster";

type ClustersProps = {
  clusters: ClusterType[];
  supercluster: Supercluster<Supercluster.AnyProps, Supercluster.AnyProps>;
};

const Clusters = ({ clusters, supercluster }: ClustersProps) => {
  const map = useGoogleMap();

  return (
    <>
      {clusters.map((cluster) => {
        const typedCluster = cluster as ClusterType;

        if (!map) {
          return;
        }

        return (
          <SingleCluster
            key={typedCluster.properties.cluster_id}
            map={map}
            clusterData={typedCluster.properties}
            position={{
              lat: typedCluster.geometry.coordinates[1],
              lng: typedCluster.geometry.coordinates[0],
            }}
            color={typedCluster.properties.clusterColor}
            onClick={() => {
              map.setCenter({
                lat: typedCluster.geometry.coordinates[1],
                lng: typedCluster.geometry.coordinates[0],
              });
              map.setZoom(
                supercluster.getClusterExpansionZoom(
                  typedCluster.properties.cluster_id
                ) + 1
              );
            }}
          />
        );
      })}
    </>
  );
};

export { Clusters };
