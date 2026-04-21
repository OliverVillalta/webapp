import { useEffect, useState } from "react";
import { createMTAStream} from "../services/ChaiStream";

type StreamType = 'station' | 'line' | 'trip';
export const useMTAStream = <T>(id: string, type: StreamType) => {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        if (!id) {
            setData(null);
            return;
        }

        const stopStream = createMTAStream<T>(
            (incomingData) => setData(incomingData),
            { type: type, id: id }
        );
        
        return () => {
            stopStream();
        };
    }, [type, id]);
    
    return data;
};