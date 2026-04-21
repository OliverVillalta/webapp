import React, { useState, useEffect } from 'react';
import { matchSorter } from 'match-sorter';

interface SearchBarProps<T> {
    data: T[];
    searchKeys: (keyof T)[];
    placeholder?: string;
    onSelect: (item: T) => void;
    renderItem: (item: T) => React.ReactNode;
}

export function SearchBar<T>({ 
    data, 
    searchKeys, 
    onSelect, 
    renderItem, 
    placeholder = "Search..." }: SearchBarProps<T>) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<T[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 0) {
                const filtered = matchSorter(
                    data, 
                    query, {
                        keys: searchKeys.map(key => String(key)),
                        baseSort: (a, b) => (a.index < b.index ? -1:1),
                }).slice(0, 5);
                setResults(filtered);
            } else {
                setResults([]);
            }
        }, 300); 

        return () => clearTimeout(timer);
    }, [query, data, searchKeys]); 

    return (
        <div className="relative w-full group">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-black/80 text-white border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 backdrop-blur-md font-mono text-sm"
            />
            
            {results.length > 0 && (
                <ul className="absolute top-full left-0 w-full mt-2 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                    {results.map((item, i) => (
                        <li 
                            key={i}
                            onClick={() => {
                                onSelect(item);
                                setQuery('');
                                setResults([]);
                            }}
                            className="px-4 py-3 hover:bg-emerald-500/20 cursor-pointer border-b border-white/5 last:border-none"
                        >
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}