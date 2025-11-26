import React, { useEffect, useRef } from 'react';
import { MapMode } from '../types';
import { Icons } from './Icons';

interface MapVisualProps {
  progress: number; // 0 to 100
  isDelayed?: boolean;
  mode: MapMode;
  isDarkMode: boolean;
  onBusClick?: () => void;
  searchQuery?: string;
}

// Coordinate type
type LatLng = [number, number];

export const MapVisual: React.FC<MapVisualProps> = ({ progress, isDelayed, mode, isDarkMode, onBusClick, searchQuery }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const busMarkerRef = useRef<any>(null);
  const routePolylineRef = useRef<any>(null);

  // Route: Tunis (Near Lafayette) -> Ariana -> El Ghazala (Simulated)
  const routePoints: LatLng[] = [
    [36.8150, 10.1800], // Start (Tunis)
    [36.8280, 10.1880],
    [36.8450, 10.1950],
    [36.8600, 10.1900], // Ariana
    [36.8800, 10.1850],
    [36.8936, 10.1873]  // End (El Ghazala Technopark)
  ];

  // Helper to calculate distance between two points
  const getDistance = (p1: LatLng, p2: LatLng) => {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  };

  // Helper to interpolate position based on progress
  const getPositionOnRoute = (prog: number): { pos: LatLng, bearing: number } => {
    // Calculate total length
    let totalLength = 0;
    const segments = [];
    for (let i = 0; i < routePoints.length - 1; i++) {
      const dist = getDistance(routePoints[i], routePoints[i+1]);
      segments.push({ start: routePoints[i], end: routePoints[i+1], length: dist });
      totalLength += dist;
    }

    const currentDist = (prog / 100) * totalLength;
    
    let covered = 0;
    for (const segment of segments) {
      if (currentDist <= covered + segment.length) {
        // We are in this segment
        const segmentProgress = (currentDist - covered) / segment.length;
        const lat = segment.start[0] + (segment.end[0] - segment.start[0]) * segmentProgress;
        const lng = segment.start[1] + (segment.end[1] - segment.start[1]) * segmentProgress;
        
        // Calculate basic bearing
        const y = Math.sin(segment.end[1] - segment.start[1]) * Math.cos(segment.end[0]);
        const x = Math.cos(segment.start[0]) * Math.sin(segment.end[0]) -
                  Math.sin(segment.start[0]) * Math.cos(segment.end[0]) * Math.cos(segment.end[1] - segment.start[1]);
        const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

        return { pos: [lat, lng], bearing };
      }
      covered += segment.length;
    }
    
    return { pos: routePoints[routePoints.length - 1], bearing: 0 };
  };

  const handleRecenter = () => {
    if (mapRef.current && busMarkerRef.current) {
        const busPos = busMarkerRef.current.getLatLng();
        mapRef.current.setView(busPos, 14, { animate: true });
    }
  };

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();

  // Search Effect
  useEffect(() => {
    if (!mapRef.current || !searchQuery) return;
    
    const query = searchQuery.toLowerCase().trim();
    
    if (query.includes('ecole') || query.includes('école') || query.includes('school') || query.includes('ghazala')) {
        const endPoint = routePoints[routePoints.length - 1];
        mapRef.current.flyTo(endPoint, 16, { duration: 1.5 });
    } else if (query.includes('maison') || query.includes('home') || query.includes('tunis')) {
        const startPoint = routePoints[0];
        mapRef.current.flyTo(startPoint, 16, { duration: 1.5 });
    }
  }, [searchQuery]);

  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current) return;

    if (!mapRef.current) {
      // Initialize Map
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: true,
        dragging: true,
        scrollWheelZoom: true,
      });

      // Tile Layer (OpenStreetMap)
      const tileUrl = isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' // CartoDB Dark Matter
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'; // CartoDB Positron (Clean Light)

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapRef.current);

      // Draw Route
      routePolylineRef.current = L.polyline(routePoints, {
        color: '#7C3AED', // Purple-600
        weight: 6,
        opacity: 0.8,
        dashArray: '10, 10',
        lineCap: 'round'
      }).addTo(mapRef.current);
      
      // Automatic Zoom to Fit Route
      if (routePolylineRef.current) {
          mapRef.current.fitBounds(routePolylineRef.current.getBounds(), { padding: [50, 50] });
      }

      // Start Marker (Home)
      const homeIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-purple-600"><div class="w-3 h-3 bg-purple-600 rounded-full"></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      const homeMarker = L.marker(routePoints[0], { icon: homeIcon }).addTo(mapRef.current);
      homeMarker.bindTooltip("Maison", { 
          permanent: true, 
          direction: 'bottom', 
          className: 'bg-white text-xs font-bold px-2 py-1 rounded border border-gray-200 shadow-sm text-purple-700 mt-2' 
      }).openTooltip();

      // End Marker (School)
      const schoolIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
      const schoolMarker = L.marker(routePoints[routePoints.length - 1], { icon: schoolIcon }).addTo(mapRef.current);
      schoolMarker.bindTooltip("École El Ghazala", { 
        permanent: true, 
        direction: 'bottom', 
        className: 'bg-white text-xs font-bold px-2 py-1 rounded border border-gray-200 shadow-sm text-purple-700 mt-2' 
      }).openTooltip();

      // Bus Marker
      const busHtml = `
        <div class="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 cursor-pointer group">
           <div class="relative z-10 w-10 h-10 bg-purple-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
           </div>
           <div class="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30"></div>
           <div class="absolute -top-8 bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
             Voir détails
           </div>
        </div>
      `;
      
      const busIcon = L.divIcon({
        className: 'custom-bus-marker',
        html: busHtml,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      });

      busMarkerRef.current = L.marker(routePoints[0], { icon: busIcon, zIndexOffset: 1000 }).addTo(mapRef.current);

      // Add click handler to bus marker
      busMarkerRef.current.on('click', () => {
          if (onBusClick) onBusClick();
      });
    }
  }, [isDarkMode]); // Re-init if mode changes

  // Update Bus Position
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current || !busMarkerRef.current) return;

    const { pos } = getPositionOnRoute(progress);
    busMarkerRef.current.setLatLng(pos);

    // Update marker appearance if delayed
    const el = busMarkerRef.current.getElement();
    if (el) {
        const inner = el.querySelector('.bg-purple-600');
        const ping = el.querySelector('.animate-ping');
        if (isDelayed) {
            if(inner) { inner.classList.remove('bg-purple-600'); inner.classList.add('bg-orange-500'); }
            if(ping) { ping.classList.remove('bg-purple-500'); ping.classList.add('bg-orange-500'); }
        } else {
            if(inner) { inner.classList.add('bg-purple-600'); inner.classList.remove('bg-orange-500'); }
            if(ping) { ping.classList.add('bg-purple-500'); ping.classList.remove('bg-orange-500'); }
        }
    }

  }, [progress, isDelayed]);

  return (
    <div className="w-full h-full relative group">
       <div ref={mapContainerRef} className="w-full h-full z-0" style={{background: isDarkMode ? '#1e293b' : '#f3f4f6'}}></div>
       
       {/* Map Controls */}
       <div className="absolute right-4 top-28 flex flex-col gap-3 z-[400]">
           <button 
             onClick={handleRecenter}
             className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-purple-600 dark:text-purple-400 hover:scale-105 transition-transform"
             title="Recentrer sur le bus"
           >
               <Icons.Navigation className="w-5 h-5" />
           </button>
           <div className="flex flex-col bg-white dark:bg-slate-800 rounded-full shadow-lg overflow-hidden">
             <button 
                onClick={handleZoomIn}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-slate-700"
             >
                 <span className="text-xl font-bold">+</span>
             </button>
             <button 
                onClick={handleZoomOut}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
             >
                 <span className="text-xl font-bold">-</span>
             </button>
           </div>
       </div>
    </div>
  );
};