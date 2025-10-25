import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { GoogleGenAI } from '@google/genai';
import { ControlPanel } from './components/ControlPanel';
import { QuotePreview } from './components/QuotePreview';
import type { StyleOptions } from './types';
import { GOOGLE_FONTS, PUNJABI_FONTS } from './constants';

function App() {
  const [quote, setQuote] = useState("Your generated quote will appear here.");
  const [topic, setTopic] = useState("creativity");
  const [signature, setSignature] = useState("Gemini");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("inspirational");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const [styles, setStyles] = useState<StyleOptions>({
    font: GOOGLE_FONTS[5].value, // Playfair Display
    alignment: 'center',
    themeColor: '#4F46E5', // indigo-600
    accentColor: '#DBEAFE', // blue-100
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleStyleChange = useCallback(<K extends keyof StyleOptions>(key: K, value: StyleOptions[K]) => {
    setStyles(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    // Auto-switch to a Punjabi font if the language is set to Punjabi
    // and the current font is not a Punjabi font.
    if (language === 'Punjabi' && !PUNJABI_FONTS.includes(styles.font)) {
      handleStyleChange('font', 'font-tiro-gurmukhi');
    }
  }, [language, styles.font, handleStyleChange]);


  const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = useCallback(() => {
    if (previewRef.current === null) {
      return;
    }
    toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'quote.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Oops, something went wrong!', err);
      });
  }, [previewRef]);

  const handleGenerateQuote = async () => {
    setIsGenerating(true);
    setQuote("");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Be specific for Punjabi to get the correct script and dialect
      const languageForPrompt = language === 'Punjabi'
        ? 'Pakistani Punjabi (Shahmukhi script)'
        : language;
      
      const prompt = `Generate a short, ${tone} quote about "${topic}". The quote should be in ${languageForPrompt}. Do not include quotation marks or any attributions.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text.trim();
      setQuote(text);

    } catch (error) {
      console.error("Error generating quote:", error);
      setQuote("Sorry, something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-2xl font-bold text-slate-800">Quote Generator</h1>
                </div>
            </div>
        </header>

        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                    <ControlPanel
                        topic={topic}
                        setTopic={setTopic}
                        signature={signature}
                        setSignature={setSignature}
                        language={language}
                        setLanguage={setLanguage}
                        tone={tone}
                        setTone={setTone}
                        styles={styles}
                        handleStyleChange={handleStyleChange}
                        handleDownload={handleDownload}
                        userImage={userImage}
                        setUserImage={setUserImage}
                        handleUserImageUpload={handleUserImageUpload}
                        showSignature={showSignature}
                        setShowSignature={setShowSignature}
                        handleGenerateQuote={handleGenerateQuote}
                        isGenerating={isGenerating}
                    />
                </div>

                <div className="lg:col-span-2 flex justify-center items-center lg:sticky lg:top-24">
                    <QuotePreview
                        ref={previewRef}
                        quote={quote}
                        setQuote={setQuote}
                        signature={signature}
                        styles={styles}
                        userImage={userImage}
                        showSignature={showSignature}
                    />
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;