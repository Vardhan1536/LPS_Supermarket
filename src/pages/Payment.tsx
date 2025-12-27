import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Calendar, Lock, Smartphone, Ban as Bank, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface PaymentState {
  total: number;
  items: any[];
  paymentMethod: string;
  selectedAddress: string;
  useDiamonds: boolean;
  diamondDiscount: number;
}

const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda'
];

const UPIApps = [
  { id: 'gpay', name: 'Google Pay', icon: '📱' },
  { id: 'phonepe', name: 'PhonePe', icon: '💰' },
  { id: 'paytm', name: 'Paytm', icon: '💳' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳' }
];

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedUPIApp, setSelectedUPIApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  const paymentState = location.state as PaymentState;

  if (!paymentState) {
    navigate('/cart');
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      let paymentResponse;
      if (paymentState.paymentMethod === 'card') {
        paymentResponse = await fetch('http://localhost:5000/pay/card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...cardDetails,
            amount: paymentState.total // Send the amount to the backend
          }),
        });
      } else if (paymentState.paymentMethod === 'upi') {
        paymentResponse = await fetch('http://localhost:5000/pay/upi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            upiId,
            app: selectedUPIApp,
            amount: paymentState.total, // Send the amount to the backend
          }),
        });
      }
      const responseData = await paymentResponse.json();
      console.log(responseData);
  
      if (paymentResponse.ok && responseData.message === 'success') {
        // If diamonds are used, reduce the user's diamond count
        if (paymentState.useDiamonds) {
          const newDiamonds = user!.diamonds - paymentState.diamondDiscount;
          // Update the user state in the AuthContext
          user!.diamonds = newDiamonds; // You can also call an API to update the user on the backend
        }
  
        const newOrder = {
          id: `ORD${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          status: 'Processing',
          total: paymentState.total,
          items: paymentState.items,
          paymentMethod: paymentState.paymentMethod,
          address: user?.addresses.find(addr => addr.id === paymentState.selectedAddress),
        };
  
        clearCart();
        navigate('/order-success', { state: { order: newOrder } });
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderPaymentForm = () => {
    switch (paymentState.paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="input-field pl-10"
                  required
                  pattern="[0-9\s]{16,19}"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                />
                <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input-field pl-10"
                    required
                    pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                  />
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="123"
                    className="input-field pl-10"
                    required
                    pattern="[0-9]{3,4}"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input-field"
                required
                value={cardDetails.cardHolderName}
                onChange={(e) => setCardDetails({ ...cardDetails, cardHolderName: e.target.value })}
              />
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {UPIApps.map(app => (
                <label
                  key={app.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                    selectedUPIApp === app.id ? 'border-secondary bg-secondary/5' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="upiApp"
                    value={app.id}
                    checked={selectedUPIApp === app.id}
                    onChange={(e) => setSelectedUPIApp(e.target.value)}
                    className="text-secondary focus:ring-secondary"
                  />
                  <span className="text-xl">{app.icon}</span>
                  <span>{app.name}</span>
                </label>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UPI ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@upi"
                  className="input-field pl-10"
                  required
                />
                <Smartphone className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Enter your UPI ID (e.g., username@okaxis or number@upi)
              </p>
            </div>
          </div>
        );

      // Other payment methods can go here

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Payment</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="text-sm text-gray-600 mb-2">Order Total</div>
        <div className="text-2xl font-bold">₹{paymentState.total.toLocaleString()}</div>
      </div>
      
      <form onSubmit={handlePayment} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderPaymentForm()}
        </div>
        
        <button
          type="submit"
          className="btn-secondary w-full"
          disabled={loading || (
            paymentState.paymentMethod === 'upi' && (!selectedUPIApp || !upiId)) || 
            (paymentState.paymentMethod === 'netbanking' && !selectedBank)
          }
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing Payment...
            </span>
          ) : (
            'Pay ₹' + paymentState.total.toLocaleString()
          )}
        </button>
      </form>
    </div>
  );
}