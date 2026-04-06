import { useEffect, useState } from "react";
import { createMTAStream, type StationUpdate } from "../services/ChaiStream";

export const useMTAStream = (activeStationId: string | null) => {
    const [stationData, setStationData] = useState<StationUpdate | null>(null);

    useEffect(() => {

        if (!activeStationId) {
            setStationData(null);
            return;
        }

        const stopStream = createMTAStream<StationUpdate>(
            (data) => setStationData(data),
            { type: 'station', id: activeStationId }
        );

        return () => {
            console.log("Cleaning up stream for:", activeStationId);
            stopStream();
        };
    }, [activeStationId]);

    return stationData;
};