import React from 'react';
import { motion } from 'motion/react';
import { Search, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Inquiry() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    customerName: '',
    phoneNumber: '',
    drugName: '',
    quantity: 1,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({ customerName: '', phoneNumber: '', drugName: '', quantity: 1, notes: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Inquiry Submitted!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for contacting Rohi-Healthcare Center. Our team will check the availability of <span className="font-bold text-red-600">"{formData.drugName}"</span> and contact you shortly at <span className="font-medium">{formData.phoneNumber}</span>.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Drug Availability</h1>
        <p className="text-gray-600 text-lg">Save time by checking if we have your medication in stock before visiting.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2 bg-red-600 p-10 text-white space-y-8">
          <h3 className="text-2xl font-bold">How it works</h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
              <p>Fill out the inquiry form with the drug details.</p>
            </li>
            <li className="flex gap-4">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
              <p>Our pharmacists check our current inventory.</p>
            </li>
            <li className="flex gap-4">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
              <p>We call or text you with the availability and price.</p>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Your Name</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700">Drug Name</label>
              <input 
                required
                type="text"
                value={formData.drugName}
                onChange={e => setFormData({...formData, drugName: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="e.g. Paracetamol"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <input 
                required
                type="number"
                min="1"
                value={formData.quantity}
                onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</label>
            <textarea 
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all h-32 resize-none"
              placeholder="Any specific instructions or dosage details..."
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
