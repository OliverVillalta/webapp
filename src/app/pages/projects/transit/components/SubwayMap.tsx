import React, { useEffect, useRef, useState } from 'react';
import type { Point} from 'geojson';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import subwayLinesUrl from '../assets/MTA_Subway_Service_Lines_20260316.geojson?url';
import subwayStationsUrl from '../assets/MTA_Subway_Stations_20260316.geojson?url';
import { SearchBar } from '../../../../../components/Searchbar';
import { StationCard } from './StationCard';
import { getLineColorMatch} from '../utils/Formatters';
import { useMTAData } from '../hooks/bootstrapGeoData';
import { LineCard } from './LineCard';

interface MTAStationProperties {
    gtfs_stop_id: string;
    stop_name: string;
    daytime_routes: string;
    notes?: string;
}

export interface MTAProps {
    name: string;
    type: 'line' | 'station' | 'trip';
    coordinates: [number, number];
    id: string;
    lineSymbols: string[]; 
    notes?: string;
}

const SubwayMap: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [activeItem, setActiveItem] = useState<MTAProps | null>(null);

    // Bootstrap this bro
    const { mtaMap, searchIndex, isLoading } = useMTAData();

    // Map Initialization
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const m = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
            center: [-73.985655, 40.748433],
            zoom: 13,
        });
        
        m.getCanvas().style.cursor = 'default';
        map.current = m;

        m.on('load', () => {
            
            if (!map.current) return;

            m.addSource('live-trains', { type: 'geojson', data: { type: "FeatureCollection", features: []}});
            m.addLayer({
                id:'trains-layer',
                type: 'circle', 
                source: 'live-trains',
                paint: {
                    'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3, 15, 7],
                    'circle-color': getLineColorMatch(),
                    'circle-stroke-width':2,
                    'circle-stroke-color':'#ffffff',
                }
            });

            m.addSource('subway-lines', { type: 'geojson', data: subwayLinesUrl });
            m.addLayer({
                id: 'subway-lines-layer',
                type: 'line',
                source: 'subway-lines',
                paint: {
                    'line-color': getLineColorMatch(),
                    'line-width': 2
                }
            });

            m.addSource('subway-stations', { type: 'geojson', data: subwayStationsUrl, promoteId: "gtfs_stop_id" });
            m.addLayer({
                id: 'stations-layer',
                type: 'circle',
                source: 'subway-stations',
                paint: {
                    'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3, 15, 7],
                    'circle-color': '#FFFFFF',
                    'circle-stroke-width': 1.5,
                    'circle-stroke-color': '#000000'
                }
            });
            

            m.on('click', 'stations-layer', (e) => {
                if (e.features && e.features.length > 0) {
                    const feat = e.features[0];
                    const props = feat.properties as MTAStationProperties;
                    handleItemSelect({
                        id: props.gtfs_stop_id,
                        name: props.stop_name,
                        type: 'station',
                        coordinates: (feat.geometry as Point).coordinates as [number, number],
                        lineSymbols: String(props.daytime_routes || "").toUpperCase().split(/\s+/).filter(Boolean),
                        notes: props.notes || ""
                    });
                }
            });

            m.on('mousemove', 'stations-layer', (e) => {
                m.getCanvas().style.cursor = 'pointer';
            });

            m.on('mouseleave', 'stations-layer', () => {
                m.getCanvas().style.cursor = 'default';
            });
        });
        
        return () => {
            m.remove()
            map.current = null
        }; 
    }, []);

    // Filter logic
    useEffect(() => {
        const m = map.current;
        if (!m || !m.getLayer('stations-layer')) return;

        // Reset filters 
        if (m.getLayer('stations-layer')) m.setFilter('stations-layer', null);
        if (m.getLayer('subway-lines-layer')) m.setFilter('subway-lines-layer', null);

        if (!activeItem) return;

        switch(activeItem.type) {
            case 'station':
                m.setFilter('stations-layer', ['==', ['get', 'gtfs_stop_id'], activeItem.id]);
                const stationLinesFilter = ['any', ...activeItem.lineSymbols.map(symbol => ['in', symbol, ['get', 'service']])];
                m.setFilter('subway-lines-layer', stationLinesFilter as any);
                break;
            
            case 'line':
                const lineFilter = ['any', ...activeItem.lineSymbols.map((symbol: string) => ['in', symbol, ['get', 'service']])];
                m.setFilter('subway-lines-layer', lineFilter as any);

               const targetLineSymbols = [activeItem.id, ...activeItem.lineSymbols].map(s => s.toUpperCase());
                
                const stationFilters = targetLineSymbols.map(sym => ['in', sym, ['coalesce', ['get', 'daytime_routes'], '']]);

                m.setFilter('stations-layer', ['any', ...stationFilters] as any);
                break;
        }

    }, [activeItem]); 

    // Handler
    const handleItemSelect = (item: MTAProps) => {
        setActiveItem(item);
        const zoom = item.type === 'station' ? 16 : 13;
        map.current?.flyTo({ center: item.coordinates, zoom: zoom, duration: 2000, essential: true });
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full z-0" />
           
            {!activeItem && (
                <div className="absolute top-6 left-6 z-10 p-5 bg-zinc-900/90 text-white rounded-lg shadow-xl border border-white/10 w-80 space-y-4">
                    <div>
                        <h1 className="text-sm font-bold tracking-tight text-zinc-400 uppercase">MTA Subway</h1>
                    </div>

                    {isLoading ?  (<div className="text-white text-xs animate-pulse">Loading transit data...</div>) : (<SearchBar 
                        data={searchIndex} 
                        searchKeys={['name']} 
                        placeholder="Search for a station or line..."
                        onSelect={(item) => {handleItemSelect(item)}
                        }
                        renderItem={(item) => (
                            <div className="flex flex-col py-1">
                                <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">{item.type === 'line' && item.id} {item.type}</span>
                            </div>
                        )}
                    />
                    )}
                </div>
            )}

            {activeItem && activeItem.type === 'station' && (
               <StationCard
                activeStation = {activeItem}
                stationMap = {mtaMap}
                onClose = {() => setActiveItem(null)}
                />
            )}

            {activeItem && activeItem.type === 'line' && (
                <LineCard 
                activeLine={activeItem}
                mtaMap={mtaMap}
                onClose={() => setActiveItem(null)}
                />
            )}
        </div>
    );
};
export default SubwayMap;