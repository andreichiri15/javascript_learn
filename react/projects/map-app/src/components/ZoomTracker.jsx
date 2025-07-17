import { useMapEvents } from 'react-leaflet';
import { useState } from 'react';

export default function ZoomTracker({ onZoomChange }) {
  useMapEvents({
    zoomend: (e) => onZoomChange(e.target.getZoom()),
  });
  return null;
}