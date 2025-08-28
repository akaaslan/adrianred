import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
  const history = useHistory();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => setShowAnimation(true), 100);
    
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      history.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Animated Success Card */}
        <div className={`bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-1000 ${
          showAnimation ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
        }`}>
          
          {/* Animated Check Icon */}
          <div className="relative mb-6">
            <div className={`w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center transform transition-all duration-1000 delay-300 ${
              showAnimation ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <CheckCircle className={`w-12 h-12 text-green-600 transform transition-all duration-700 delay-600 ${
                showAnimation ? 'scale-100' : 'scale-0'
              }`} />
            </div>
            
            {/* Pulsing Animation */}
            <div className={`absolute inset-0 w-24 h-24 mx-auto rounded-full bg-green-200 animate-ping transition-opacity duration-1000 delay-500 ${
              showAnimation ? 'opacity-75' : 'opacity-0'
            }`}></div>
          </div>

          {/* Success Text */}
          <div className={`transform transition-all duration-1000 delay-700 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Tebrikler!
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Siparişiniz Başarıyla Oluşturuldu
            </p>
            <p className="text-gray-600 mb-8">
              Siparişiniz en kısa sürede hazırlanacak ve size ulaştırılacaktır.
            </p>
          </div>

          {/* Order Info */}
          <div className={`bg-gray-50 rounded-lg p-4 mb-6 transform transition-all duration-1000 delay-900 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Package className="w-5 h-5" />
              <span className="text-sm">Sipariş Numarası: #{Math.floor(Math.random() * 100000)}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleDateString('tr-TR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`space-y-3 transform transition-all duration-1000 delay-1100 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Link
              to="/"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Anasayfaya Dön
            </Link>
            
            <Link
              to="/shop"
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Alışverişe Devam Et
            </Link>
          </div>

          {/* Auto Redirect Info */}
          <div className={`mt-6 text-xs text-gray-500 transform transition-all duration-1000 delay-1300 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            10 saniye sonra otomatik olarak anasayfaya yönlendirileceksiniz...
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-green-400 rounded-full animate-bounce transition-opacity duration-1000 delay-${i * 100} ${
                showAnimation ? 'opacity-70' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
