import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';

export default function ServiceCard({ service }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="card">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl">
                        {service.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-text-dark">{service.title}</h3>
                        <p className="text-base text-text-light">{service.subtitle}</p>
                    </div>
                </div>
                <button className="w-12 h-12 rounded-xl bg-bg flex items-center justify-center border-none cursor-pointer text-text hover:bg-primary hover:text-white transition-all">
                    {expanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                </button>
            </div>

            {expanded && (
                <div className="mt-5 pt-5 border-t border-border animate-fade-in">
                    <h4 className="text-lg font-semibold text-primary mb-3">📋 Step-by-Step Guide</h4>
                    <ol className="space-y-3">
                        {service.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                </span>
                                <p className="text-base text-text">{step}</p>
                            </li>
                        ))}
                    </ol>
                    {service.helpline && (
                        <div className="mt-4 p-4 bg-info/10 rounded-xl">
                            <p className="text-sm font-semibold text-info">📞 Helpline: {service.helpline}</p>
                        </div>
                    )}
                    {service.website && (
                        <a href={service.website} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-accent font-semibold hover:underline">
                            <FiExternalLink size={16} /> Visit Official Website
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
