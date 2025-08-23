import { useEffect, useState } from 'react';
import { XCircle, RefreshCw, MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';



const PaymentFailure = ({
  errorCode = "CARD_DECLINED",
  errorMessage = "Your card was declined. Please try a different payment method or contact your bank.",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [iconScale, setIconScale] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIconScale(1), 300);
    return () => clearTimeout(timer);
  }, []);

  const getErrorTitle = (code) => {
    switch (code) {
      case 'CARD_DECLINED':
        return 'Card Declined';
      case 'INSUFFICIENT_FUNDS':
        return 'Insufficient Funds';
      case 'NETWORK_ERROR':
        return 'Connection Error';
      default:
        return 'Payment Failed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-4">
      <div className={`max-w-md w-full bg-text rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>

        {/* Error Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle
              className={`text-red-600 transition-transform duration-500 ease-out ${iconScale ? 'scale-100' : 'scale-0'
                }`}
              size={48}
            />
          </div>
          <h1 className="text-2xl font-bold text-text-900 mb-2">{getErrorTitle(errorCode)}</h1>
          <p className="text-text-600">{errorMessage}</p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-red-600 font-medium">Error Code:</span>
            <span className="font-mono text-red-800">{errorCode}</span>
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What you can try:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your card details are correct</li>
            <li>• Ensure you have sufficient funds</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank if the issue persists</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/payments")}
              className="flex-1 bg-text-100 hover:bg-text-200 text-text-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t border-text-100">
          <p className="text-xs text-text-500">
            Need help? Contact our support team 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;