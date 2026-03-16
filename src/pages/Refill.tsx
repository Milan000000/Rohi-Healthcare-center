import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, Upload, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Refill() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    customerName: '',
    phoneNumber: '',
    previousPrescriptionId: '',
    preferredPickupTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'refills'), {
        ...formData,
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting refill:', error);
      alert('Failed to submit refill request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-green-100"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Refill Requested!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            We've received your refill request. We will review your prescription and notify you when it's ready for pickup.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all"
          >
            Request Another Refill
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Prescription Refill Request</h1>
        <p className="text-gray-600 text-lg">Quick and easy refills for your existing prescriptions.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 bg-red-50 border-b border-red-100 flex items-center gap-4">
          <div className="bg-red-600 p-3 rounded-2xl">
            <RefreshCw className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Refill Form</h3>
            <p className="text-sm text-gray-600">Please provide your details and prescription info.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <input 
                required
                type="text"
                value={formData.customerName}
                onChange={e => setFormData({...formData, customerName: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Phone Number</label>
              <input 
                required
                type="tel"
                value={formData.phoneNumber}
                onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="0800 123 4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Previous Prescription ID (Optional)</label>
              <input 
                type="text"
                value={formData.previousPrescriptionId}
                onChange={e => setFormData({...formData, previousPrescriptionId: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="e.g. RX-9921"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Preferred Pickup Time</label>
              <select 
                required
                value={formData.preferredPickupTime}
                onChange={e => setFormData({...formData, preferredPickupTime: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              >
                <option value="">Select a time...</option>
                <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
                <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                <option value="Evening (4PM - 9PM)">Evening (4PM - 9PM)</option>
              </select>
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center space-y-4 hover:border-red-300 transition-colors cursor-pointer group">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:bg-red-50 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 group-hover:text-red-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Upload Prescription Photo</p>
              <p className="text-sm text-gray-500">Drag and drop or click to browse (JPG, PNG, PDF)</p>
            </div>
            <input type="file" className="hidden" />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
            Submit Refill Request
          </button>
        </form>
      </div>
    </div>
  );
}
