'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Zap } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setOutput(data.result);
    } catch (e) {
      setOutput('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Zap className="text-indigo-400 w-8 h-8" />
          <span className="text-indigo-400 font-semibold text-sm tracking-widest uppercase">AI Powered</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-3 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
          APP NAME HERE
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Your tagline goes here. One line. Make it punchy.
        </p>
      </motion.div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl mb-6"
      >
        <label className="text-gray-400 text-sm font-medium mb-2 block">Your Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something here..."
          rows={4}
          className="w-full bg-gray-800 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          {loading ? 'Processing...' : 'Run AI Magic'}
        </motion.button>
      </motion.div>

      {/* Output Card */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl bg-indigo-950 border border-indigo-700 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-indigo-400 w-4 h-4" />
              <span className="text-indigo-300 text-sm font-semibold">AI Output</span>
            </div>
            <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}