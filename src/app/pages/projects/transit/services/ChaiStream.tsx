export type TripInfo = {
    id: string;
    line: string;
    status: string;
    upcomingStops: string[] | null;
};

export type LineUpdate = {
    id: string;
    activeTrains: TripInfo[] | null;
};

export type StationUpdate = {
    id: string;
    arrivals: {
        id: string;
        routeid: string;
        currentStop: string;
        status: string;
        eta: number;
    }[] | null;
};

export const createMTAStream = <T,>(onUpdate: (data: T) => void, filter?: { type: string; id: string }) => {
    const BASE_URL = import.meta.env.VITE_API_URL || '';
    const params = filter ? `/${filter.type}/${filter.id}` : '';
    
    const eventSource = new EventSource(`${BASE_URL}/transit${params}`);

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