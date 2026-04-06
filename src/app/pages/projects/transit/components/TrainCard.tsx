interface TrainInfoProps {
    line: string,
    status: string,
    eta: number,
    lineColor: string
}

export const TrainInfo = ({line,  status, eta, lineColor} : TrainInfoProps) => {
    const minutesLeft = Math.max(0, Math.floor((eta - Date.now() / 1000) / 60));
    return (
         <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
                
                <span style={{ backgroundColor: lineColor || '#000000' }} className="w-5 h-5 flex items-center justify-center text-white text-[9px] font-black rounded-full">
                    {line}
                </span>
                
                <div className="flex flex-col">
                    <span className="text-zinc-200 text-[10px] font-bold uppercase tracking-tight">
                        {status}
                    </span>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-xs font-black font-mono ${minutesLeft <= 2 ? 'text-orange-500 animate-pulse' : 'text-emerald-500'}`}>
                    {minutesLeft}
                    <span className="text-[9px] ml-1">min</span>
                </span>
            </div>
        </div>
    );
}