import React, { forwardRef } from 'react';
import type { StyleOptions } from '../types';

interface QuotePreviewProps {
    quote: string;
    setQuote: (quote: string) => void;
    signature: string;
    styles: StyleOptions;
    userImage: string | null;
    showSignature: boolean;
}

export const QuotePreview = forwardRef<HTMLDivElement, QuotePreviewProps>(
    ({ quote, setQuote, signature, styles, userImage, showSignature }, ref) => {
        const alignmentClasses = {
            left: 'items-start text-left',
            center: 'items-center text-center',
            right: 'items-end text-right',
        };

        const quoteMarkStyle: React.CSSProperties = {
            color: styles.themeColor,
        };

        return (
            <div className="w-full max-w-[700px] aspect-square">
                <div
                    ref={ref}
                    className="w-full h-full bg-white shadow-2xl rounded-2xl overflow-hidden relative"
                >
                    {/* Accent Color Shape */}
                    <div
                        className="absolute bottom-0 right-0 w-2/5 h-2/5"
                        style={{ backgroundColor: styles.accentColor }}
                    />

                    <div className="relative z-10 w-full h-full p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center">
                        <div className="w-full relative pt-8">
                            
                            {/* BORDER PIECES */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Common Vertical Borders */}
                                <div className="absolute top-0 left-0 bottom-0 w-1" style={{ backgroundColor: styles.themeColor }} />
                                <div className="absolute top-0 right-0 bottom-0 w-1" style={{ backgroundColor: styles.themeColor }} />

                                {/* Mobile Borders (base) - shown up to sm */}
                                <div className="sm:hidden">
                                    <div className="absolute top-0 h-1" style={{ backgroundColor: styles.themeColor, left: '2.5rem', right: 'calc(50% + 2.25rem)' }} />
                                    <div className="absolute top-0 h-1" style={{ backgroundColor: styles.themeColor, left: 'calc(50% + 2.25rem)', right: '0' }} />
                                    <div className="absolute bottom-0 left-0 h-1" style={{ backgroundColor: styles.themeColor, right: '2.5rem' }} />
                                </div>

                                {/* Tablet Borders (sm) - shown between sm and lg */}
                                <div className="hidden sm:block lg:hidden">
                                    <div className="absolute top-0 h-1" style={{ backgroundColor: styles.themeColor, left: '3rem', right: 'calc(50% + 2.75rem)' }} />
                                    <div className="absolute top-0 h-1" style={{ backgroundColor: styles.themeColor, left: 'calc(50% + 2.75rem)', right: '0' }} />
                                    <div className="absolute bottom-0 left-0 h-1" style={{ backgroundColor: styles.themeColor, right: '3rem' }} />
                                </div>

                                {/* Desktop Borders (lg) - shown from lg up */}
                                <div className="hidden lg:block">
                                    <div className="absolute top-0 h-1" style={{ backgroundColor: styles.themeColor, left: '4rem', right: 'calc(50% + 3.25rem)' }} />
                                    <div className="absolute top-0 h-1" style={{ backgroundColor: styles.themeColor, left: 'calc(50% + 3.25rem)', right: '0' }} />
                                    <div className="absolute bottom-0 left-0 h-1" style={{ backgroundColor: styles.themeColor, right: '4rem' }} />
                                </div>
                            </div>
                            
                            {/* User Image - Positioned on top of the border */}
                            {showSignature && userImage && (
                                <div
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl shadow-md"
                                >
                                    <img
                                        src={userImage}
                                        alt={signature}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            )}

                            <span
                                className="absolute top-0 left-2 text-6xl sm:text-7xl lg:text-8xl font-serif transform -translate-y-1/2"
                                style={quoteMarkStyle}
                                aria-hidden="true"
                            >
                                “
                            </span>
                            
                            <div className={`w-full flex flex-col justify-center p-6 sm:p-8 ${alignmentClasses[styles.alignment]}`} style={{ minHeight: '120px' }}>
                                <blockquote className={`${styles.font} transition-all duration-300`}>
                                    <p
                                        contentEditable={true}
                                        onInput={(e) => setQuote(e.currentTarget.textContent || "")}
                                        suppressContentEditableWarning={true}
                                        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight outline-none focus:ring-2 focus:ring-indigo-300/70 focus:rounded-md p-1 -m-1 cursor-text"
                                        style={{ color: '#1E293B' }}
                                        data-placeholder="Your generated quote will appear here."
                                    >
                                        {quote}
                                    </p>
                                </blockquote>
                                {showSignature && signature && (
                                    <cite
                                       className={`block not-italic text-base sm:text-lg lg:text-xl mt-4 ${styles.font} transition-all duration-300`}
                                       style={{ color: '#475569' }}
                                   >
                                       - {signature}
                                   </cite>
                                )}
                            </div>
                            
                            <span
                                className="absolute bottom-0 right-2 text-6xl sm:text-7xl lg:text-8xl font-serif transform translate-y-1/2"
                                style={quoteMarkStyle}
                                aria-hidden="true"
                            >
                                ”
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
