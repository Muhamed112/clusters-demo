import type Supercluster from "supercluster";
import { OverlayView } from "../overlay-view";

type Props = {
  position: google.maps.LatLngLiteral;
  map: google.maps.Map;
  color: string;
  clusterData: Supercluster.ClusterProperties;
  onClick: () => void;
};

export function SingleCluster({
  color,
  position,
  map,
  clusterData,
  onClick,
}: Props) {
  return (
    <OverlayView position={position} map={map}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <rect width="40" height="40" rx="20" fill={color || "none"} />
        <text
          x="50%"
          y="50%"
          fontSize="14px"
          fontWeight={500}
          textAnchor="middle"
          fill={"#fff"}
          dy=".3em"
        >
          {clusterData.point_count}
        </text>
      </svg>
    </OverlayView>
  );
}
