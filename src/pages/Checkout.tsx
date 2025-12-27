import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet, Ban as Bank, Gift, Diamond } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses[0]?.id);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [useDiamonds, setUseDiamonds] = useState(false);

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const diamondDiscount = useDiamonds ? Math.min(user?.diamonds * 3, subtotal * 0.1) : 0;
  const total = subtotal + shipping - diamondDiscount;

  const handlePlaceOrder = () => {
      navigate('/payment', {
        state: {
          total,
          items,
          paymentMethod,
          selectedAddress,
          useDiamonds,
          diamondDiscount
        }
      }); 
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Wallet },
    { id: 'netbanking', name: 'Net Banking', icon: Bank },
    { id: 'cod', name: 'Cash on Delivery', icon: Gift }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-secondary" />
              <h2 className="text-lg font-semibold">Delivery Address</h2>
            </div>
            <div className="space-y-4">
              {user?.addresses.map((address) => (
                <label
                  key={address.id}
                  className={`block p-4 rounded-lg border-2 cursor-pointer ${
                    selectedAddress === address.id
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="mt-1 text-secondary focus:ring-secondary"
                    />
                    <div className="ml-3">
                      <p className="font-medium">{address.street}</p>
                      <p className="text-gray-600">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      {address.isDefault && (
                        <span className="inline-block mt-1 text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">
                          Default Address
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
              <button className="text-secondary hover:text-secondary/80">
                + Add New Address
              </button>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`block p-4 rounded-lg border-2 cursor-pointer ${
                      paymentMethod === method.id
                        ? 'border-secondary bg-secondary/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-secondary focus:ring-secondary"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <Icon size={20} />
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              {user?.diamonds > 0 && (
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useDiamonds}
                      onChange={(e) => setUseDiamonds(e.target.checked)}
                      className="rounded text-secondary focus:ring-secondary"
                    />
                    <div className="flex items-center gap-1">
                      <Diamond size={16} className="text-secondary" />
                      <span>Use {user.diamonds} diamonds</span>
                    </div>
                  </label>
                  {useDiamonds && (
                    <div className="flex justify-between mt-2 text-secondary">
                      <span>Diamond discount</span>
                      <span>-₹{diamondDiscount}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                {total >= 300 && (
                  <div className="text-xs text-secondary mt-1">
                    You'll earn {Math.floor((total - 300) / 50) + 1} diamonds
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="btn-secondary w-full mt-6"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}