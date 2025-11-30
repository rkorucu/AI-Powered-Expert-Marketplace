import React from 'react';
import { MessageSquare } from 'lucide-react';

export const Messages: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="w-80 border-r border-slate-100 bg-slate-50 p-4">
            <h2 className="font-bold text-slate-900 mb-4">Inbox</h2>
            <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-indigo-100 cursor-pointer">
                    <div className="font-semibold text-sm text-slate-900">Dr. Sarah Chen</div>
                    <div className="text-xs text-slate-500 truncate">Looking forward to our session tomorrow!</div>
                </div>
                 <div className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer">
                    <div className="font-semibold text-sm text-slate-900">Marcus Thorne</div>
                    <div className="text-xs text-slate-500 truncate">Great progress on the form check.</div>
                </div>
            </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-slate-300" />
            </div>
            <p>Select a conversation to start messaging</p>
        </div>
    </div>
  );
};