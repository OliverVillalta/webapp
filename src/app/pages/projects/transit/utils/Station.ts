const stationLookup: Record<string, string> = {};

export const initStationLookup = async (url: string) => {
    if (Object.keys(stationLookup).length > 0) return; 
    
    const res = await fetch(url);
    const data = await res.json();
    data.features.forEach((f: any) => {
        stationLookup[f.properties.gtfs_stop_id] = f.properties.stop_name;
    });
};

export const getStationName = (id: string) => stationLookup[id] || id;