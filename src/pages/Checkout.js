import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 
import axios from 'axios';
import { CartContext } from '../CartContext'; 

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(CartContext); 

  // --- Dynamic Data Handling ---
  const selectedProduct = location.state?.product;
  const isFromCart = location.state?.isFromCart;
  const cartItems = location.state?.cartItems || []; 
  const cartTotal = location.state?.total;
  const cartItemsCount = location.state?.itemsCount;

  const finalAmount = isFromCart ? cartTotal : (selectedProduct ? selectedProduct.price : 318.00);
  const finalDescription = isFromCart 
    ? `Bulk Order (${cartItemsCount} Items)` 
    : (selectedProduct ? selectedProduct.name : "Recycled Materials Bundle");

  // State Management
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); 
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState("VIJAYALAKSHMI matchworks, ANNA NEW STREET, KALUGUMALAI, TAMIL NADU, 628552, India");
  const [tempAddress, setTempAddress] = useState(address);
  const [userReview, setUserReview] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // --- Payment Verification States ---
  const [upiRefId, setUpiRefId] = useState(''); 
  const [isProcessing, setIsProcessing] = useState(false);

  // Card Details Initialization
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  // --- PDF Generation Logic ---
  const generateInvoice = (refId) => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(22, 163, 74); 
      doc.text("Waste to Worth (W2W) - Invoice", 14, 20);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
      doc.text(`Customer Email: ${email}`, 14, 35);
      doc.text(`Payment Status: SUCCESS (Ref: ${refId || 'N/A'})`, 14, 40);
      doc.setTextColor(0);
      doc.text("Delivery Address:", 14, 45);
      doc.setFontSize(9);
      doc.text(address, 14, 50, { maxWidth: 180 });

      let tableBody = [];
      if (isFromCart && cartItems.length > 0) {
        tableBody = cartItems.map(item => [
          item.name, 
          `INR ${item.price.toFixed(2)}`,
          item.quantity || 1, 
          `INR ${(item.price * (item.quantity || 1)).toFixed(2)}`
        ]);
      } else {
        tableBody = [[
          finalDescription, 
          `INR ${finalAmount.toFixed(2)}`,
          "1", 
          `INR ${finalAmount.toFixed(2)}`
        ]];
      }

      autoTable(doc, {
        startY: 65,
        head: [['Item', 'Price', 'Quantity', 'Total Price']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [22, 163, 74], textColor: [255, 255, 255], fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 5 },
      });

      const finalY = doc.lastAutoTable.finalY || 100;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`GRAND TOTAL: INR ${finalAmount.toFixed(2)}`, 14, finalY + 15);
      
      doc.save(`W2W_Invoice_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF Generate Error:", err);
    }
  };

  const handleOrderNow = async () => {
    // 1. Basic Validation
    if (!email || !email.includes('@')) {
      alert("Enter a valid email address for the invoice!");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    // --- MACHI: STRICT PAYMENT VERIFICATION & SECURITY ---
    if (paymentMethod === 'upi') {
      const upiRegex = /^[0-4][0-9]{11}$/; 
      if (!upiRefId) {
        alert("⚠️  Pay First! please enter Reference ID !");
        return;
      }
      if (!upiRegex.test(upiRefId)) {
        alert("⚠️ 12 digit reference id is wrong.");
        return;
      }
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.number || cardDetails.number.length < 16) {
        alert("⚠️ Card details must be valid! Please enter a 16-digit card number.");
        return;
      }
    }

    setIsProcessing(true);

    // MACHI: Preparing Secured Order Data
    const orderData = {
      email,
      description: finalDescription,
      amount: finalAmount,
      address,
      paymentMethod,
      // CARD payment-na dummy ID anupuroam (Security Purpose)
      transactionId: paymentMethod === 'upi' ? upiRefId : `CARD_${Date.now()}`,
      orderType: 'shopping',
      items: isFromCart ? cartItems : [{ name: finalDescription, price: finalAmount, quantity: 1 }]
    };

    try {
      await axios.post(`${API_URL}/api/orders`, orderData);

      // MACHI: Discard sensitive info from state after success
      if (paymentMethod === 'card') {
        setCardDetails({ number: '', name: '', expiry: '', cvv: '' });
      }

      generateInvoice(upiRefId || 'CARD_PAYMENT'); 
      if (isFromCart) clearCart();

      alert(`Order Successful Machi! ✅ Invoice downloaded. Admin will verify soon.`);
      navigate('/history');
    } catch (err) {
      console.error("Order error:", err);
      // Backend status 400 error message (like Duplicate ID)
      alert(err.response?.data?.error || "Something went wrong with the order!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReviewSubmit = () => {
    if (userReview.trim().length < 5) {
      alert("Machi, feedback konjam nalla kodu!");
      return;
    }
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setUserReview('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-10 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        
        <div className="flex-[2] space-y-6">
          {/* Contact Section */}
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-tight">Contact Information</h2>
            <input 
              type="email" 
              placeholder="Enter your email ID for invoice" 
              className="w-full p-4 border-2 border-gray-100 rounded-xl outline-none focus:border-green-500 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">1. Shipping Address</h2>
              <button onClick={() => setIsEditingAddress(true)} className="text-blue-600 hover:text-blue-800 text-sm font-bold transition">Edit</button>
            </div>
            {isEditingAddress ? (
              <div className="space-y-3">
                <textarea className="w-full p-4 border-2 border-gray-100 rounded-xl text-sm outline-none focus:border-orange-500" rows="3" value={tempAddress} onChange={(e) => setTempAddress(e.target.value)} />
                <div className="flex gap-2">
                  <button onClick={() => { setAddress(tempAddress); setIsEditingAddress(false); }} className="bg-orange-500 text-white px-6 py-2 rounded-xl text-sm font-black shadow-md">Save</button>
                  <button onClick={() => setIsEditingAddress(false)} className="bg-gray-200 text-gray-600 px-6 py-2 rounded-xl text-sm font-black">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{address}</p>
            )}
          </div>

          {/* Payment Details */}
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-tight">2. Payment details</h2>
            
            <div className="flex gap-4 mb-6">
                <button onClick={() => setPaymentMethod('upi')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${paymentMethod === 'upi' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>UPI / QR Scan</button>
                <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>Card Payment</button>
                <button onClick={() => setPaymentMethod('cod')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${paymentMethod === 'cod' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>Cash on Delivery</button>
            </div>

            <div className="space-y-4">
              {paymentMethod === 'upi' && (
                <div className="text-center p-6 bg-green-50 rounded-2xl border-2 border-dashed border-green-200 animate-in fade-in duration-500">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      `upi://pay?pa=rajanthlasi662@okicici&pn=W2W Store&am=${finalAmount}&cu=INR&tn=W2W Order Payment`
                    )}`} 
                    alt="Payment QR"
                    className="mx-auto rounded-xl shadow-md mb-4 border-4 border-white"
                  />
                  <p className="text-[11px] font-black text-gray-950 uppercase tracking-widest mb-4 italic underline decoration-green-500">Scan & Pay ₹{finalAmount.toFixed(2)}</p>
                  
                  <div className="max-w-xs mx-auto">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Enter 12 Digit Transaction ID:</label>
                    <input 
                      type="text" 
                      maxLength="12"
                      placeholder="Starts with 0, 1, 2, 3 or 4"
                      className="w-full p-3 border-2 border-green-200 rounded-xl outline-none focus:border-green-600 font-bold text-center uppercase tracking-widest"
                      value={upiRefId}
                      onChange={(e) => setUpiRefId(e.target.value.replace(/\D/g, ''))}
                    />
                    <p className="text-[9px] text-gray-400 mt-2 italic">*Order security verified via Transaction ID</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <input 
                    type="text" name="number" placeholder="Card Number (16 Digits)" 
                    className="w-full p-4 border rounded-xl text-sm outline-none focus:border-green-500 font-bold"
                    value={cardDetails.number} onChange={handleCardInput} maxLength="16"
                  />
                  <div className="flex gap-4">
                    <input 
                      type="text" name="expiry" placeholder="MM/YY" 
                      className="w-1/2 p-4 border rounded-xl text-sm outline-none focus:border-green-500 font-bold"
                      value={cardDetails.expiry} onChange={handleCardInput} maxLength="5"
                    />
                    <input 
                      type="password" name="cvv" placeholder="CVV" 
                      className="w-1/2 p-4 border rounded-xl text-sm outline-none focus:border-green-500 font-bold"
                      value={cardDetails.cvv} onChange={handleCardInput} maxLength="3"
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'cod' && (
                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center animate-in fade-in duration-500">
                  <p className="text-sm font-bold text-orange-800">cash payment at doorstep! No ID required for COD. 🚚</p>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-black text-gray-800 mb-4 uppercase tracking-tight">3. Service Feedback</h2>
            <div className="space-y-4">
              <textarea 
                className="w-full p-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-green-500 transition text-sm bg-gray-50/50"
                placeholder="Share your thoughts about W2W..."
                rows="3"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              />
              <button onClick={handleReviewSubmit} className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95">
                Submit Review ⭐
              </button>
              {reviewSubmitted && <p className="text-green-600 text-sm font-black mt-2">Thanks for your feedback! ✅</p>}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 sticky top-10">
            <h3 className="font-black text-xl mb-6 uppercase tracking-tight text-gray-800 italic">Order Summary</h3>
            <div className="space-y-3 pb-6 border-b-2 border-dashed border-gray-100">
              <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-tighter">
                <span className="truncate max-w-[150px]">{finalDescription}</span>
                <span>INR {finalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-500">
                <span>Shipping Fee:</span>
                <span className="text-green-600 font-black tracking-widest">FREE</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-black text-red-600 pt-6 italic">
                <span>Total:</span>
                <span>INR {finalAmount.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleOrderNow}
              disabled={isProcessing}
              className="mt-8 w-full bg-orange-500 hover:bg-gray-950 disabled:bg-gray-400 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
            >
              {isProcessing ? "Processing..." : "Confirm Order ⚡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;