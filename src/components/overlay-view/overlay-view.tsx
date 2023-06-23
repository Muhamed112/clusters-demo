import { type PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { createOverlay } from './overlay';

type OverlayProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  pane?: keyof google.maps.MapPanes;
  map: google.maps.Map;
  zIndex?: number;
  onMouseEnter?: (style: CSSStyleDeclaration) => void;
  onMouseLeave?: (style: CSSStyleDeclaration) => void;
}>;

export function OverlayView({
  position,
  pane = 'floatPane',
  map,
  zIndex = 0,
  children,
  onMouseEnter,
  onMouseLeave,
}: OverlayProps) {
  const container = useMemo(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.cursor = 'pointer';

    if (onMouseEnter) {
      div.addEventListener('mouseenter', () => {
        onMouseEnter(div.style);
      });
    }

    if (onMouseLeave) {
      div.addEventListener('mouseleave', () => {
        onMouseLeave(div.style);
      });
    }

    return div;
  }, []);

  const overlay = useMemo(() => {
    return createOverlay(container, pane, position);
  }, [container, pane, position]);

  useEffect(() => {
    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, overlay]);

  useEffect(() => {
    container.style.zIndex = `${zIndex}`;
  }, [zIndex, container]);

  return createPortal(children, container);
}
