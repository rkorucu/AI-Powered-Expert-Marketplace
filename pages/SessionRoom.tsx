import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mic, Video, MonitorOff, PhoneOff, MessageSquare, FileText, Send, Sparkles, X, Paperclip, File } from 'lucide-react';
import { MOCK_TRANSCRIPT } from '../constants';
import { generateSessionSummary } from '../services/geminiService';
import { Message } from '../types';

export const SessionRoom: React.FC = () => {
  const { id } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  
  // AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummary, setAiSummary] = useState<{ summary: string; actionItems: string[] } | null>(null);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
      { id: 1, text: "Hi! Ready to start?", sender: "Expert", isMe: false, timestamp: "10:00 AM" },
      { id: 2, text: "Yes, let's go.", sender: "You", isMe: true, timestamp: "10:01 AM" }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if(!inputText.trim()) return;
      
      const newMessage: Message = { 
          id: Date.now(), 
          text: inputText, 
          sender: "You", 
          isMe: true,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          type: 'text'
      };
      
      setMessages([...messages, newMessage]);
      setInputText("");
  };

  const handleFileUpload = () => {
      // Simulate file upload
      const newMessage: Message = {
          id: Date.now(),
          text: "",
          sender: "You",
          isMe: true,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          type: 'file',
          fileName: 'Project_Requirements_v2.pdf',
          fileSize: '2.4 MB'
      };
      setMessages([...messages, newMessage]);
  };

  const handleGenerateSummary = async () => {
      setIsGenerating(true);
      setShowSummary(true); // Open the panel
      setShowChat(false);
      try {
          // In a real app, this would be the live transcription buffer
          const result = await generateSessionSummary(MOCK_TRANSCRIPT);
          setAiSummary(result);
      } catch (e) {
          console.error(e);
      } finally {
          setIsGenerating(false);
      }
  };

  const togglePanel = (panel: 'chat' | 'summary') => {
      if (panel === 'chat') {
          setShowChat(!showChat);
          if (!showChat) setShowSummary(false);
      } else {
          setShowSummary(!showSummary);
          if (!showSummary) setShowChat(false);
      }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900 z-10">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </Link>
            <div>
                <h1 className="font-bold text-lg">Machine Learning Basics</h1>
                <div className="flex items-center space-x-2 text-xs text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>00:15:34</span>
                </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
              <button 
                onClick={handleGenerateSummary}
                className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg shadow-indigo-500/20"
              >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Notes</span>
              </button>
          </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex overflow-hidden">
         {/* Video Area */}
         <div className="flex-1 p-4 flex flex-col items-center justify-center relative bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-w-6xl">
                {/* Remote User */}
                <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group">
                    <img src="https://picsum.photos/800/600?random=1" className="w-full h-full object-cover opacity-90" alt="Remote" />
                    <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-sm font-medium backdrop-blur-sm">
                        Dr. Sarah Chen
                    </div>
                    {/* Simulated Connection Quality */}
                    <div className="absolute top-4 right-4 flex space-x-1">
                        <div className="w-1 h-3 bg-green-500 rounded-full" />
                        <div className="w-1 h-3 bg-green-500 rounded-full" />
                        <div className="w-1 h-3 bg-green-500 rounded-full" />
                        <div className="w-1 h-3 bg-slate-600 rounded-full" />
                    </div>
                </div>
                
                {/* Local User */}
                <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                   {isVideoOff ? (
                       <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-400">You</div>
                   ) : (
                       <img src="https://picsum.photos/800/600?random=8" className="w-full h-full object-cover opacity-90 scale-x-[-1]" alt="Local" />
                   )}
                   <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-sm font-medium backdrop-blur-sm">
                        You
                    </div>
                    {isMuted && (
                        <div className="absolute top-4 right-4 bg-red-500/80 p-2 rounded-full">
                            <Mic className="w-4 h-4 text-white" />
                        </div>
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-slate-900/90 border border-slate-700 p-3 rounded-2xl backdrop-blur-lg shadow-2xl z-20">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    {isMuted ? <Mic className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
                </button>
                <button 
                   onClick={() => setIsVideoOff(!isVideoOff)}
                   className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    {isVideoOff ? <MonitorOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
                </button>
                <Link to="/dashboard" className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors">
                    <PhoneOff className="w-6 h-6 text-white" />
                </Link>
                <div className="w-px h-8 bg-slate-700 mx-2" />
                <button 
                    onClick={() => togglePanel('summary')}
                    className={`p-4 rounded-full transition-colors ${showSummary ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    <FileText className="w-6 h-6" />
                </button>
                 <button 
                    onClick={() => togglePanel('chat')}
                    className={`p-4 rounded-full transition-colors ${showChat ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    <MessageSquare className="w-6 h-6" />
                </button>
            </div>
         </div>

         {/* Sidebar (Chat or Summary) */}
         {(showChat || showSummary) && (
             <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col relative z-20 shadow-xl">
                {showSummary ? (
                    <div className="flex-1 flex flex-col p-4 overflow-hidden bg-slate-900/95">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-indigo-400 flex items-center"><Sparkles className="w-4 h-4 mr-2" /> AI Notes</h2>
                            <button onClick={() => setShowSummary(false)}><X className="w-4 h-4 text-slate-500 hover:text-white" /></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {!aiSummary && !isGenerating && (
                                <div className="text-center mt-20 text-slate-500 px-4">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-700" />
                                    <p className="mb-6 text-sm">Generate instant summary and action items from your conversation.</p>
                                    <button 
                                        onClick={handleGenerateSummary}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                                    >
                                        Generate Now
                                    </button>
                                </div>
                            )}

                            {isGenerating && (
                                <div className="space-y-4 animate-pulse mt-4">
                                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-800 rounded w-full"></div>
                                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                                    <div className="mt-6 h-32 bg-slate-800 rounded w-full"></div>
                                </div>
                            )}

                            {aiSummary && (
                                <>
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 leading-relaxed">
                                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Summary</h3>
                                        {aiSummary.summary}
                                    </div>
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Action Items</h3>
                                        <ul className="space-y-3">
                                            {aiSummary.actionItems.map((item, i) => (
                                                <li key={i} className="flex items-start text-sm text-slate-300">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col bg-slate-900/95">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                            <span className="font-bold text-sm text-slate-300">Live Chat</span>
                            <button onClick={() => setShowChat(false)}><X className="w-4 h-4 text-slate-500 hover:text-white" /></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                                        msg.isMe 
                                        ? 'bg-indigo-600 text-white rounded-br-none' 
                                        : 'bg-slate-800 text-slate-200 rounded-bl-none'
                                    }`}>
                                        {msg.type === 'file' ? (
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-white/20 p-2 rounded-lg">
                                                    <File className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{msg.fileName}</p>
                                                    <p className="text-xs opacity-70">{msg.fileSize}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="p-4 border-t border-slate-800">
                             <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                <button 
                                    type="button" 
                                    onClick={handleFileUpload}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Attach File"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <input 
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-800 border border-transparent focus:border-indigo-500 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                />
                                <button 
                                    type="submit" 
                                    disabled={!inputText.trim()}
                                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
             </div>
         )}
      </div>
    </div>
  );
};
