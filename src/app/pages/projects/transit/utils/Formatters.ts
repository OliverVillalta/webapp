import { type DataDrivenPropertyValueSpecification} from 'maplibre-gl';
import { type MTAProps } from '../components/SubwayMap';

export const LINE_COLORS: Record<string, string> = {
    '1': '#EE352E', '2': '#EE352E', '3': '#EE352E',
    '4': '#009952', '5': '#009952', '5 Peak': '#009952', '6': '#009952',
    '7': '#9A38A1',
    'A': '#0062CF', 'C': '#0062CF', 'E': '#0062CF',
    'B': '#EB6800', 'D': '#EB6800', 'F': '#EB6800', 'M': '#EB6800',
    'G': '#799534', 'J': '#8E5C33', 'Z': '#8E5C33',
    'N': '#F6BC26', 'Q': '#F6BC26', 'R': '#F6BC26', 'W': '#F6BC26',
    'SIR': '#08179C',
    'L': '#A7A9AC', 'S': '#808183', 'SF': '#808183', 'ST': '#808183', 'SR': '#808183',
    '':'#808183'
};

export const getLineColorMatch = () => {
    const matchExpression: any[] = ['match', ['get', 'service']];
    Object.entries(LINE_COLORS).forEach(([service, color]) => {
        matchExpression.push(service, color);
    });
    matchExpression.push('#7C858C'); 
    return matchExpression as DataDrivenPropertyValueSpecification<string>;
};

export const getReadableTrainStatus = (tripId: string, currentStop: string, status: string, lookup: Map<string, MTAProps>): string => {
    let direction: string = "";
    let new_status:string = status.replaceAll("_", " ");
    if (tripId.includes("..N")) {
        direction = "(Northbound)";
    }
    if (tripId.includes("..S")) {
        direction = "(Southbound)";
    }

    if (currentStop.endsWith('N') || currentStop.endsWith('S')) {
        currentStop = currentStop.substring(0, currentStop.length-1);
    }

    const name =  lookup.get(currentStop)?.name;

    return `${new_status} ${name} ${direction}`;
};

