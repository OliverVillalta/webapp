import { useState, useEffect } from 'react';
import type { Feature, Point, MultiLineString } from 'geojson';
import subwayLinesUrl from '../assets/MTA_Subway_Service_Lines_20260316.geojson?url';
import subwayStationsUrl from '../assets/MTA_Subway_Stations_20260316.geojson?url';
import type { MTAProps } from '../components/SubwayMap';

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

export const useMTAData = () => {
    const [mtaMap, setMtaMap] = useState<Map<string, any>>(new Map());
    const [searchIndex, setSearchIndex] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const bootstrap = async () => {
            try {
                const [linesRes, stationsRes] = await Promise.all([
                    fetch(subwayLinesUrl, { signal }),
                    fetch(subwayStationsUrl, { signal })
                ]);
                
                const linesData = await linesRes.json() as { features: Feature<MultiLineString, MTALineProperties>[] };
                const stationsData = await stationsRes.json() as { features: Feature<Point, MTAStationProperties>[] };

                const unifiedMap = new Map<string, MTAProps>();

                linesData.features.forEach((f) => {
                    const id = f.properties.service;
                    if (!unifiedMap.has(id)) {
                        unifiedMap.set(id, {
                            name: f.properties.service_name,
                            type: 'line',
                            coordinates: f.geometry.coordinates[0][0] as [number, number],
                            id: id,
                            lineSymbols: [id] 
                        });
                    }
                });

                stationsData.features.forEach((f) => {
                    const id = f.properties.gtfs_stop_id;
                    if (!unifiedMap.has(id)) {
                        const symbols = String(f.properties.daytime_routes || "").toUpperCase().split(/\s+/).filter(Boolean);
                        unifiedMap.set(id, {
                            name: f.properties.stop_name,
                            type: 'station',
                            coordinates: f.geometry.coordinates as [number, number],
                            id: id,
                            lineSymbols: symbols,
                            notes: f.properties.notes || ""
                        });
                    }
                });

                setMtaMap(unifiedMap);
                setSearchIndex(Array.from(unifiedMap.values()));
                setIsLoading(false); 
                
            } catch (err) {
                console.error("Failed to load MTA static data:", err);
                setIsLoading(false);
            }
        };

        bootstrap();

        return () => {
            controller.abort();
        }
    }, []); 

    return { mtaMap, searchIndex, isLoading };
};