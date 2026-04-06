import React, { useEffect, useRef, useState } from 'react';
import type { Feature, Point, MultiLineString } from 'geojson';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import subwayLinesUrl from '../assets/MTA_Subway_Service_Lines_20260316.geojson?url';
import subwayStationsUrl from '../assets/MTA_Subway_Stations_20260316.geojson?url';
import { SearchBar } from '../../../../../components/Searchbar';
import { TrainInfo } from './TrainCard';
import { createMTAStream, type StationUpdate} from '../services/ChaiStream';
import { LINE_COLORS, getLineColorMatch, getReadableStatus} from '../utils/Formatters'


interface MTALineProperties {
    service: string;
    service_name: string;
}

interface MTAStationProperties {
    gtfs_stop_id: string;
    stop_name: string;
    daytime_routes: string;
    notes?: string;
}

export interface SubwaySearchItem {
    name: string;
    type: 'line' | 'station';
    coordinates: [number, number];
    id: string;
    lineSymbols?: string[]; 
    notes?: string;
}

const uniqueLines = new Map<string, SubwaySearchItem>();
const uniqueStations = new Map<string, SubwaySearchItem>();

const SubwayMap: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [hoveredStation, setHoveredStation] = useState<string | null>(null);
    const [activeStation, setActiveStation] = useState<any | null>(null);
    const [searchIndex, setSearchIndex] = useState<SubwaySearchItem[]>([]);
    const [stationData, setStationData] = useState<StationUpdate | null>(null);


    useEffect(() => {
        const bootstrap = async () => {
            try {
                const [linesRes, stationsRes] = await Promise.all([
                    fetch(subwayLinesUrl),
                    fetch(subwayStationsUrl)
                ]);
                const linesData = await linesRes.json() as { features: Feature<MultiLineString, MTALineProperties>[] };
                const stationsData = await stationsRes.json() as { features: Feature<Point, MTAStationProperties>[] };

                linesData.features.forEach((f: any) => {
                    const id = f.properties.service.toUpperCase();
                    if (!uniqueLines.has(id)) {
                        uniqueLines.set(id, {
                            name: `${f.properties.service_name} (${id})`,
                            type: 'line',
                            coordinates: f.geometry.coordinates[0][0],
                            id: id
                        });
                    }
                });

                stationsData.features.forEach((f: any) => {
                    const id = f.properties.gtfs_stop_id;
                    if (!uniqueStations.has(id)) {
                        const symbols = String(f.properties.daytime_routes || "").toUpperCase().split(/\s+/).filter(Boolean);
                        uniqueStations.set(id, {
                            name: f.properties.stop_name,
                            type: 'station',
                            coordinates: f.geometry.coordinates,
                            id: id,
                            lineSymbols: symbols,
                            notes: f.properties.notes || ""
                        });
                    }
                });

                setSearchIndex([...Array.from(uniqueLines.values()), ...Array.from(uniqueStations.values())]);
            } catch (err) {
                console.error("Bootstrap Error:", err);
            }
        };
        bootstrap();
    }, []);

    useEffect(() => {
        if (!activeStation?.id) {
            setStationData(null);
            return;
        }

        const stopStream = createMTAStream<StationUpdate>(
            (data) => setStationData(data),
            { type: 'station', id: activeStation.id }
        );

        return () => stopStream();
    }, [activeStation?.id]);

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
            if (!m) return;

            m.addSource('subway-lines', { type: 'geojson', data: subwayLinesUrl });
            m.addLayer({
                id: 'subway-lines-layer',
                type: 'line',
                source: 'subway-lines',
                paint: {
                    'line-color': getLineColorMatch(),
                    'line-width': 4
                }
            });

            m.addSource('subway-stations', { type: 'geojson', data: subwayStationsUrl, promoteId:"gtfs_stop_id" });
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
                    handleStationSelect({
                        id: props.gtfs_stop_id,
                        name: props.stop_name,
                        coordinates: (feat.geometry as any).coordinates,
                        lineSymbols: String(props.daytime_routes || "").toUpperCase().split(/\s+/).filter(Boolean),
                        notes: props.notes ||""
                    });
                }
            });

            m.on('mousemove', 'stations-layer', (e: any) => {
                m.getCanvas().style.cursor = 'pointer';
                setHoveredStation(e.features[0].properties.stop_name);
            });

            m.on('mouseleave', 'stations-layer', () => {
                m.getCanvas().style.cursor = 'default';
                setHoveredStation(null);
            });
        });
        return () => {};
    }, []);

    useEffect(() => {
        const m = map.current;
        if (!m || !m.isStyleLoaded()) return;

        if (!activeStation) {
        if (m.getLayer('stations-layer')) m.setFilter('stations-layer', null);
        if (m.getLayer('subway-lines-layer')) m.setFilter('subway-lines-layer', null);
        return;
    }

        const stationFilter = ['==', ['get', 'gtfs_stop_id'], activeStation.id];
        if (m.getLayer('stations-layer')) {
        m.setFilter('stations-layer', stationFilter as any);
    }
        const activeSymbols = activeStation.lineSymbols;

        const lineFilter = [
            'any',
            ...activeSymbols.map((symbol: string) => [
                'in', 
                symbol, 
                ['get', 'service']
            ])
        ];

        if (m.getLayer('subway-lines-layer')) {
            m.setFilter('subway-lines-layer', lineFilter as any);
        }
    }, [activeStation]);

    const handleStationSelect = (item: any) => {
        setActiveStation(item);
        map.current?.flyTo({ center: item.coordinates, zoom: 16, duration: 2000, essential: true });
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full z-0" />
           
            {!activeStation && (
                <div className="absolute top-6 left-6 z-10 p-5 bg-zinc-900/90 text-white rounded-lg shadow-xl border border-white/10 w-80 space-y-4">
                    <div>
                        <h1 className="text-sm font-bold tracking-tight text-zinc-400 uppercase">MTA Subway</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider italic">NOTICE: Data may not be accurate.</span>
                        </div>
                    </div>

                    <SearchBar 
                        data={searchIndex} 
                        searchKeys={['name']} 
                        placeholder="Search for a station or line..."
                        onSelect={(item) => {
                            if (item.type === 'station') handleStationSelect(item);
                            }
                        }
                        renderItem={(item) => (
                            <div className="flex flex-col py-1">
                                <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">{item.type}</span>
                            </div>
                        )}
                    />
                </div>
            )}

            {activeStation && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
                    <div className="bg-zinc-900 border border-white/20 rounded-xl shadow-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                        
                        <button onClick={() => setActiveStation(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                            <span className="text-zinc-400 text-lg leading-none hover:cursor-pointer">✕</span>
                        </button>

                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-black text-white leading-tight">{activeStation.name}</h2>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1 tracking-widest">{activeStation.notes}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 py-4 border-y border-white/10">
                                {activeStation.lineSymbols?.map((symbol: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/5 pr-3 rounded-full border border-white/5">
                                        <span style={{ backgroundColor: LINE_COLORS[symbol] || '#444' }} className="w-8 h-8 flex items-center justify-center text-white text-[11px] font-black rounded-full shadow-lg">
                                            {symbol}
                                        </span>
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{symbol} Line</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 max-h-48 overflow-visible pr-2 ">
                                {stationData?.arrivals && stationData.arrivals.length > 0 ? (
                                    [...stationData.arrivals].sort((a, b) => a.eta - b.eta).map((train) => (
                                           <TrainInfo key={train.id} line={train.line} status={getReadableStatus(train.status, uniqueStations)} eta={train.eta} lineColor={LINE_COLORS[train.line]}/>))) : (
                                        <div className="flex flex-col items-center py-4 opacity-40">
                                        <div className="w-3 h-3 border border-zinc-500 border-t-transparent rounded-full animate-spin mb-2" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Fetching data...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!activeStation && hoveredStation && (
                <div className="absolute bottom-10 left-10 z-10 bg-black/80 backdrop-blur-md px-3 py-2 rounded-md text-white border border-white/10 text-[10px] font-mono uppercase tracking-widest">
                    {hoveredStation}
                </div>
            )}
        </div>
    );
};
export default SubwayMap;