import React, { useContext } from 'react';
import { AppContext } from '../App';
import { MOCK_SESSIONS } from '../constants';
import { SessionStatus } from '../types';
import { Calendar, CheckCircle2, Video, CreditCard, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { userRole } = useContext(AppContext);
  const upcomingSessions = MOCK_SESSIONS.filter(s => s.status === SessionStatus.SCHEDULED || s.status === SessionStatus.LIVE);
  const pastSessions = MOCK_SESSIONS.filter(s => s.status === SessionStatus.COMPLETED);

  const stats = [
    { label: 'Upcoming Sessions', value: upcomingSessions.length.toString(), icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Hours Spent', value: '18.5', icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: userRole === 'CLIENT' ? 'Spent' : 'Earned', value: '$1,240', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {userRole === 'CLIENT' ? 'Client' : 'Expert'}</h1>
        <p className="text-slate-500 mt-2">Here's what's happening with your schedule today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed: Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-slate-900">Upcoming Sessions</h2>
             <Link to="/marketplace" className="text-indigo-600 text-sm font-semibold hover:underline flex items-center">
               Book New <ArrowUpRight className="w-4 h-4 ml-1" />
             </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => (
                    <div key={session.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                                {new Date(session.date).getDate()}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{session.topic}</h3>
                                <p className="text-sm text-slate-500">with <span className="font-medium text-slate-700">{session.expertName}</span></p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {session.durationMinutes} min
                                </p>
                            </div>
                        </div>
                        <Link 
                            to={`/session/${session.id}`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all text-center"
                        >
                            Join Session
                        </Link>
                    </div>
                ))
            ) : (
                <div className="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center">
                    <p className="text-slate-500">No upcoming sessions.</p>
                    <Link to="/marketplace" className="text-indigo-600 font-semibold mt-2 inline-block">Find an expert</Link>
                </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-slate-900 pt-4">Recent History</h2>
           <div className="space-y-4">
            {pastSessions.map(session => (
                <div key={session.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 opacity-75 hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start">
                        <div>
                             <h3 className="font-bold text-slate-900 line-through text-slate-400">{session.topic}</h3>
                             <p className="text-sm text-slate-500">Completed on {new Date(session.date).toLocaleDateString()}</p>
                        </div>
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">Paid ${session.price}</span>
                    </div>
                    {session.notes && (
                        <div className="mt-3 bg-slate-50 p-3 rounded-lg text-sm text-slate-600">
                            <span className="font-semibold block mb-1">Notes:</span>
                            {session.notes}
                        </div>
                    )}
                </div>
            ))}
           </div>
        </div>

        {/* Sidebar: Recommended */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-slate-900">Suggested Actions</h2>
           <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Complete Profile</h3>
              <p className="text-purple-100 text-sm mb-4">Add your skills and payment method to get better AI matches.</p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-semibold transition-colors">
                Edit Profile
              </button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 mb-4">Payout Balance</h3>
             <div className="flex items-baseline space-x-1 mb-4">
                 <span className="text-3xl font-bold text-slate-900">$0.00</span>
                 <span className="text-sm text-slate-500">available</span>
             </div>
             <p className="text-xs text-slate-400 mb-4">Powered by Stripe Connect</p>
             <button className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 py-2 rounded-lg text-sm font-medium transition-colors">
                Manage Payouts
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};