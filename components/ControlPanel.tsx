import React from 'react';
import type { StyleOptions, Alignment } from '../types';
import { GOOGLE_FONTS, LANGUAGES, TONES } from '../constants';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from './Icons';

interface ControlPanelProps {
    topic: string;
    setTopic: (topic: string) => void;
    signature: string;
    setSignature: (signature: string) => void;
    language: string;
    setLanguage: (language: string) => void;
    tone: string;
    setTone: (tone: string) => void;
    styles: StyleOptions;
    handleStyleChange: <K extends keyof StyleOptions,>(key: K, value: StyleOptions[K]) => void;
    handleDownload: () => void;
    userImage: string | null;
    setUserImage: (image: string | null) => void;
    handleUserImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showSignature: boolean;
    setShowSignature: (show: boolean) => void;
    handleGenerateQuote: () => void;
    isGenerating: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    topic, setTopic, signature, setSignature, language, setLanguage, tone, setTone,
    styles, handleStyleChange, handleDownload, userImage, setUserImage, handleUserImageUpload,
    showSignature, setShowSignature, handleGenerateQuote, isGenerating
}) => {

    const renderSection = (title: string, children: React.ReactNode) => (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">{title}</h3>
            {children}
        </div>
    );

    return (
        <div className="bg-slate-50 p-4 rounded-xl shadow-md h-full sticky top-8">
            {renderSection("Content", (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-slate-600 mb-1">Topic</label>
                        <input
                            type="text"
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="e.g., creativity, success..."
                        />
                    </div>
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-slate-600 mb-1">Language</label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >
                            {LANGUAGES.map(lang => (
                                <option key={lang.value} value={lang.value}>{lang.name}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="tone" className="block text-sm font-medium text-slate-600 mb-1">Tone</label>
                        <select
                            id="tone"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >
                            {TONES.map(t => (
                                <option key={t.value} value={t.value}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                     <button
                        onClick={handleGenerateQuote}
                        disabled={isGenerating}
                        className="w-full bg-purple-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-purple-700 active:bg-purple-800 transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:scale-100 disabled:cursor-not-allowed"
                        aria-live="polite"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Quote ✨'}
                    </button>
                    <div>
                        <label htmlFor="signature" className="block text-sm font-medium text-slate-600 mb-1">Signature Text</label>
                        <input
                            type="text"
                            id="signature"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Your name or handle..."
                        />
                    </div>
                </div>
            ))}

            {renderSection("Signature", (
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="showSignature"
                            checked={showSignature}
                            onChange={(e) => setShowSignature(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="showSignature" className="ml-2 text-sm font-medium text-slate-600">Show signature elements</label>
                    </div>
                    <div className="flex items-center space-x-4">
                         <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {userImage ? (
                                <img src={userImage} alt="User signature" className="w-full h-full object-cover" />
                            ) : (
                               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                            )}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="user-image-upload" className="w-full block text-center px-3 py-2 bg-slate-200 text-slate-700 rounded-md cursor-pointer hover:bg-slate-300 transition-colors text-sm font-medium">
                               Upload Picture
                            </label>
                            <input id="user-image-upload" type="file" className="sr-only" accept="image/*" onChange={handleUserImageUpload} />
                            {userImage && (
                                <button onClick={() => setUserImage(null)} className="w-full block text-center mt-2 text-xs text-red-600 hover:text-red-800 font-semibold">
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {renderSection("Styling", (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="font" className="block text-sm font-medium text-slate-600 mb-1">Font</label>
                        <select
                            id="font"
                            value={styles.font}
                            onChange={(e) => handleStyleChange('font', e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >
                            {GOOGLE_FONTS.map(font => (
                                <option key={font.value} value={font.value}>{font.name}</option>
                            ))}
                        </select>
                    </div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="themeColor" className="text-sm font-medium text-slate-600">Theme Color</label>
                        <div className="relative">
                            <input
                                type="color"
                                id="themeColor"
                                value={styles.themeColor}
                                onChange={(e) => handleStyleChange('themeColor', e.target.value)}
                                className="w-10 h-10 p-0 border-none rounded-full cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
                            />
                        </div>
                    </div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="accentColor" className="text-sm font-medium text-slate-600">Accent Color</label>
                        <div className="relative">
                            <input
                                type="color"
                                id="accentColor"
                                value={styles.accentColor}
                                onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                                className="w-10 h-10 p-0 border-none rounded-full cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600">Alignment</span>
                        <div className="flex items-center space-x-1 bg-slate-200 p-1 rounded-md">
                            {(['left', 'center', 'right'] as Alignment[]).map(align => (
                                <button
                                    key={align}
                                    onClick={() => handleStyleChange('alignment', align)}
                                    className={`p-2 rounded transition-colors ${styles.alignment === align ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-slate-300'}`}
                                    aria-label={`Align ${align}`}
                                >
                                    {align === 'left' && <AlignLeftIcon />}
                                    {align === 'center' && <AlignCenterIcon />}
                                    {align === 'right' && <AlignRightIcon />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={handleDownload}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-all transform hover:scale-105"
            >
                Download PNG
            </button>
        </div>
    );
};