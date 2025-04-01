import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Sun, Moon, FileText, Save, Trash2, Search, Wand2, Clipboard } from 'lucide-react';
import Footer from './components/Footer';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set. Please set it in your environment variables.');
}

export default function TextEditor() {
  const [text, setText] = useState(localStorage.getItem('editorText') || '');
  const [fileName, setFileName] = useState('document.txt');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('editorText', text);
  }, [text]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const handleClear = () => setText('');
  const handleSave = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAIWrite = async () => {
    if (!text) return alert('Please enter some text to enhance with AI.');
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text }] }] }
      );

      const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text || 'No response from AI.';
      setText((prev) => prev + '\n\n' + aiResponse);
    } catch (error) {
      alert('Error using Gemini AI: ' + (error.response?.data?.error?.message || error.message));
    }
    setLoading(false);
  };

  const removeCharacter = (char) => setText(text.replace(new RegExp(`\\${char}`, 'g'), ''));
  const removeExtraSpaces = () => setText(text.replace(/\s+/g, ' '));
  const removeAllSpaces = () => setText(text.replace(/\s/g, ''));
  const copyToClipboard = () => navigator.clipboard.writeText(text);

  return (
    <motion.div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-purple-50 text-purple-900'} p-6 sm:p-10`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header and Theme Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-5xl font-bold">AI-Powered Text Editor</h1>
        <button
          onClick={toggleTheme}
          className="bg-gray-600 text-white p-2 sm:p-3 rounded-xl shadow-lg hover:bg-gray-700"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Buttons at the top */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
        {['-', '/', '\\', '>', '<', '.', ',', '_', '*'].map((char) => (
          <button
            key={char}
            onClick={() => removeCharacter(char)}
            className="w-24 sm:w-32 md:w-36 h-8 sm:h-10 text-sm sm:text-base bg-purple-800 text-white rounded-lg hover:bg-purple-700"
          >
            Remove {char}
          </button>
        ))}
        <button
          onClick={removeExtraSpaces}
          className="w-36 sm:w-34 md:w-38 h-8 sm:h-10 text-sm  sm:text-[15px] bg-purple-800 text-white rounded-lg hover:bg-purple-700"
        >
          Remove Extra Spaces
        </button>
        <button
          onClick={removeAllSpaces}
          className="w-32 sm:w-32 md:w-36 h-8 sm:h-10 text-sm sm:text-[15px] bg-purple-800 text-white rounded-lg hover:bg-purple-700"
        >
          Remove All Spaces
        </button>
       
      </div>

      {/* File Name Input */}
      <div className="flex items-center gap-2 mb-4">
        <FileText size={24} />
        <input
          type="text"
          placeholder="File Name..."
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="p-2 sm:p-3 border border-purple-300 rounded-xl shadow-md"
        />
      </div>

      {/* Text Editor */}
      <motion.textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
        className={`w-full h-64 sm:h-80 md:h-96 p-4 border border-purple-300 rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Gemini Button */}
      <div className="flex justify-start mt-4 gap-2 sm:gap-4">
        <button
          onClick={handleAIWrite}
          className="w-32 sm:w-32 md:w-36 h-8 sm:h-10 text-sm sm:text-[15px] bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? 'Writing with AI...' : <><Wand2 size={20} className="mr-2" /> Write with AI</>}
        </button>
        <button
          onClick={copyToClipboard}
          className="w-24 sm:w-32 md:w-36 h-8 sm:h-10 text-sm sm:text-base bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
        >
          <Clipboard size={16} className="mr-1" /> Copy
        </button>
        <button
          onClick={handleClear}
          className="w-24 sm:w-32 md:w-36 h-8 sm:h-10 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center"
        >
          <Trash2 size={16} className="mr-1" /> Clear
        </button>
        <button
          onClick={handleSave}
          className="w-24 sm:w-32 md:w-36 h-8 sm:h-10 text-sm sm:text-base bg-blue-800 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <Save size={16} className="mr-1" /> Save
        </button>

        
        
      </div>
      <div  className="w-[100%] flex justify-center mt-4">
          <Footer />
      </div>
    </motion.div>
  );
}
