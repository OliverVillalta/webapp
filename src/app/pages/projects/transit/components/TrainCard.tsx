interface TrainCardProps {
    service: string;
    status: string;
    lineColor: string;
}

export const TrainCard = ({service, status, lineColor} : TrainCardProps) => {
    return (
         <div className="flex justify-between items-center group">
            <div className="flex items-center gap-3">
                
                <span style={{ backgroundColor: lineColor || '#000000' }} className="w-5 h-5 flex items-center justify-center text-white text-[9px] font-black rounded-full">
                    {service}
                </span>
                
                <div className="flex flex-col">
                    <span className="text-zinc-200 text-[10px] font-bold uppercase tracking-tight">
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
}