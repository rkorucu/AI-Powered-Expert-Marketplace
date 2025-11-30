import React, { useState } from 'react';
import { Expert } from '../types';
import { X, Calendar, Clock, CreditCard, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ expert, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !expert) return null;

  const dates = [
    { day: 'Mon', date: '12' },
    { day: 'Tue', date: '13' },
    { day: 'Wed', date: '14' },
    { day: 'Thu', date: '15' },
    { day: 'Fri', date: '16' },
  ];

  const times = ['09:00 AM', '10:00 AM', '01:00 PM', '03:30 PM', '05:00 PM'];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate API call to Spring Boot backend
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="font-bold text-slate-900">Book Session</h2>
          <button onClick={resetAndClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img src={expert.avatar} alt={expert.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{expert.name}</h3>
                  <p className="text-slate-500 text-sm">{expert.title}</p>
                  <p className="text-indigo-600 font-semibold mt-1">${expert.hourlyRate}/hr</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Date</label>
                <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                  {dates.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border min-w-[64px] transition-all ${
                        selectedDate === d.date
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-medium">{d.day}</span>
                      <span className="text-lg font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Time</label>
                <div className="grid grid-cols-2 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Session with {expert.name}</span>
                  <span className="font-medium text-slate-900">${expert.hourlyRate}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Service Fee</span>
                  <span className="font-medium text-slate-900">$5.00</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>${expert.hourlyRate + 5}.00</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                  Payment Method
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Expiry</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">CVC</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                Payments secured by Stripe Connect
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                Your session with {expert.name} has been scheduled. A calendar invite has been sent to your email.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 mb-6 inline-block w-full text-left">
                 <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">Friday, Oct {selectedDate}</span>
                 </div>
                 <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">{selectedTime}</span>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {step === 1 && (
            <button
              onClick={handleNext}
              disabled={!selectedDate || !selectedTime}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              Continue to Payment <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}

          {step === 2 && (
            <div className="flex space-x-3">
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-xl font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Pay $${expert.hourlyRate + 5}.00`
                )}
              </button>
            </div>
          )}

          {step === 3 && (
            <button
              onClick={resetAndClose}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Return to Marketplace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
