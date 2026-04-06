import { type DataDrivenPropertyValueSpecification} from 'maplibre-gl';
import { type SubwaySearchItem } from '../components/SubwayMap';

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

export const getReadableStatus = (rawStatus: string, lookup: Map<string, SubwaySearchItem>): string => {
    const parts = rawStatus.split(" ");
    const action = parts[0].replace(/_/g, " ");
    const stopId = parts[1];
    
    if (!stopId) return action;

    const direction = stopId.endsWith("N") ? " (Northbound)" : 
                    stopId.endsWith("S") ? " (Southbound)" : "";
                    
    const lookupID = direction ? stopId.slice(0, -1) : stopId;
    const name =  lookup.get(lookupID)?.name;

    return `${action} ${name}${direction}`;
};

