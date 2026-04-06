export type TrainUpdate = {
    id: string;
    line: string;
    status: string;
    lon: number;
    lat: number;
};

export type StationUpdate = {
    id: string;
    name: string;
    arrivals: {
        id: string;
        line: string;
        status: string;
        eta: number;
    }[];
};

export const createMTAStream = <T,>(onUpdate: (data: T) => void, filter?: { type: 'station' | 'line' | 'trip'; id: string }) => {
    const BASE_URL = import.meta.env.VITE_API_URL || '';
    const params = filter ? `?type=${filter.type}&id=${filter.id}` : '';
    
    const eventSource = new EventSource(`${BASE_URL}/events${params}`);

    eventSource.addEventListener('update', (event) => {
        try {
            const data = JSON.parse(event.data) as T;
            onUpdate(data);
        } catch (err) {
            console.error("MTA Stream Parse Error: ", err);
        }
    });

    eventSource.onerror = (err) => {
        console.error("MTA EventSource failed. Closing connection...", err);
        eventSource.close();
    };

    return () => {
        console.log("Closing MTA Stream...");
        eventSource.close();
    };
};