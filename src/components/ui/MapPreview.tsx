"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapPreviewProps {
    fromCoords: [number, number] | null;
    toCoords: [number, number] | null;
    className?: string;
    lineColor?: string;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export function MapPreview({ fromCoords, toCoords, className, lineColor = '#B8A082' }: MapPreviewProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);



    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/navigation-night-v1', // Luxury dark theme
            center: [144.9631, -37.8136], // Default to Melbourne
            zoom: 10,
            attributionControl: false,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => {
            map.current?.remove();
        };
    }, []);

    useEffect(() => {
        if (!map.current) return;

        // Clear existing markers and layers
        const markers = document.querySelectorAll('.mapboxgl-marker');
        markers.forEach(m => m.remove());

        if (map.current.getLayer('route')) {
            map.current.removeLayer('route');
        }
        if (map.current.getSource('route')) {
            map.current.removeSource('route');
        }

        const bounds = new mapboxgl.LngLatBounds();

        if (fromCoords) {
            new mapboxgl.Marker({ color: '#B8A082' }) // Brand color
                .setLngLat(fromCoords)
                .addTo(map.current);
            bounds.extend(fromCoords);
        }

        if (toCoords) {
            new mapboxgl.Marker({ color: '#ffffff' })
                .setLngLat(toCoords)
                .addTo(map.current);
            bounds.extend(toCoords);
        }

        const fetchRoute = async () => {
            if (fromCoords && toCoords) {
                try {
                    const query = await fetch(
                        `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
                    );
                    const json = await query.json();
                    const data = json.routes[0];
                    const route = data.geometry.coordinates;

                    if (map.current) {
                        map.current.addSource('route', {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: route,
                                },
                            },
                        });

                        map.current.addLayer({
                            id: 'route',
                            type: 'line',
                            source: 'route',
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round',
                            },
                            paint: {
                                'line-color': lineColor,
                                'line-width': 4,
                                'line-opacity': 1, // Increased opacity for better visibility
                            },
                        });

                        // Fit bounds with padding
                        map.current.fitBounds(bounds, {
                            padding: 50,
                            duration: 1000
                        });
                    }
                } catch (error) {
                    console.error('Error fetching route:', error);
                }
            } else if ((fromCoords || toCoords) && map.current) {
                // Just center on the single marker
                map.current.flyTo({
                    center: fromCoords || toCoords || [144.9631, -37.8136],
                    zoom: 14,
                    duration: 1000
                });
            }
        };

        fetchRoute();
    }, [fromCoords, toCoords]);

    return (
        <div className={className}>
            <div ref={mapContainer} className="w-full h-full rounded-2xl overflow-hidden" />
        </div>
    );
}
