import React from 'react';
import { UserRole } from '../types';
import { useContext } from 'react';
import { AppContext } from '../App';

export const UserProfile: React.FC = () => {
  const { userRole } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Your Profile</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
         <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-400">
                {userRole === UserRole.CLIENT ? 'C' : 'E'}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{userRole === UserRole.CLIENT ? 'Demo Client' : 'Demo Expert'}</h2>
                <p className="text-slate-500">{userRole === UserRole.CLIENT ? 'Learning and Growing' : 'Sharing Knowledge'}</p>
                <div className="mt-2 flex space-x-2">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Verified Identity</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">Payment Connected</span>
                </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Account Details</h3>
                <div className="space-y-3 text-sm">
                    <div>
                        <span className="text-slate-500 block">Email</span>
                        <span className="text-slate-900 font-medium">demo@{userRole.toLowerCase()}.nexus.app</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Location</span>
                        <span className="text-slate-900 font-medium">San Francisco, CA</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Member Since</span>
                        <span className="text-slate-900 font-medium">September 2024</span>
                    </div>
                </div>
            </div>

            <div>
                 <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Settings</h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Email Notifications</span>
                        <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                            <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Two-Factor Auth</span>
                         <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-pointer">
                            <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
                        </div>
                    </div>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};