const lineLookup: Record<string, string> = {};

export const initStationLookup = async (url: string) => {
    if (Object.keys(lineLookup).length > 0) return; 
    
    const res = await fetch(url);
    const data = await res.json();
    data.features.forEach((f: any) => {
        lineLookup[f.properties.gtfs_stop_id] = f.properties.stop_name;
    });
};

