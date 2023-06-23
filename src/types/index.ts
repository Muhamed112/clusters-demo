import type Supercluster from "supercluster";

type Coordinates = {
 
};

export type Marker = {
  markerId: number;
  lat: number;
  lng: number;
};

export type ClusterType = Supercluster.ClusterFeature<Supercluster.AnyProps> & {
  properties:
    | {
        clusterColor: string;
      }
    | {
        clusterColor: string;
        cluster: true;
        cluster_id: number;
        point_count: number;
        point_count_abbreviated: string | number;
      };
};
