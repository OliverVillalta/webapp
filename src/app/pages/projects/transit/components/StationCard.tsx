import React from 'react';
import { ArrivalInfo } from './ArrivalCard';
import { LINE_COLORS, getReadableTrainStatus } from '../utils/Formatters';
import type { MTAProps } from './SubwayMap';
import { useMTAStream } from '../hooks/dataStream';
import type { StationUpdate } from '../services/ChaiStream';

interface StationCardProps {
    activeStation: MTAProps;
    stationMap: Map<string, MTAProps>;
    onClose: () => void;
}

export const StationCard: React.FC<StationCardProps> = ({ activeStation, stationMap, onClose }) => {
    const stationData = useMTAStream<StationUpdate>(activeStation.id, 'station');

    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
            <div className="bg-zinc-900 border border-white/20 rounded-xl shadow-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
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

                    <div className="space-y-3 max-h-48 scrollbar-thumb-rounded-full scrollbar scrollbar-thumb-slate-700 overflow-y-scroll">
                        {stationData?.arrivals && stationData.arrivals.length > 0 ? (
                            [...stationData.arrivals].sort((a, b) => a.eta - b.eta).map((train) => (
                                <ArrivalInfo
                                    key={train.id} 
                                    line={train.routeid}
                                    long_name={train.routeid.endsWith("X") ? stationMap.get(train.routeid.substring(0, train.routeid.length-1)).name + 'Express' :  stationMap.get(train.routeid).name} 
                                    status={getReadableTrainStatus(train.id, train.currentStop, train.status, stationMap)} 
                                    eta={train.eta} 
                                    lineColor={LINE_COLORS[train.routeid]}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center py-4 opacity-40">
                                <div className="w-3 h-3 border border-zinc-500 border-t-transparent rounded-full animate-spin mb-2" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Fetching data...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}