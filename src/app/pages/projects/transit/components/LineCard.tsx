import React from 'react';
import type { MTAProps } from './SubwayMap';
import { useMTAStream } from '../hooks/dataStream';
import type { LineUpdate } from '../services/ChaiStream';
import { LINE_COLORS, getReadableTrainStatus } from '../utils/Formatters';
import { TrainCard } from './TrainCard';

interface LineCardProps {
    activeLine: MTAProps;
    mtaMap: Map<string, MTAProps>;
    onClose: () => void;
}

export const LineCard: React.FC<LineCardProps> = ({ activeLine, mtaMap, onClose }) => {

    const lineData = useMTAStream<LineUpdate>(activeLine.id, 'line');

    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
            <div className="bg-zinc-900 border border-white/20 rounded-xl shadow-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                
                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                    <span className="text-zinc-400 text-lg leading-none hover:cursor-pointer">✕</span>
                </button>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-tight">{activeLine.name}</h2>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1 tracking-widest">{activeLine.notes}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 py-4 border-y border-white/10">
                        {activeLine.lineSymbols?.map((symbol: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 bg-white/5 pr-3 rounded-full border border-white/5">
                                <span style={{ backgroundColor: LINE_COLORS[symbol] || '#444' }} className="w-8 h-8 flex items-center justify-center text-white text-[11px] font-black rounded-full shadow-lg">
                                    {symbol}
                                </span>
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{symbol} Line</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 max-h-48 overflow-visible pr-2 ">
                        {lineData?.activeTrains && lineData.activeTrains.length > 0 ? (
                            [...lineData.activeTrains].sort((a, b) => a.line.localeCompare(b.line)).map((train) => (
                                <TrainCard
                                    key = {train.id}
                                    service = {train.line}
                                    status = {getReadableTrainStatus(train.status, mtaMap)} 
                                    lineColor={LINE_COLORS[train.line]}
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