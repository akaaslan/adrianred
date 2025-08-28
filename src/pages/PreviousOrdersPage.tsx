import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp, Calendar, CreditCard, MapPin, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

interface OrderProduct {
  product_id: number;
  count: number;
  detail: string;
  product_name?: string;
  product_price?: number;
  product_image?: string;
}

interface Order {
  id: number;
  address_id: number;
  order_date: string;
  card_no: number;
  card_name: string;
  card_expire_month: number;
  card_expire_year: number;
  card_ccv: number;
  price: number;
  products: OrderProduct[];
  status?: string;
  address?: {
    title: string;
    name: string;
    surname: string;
    phone: string;
    city: string;
    district: string;
    neighborhood: string;
    address: string;
  };
}

export default function PreviousOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/order', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        let errorMessage = 'Siparişler yüklenemedi';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
        }
        
        // Detaylı hata mesajı
        const detailedError = `API Hatası (${response.status}): ${errorMessage}`;
        throw new Error(detailedError);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      
      // Detaylı hata mesajı oluştur
      let errorMessage = 'Siparişleriniz yüklenirken beklenmeyen bir hata oluştu';
      
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.';
        } else if (error.message.includes('API Hatası')) {
          errorMessage = error.message;
        } else {
          errorMessage = `Hata: ${error.message}`;
        }
      }
      
      toast.error(errorMessage, {
        position: window.innerWidth < 768 ? "top-center" : "top-right",
        autoClose: 6000
      });
      
      // Fallback to localStorage for demo
      const savedOrders = localStorage.getItem('user_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
        toast.info('Yerel kayıtlı siparişler gösteriliyor', {
          position: window.innerWidth < 768 ? "top-center" : "top-right"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId: number) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 'Onaylandı';
      case 'preparing':
        return 'Hazırlanıyor';
      case 'shipped':
        return 'Kargoda';
      case 'delivered':
        return 'Teslim Edildi';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return 'Belirsiz';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Siparişleriniz yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Anasayfa</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900">Siparişlerim</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Önceki Siparişlerim</h1>
          <p className="text-gray-600 mt-2">Geçmiş siparişlerinizi görüntüleyin ve takip edin</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto h-24 w-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Henüz Siparişiniz Yok</h2>
            <p className="text-gray-600 mb-8">İlk siparişinizi vermek için alışverişe başlayın.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Sipariş #{order.id}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.order_date).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="flex items-center">
                            <Package className="w-4 h-4 mr-1" />
                            {order.products.length} ürün
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {order.price.toFixed(2)} TL
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {expandedOrders.has(order.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrders.has(order.id) && (
                  <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Products */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2" />
                          Ürünler
                        </h4>
                        <div className="space-y-3">
                          {order.products.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={product.product_image || `https://picsum.photos/80/80?random=${product.product_id}`}
                                    alt={product.product_name || `Ürün ${product.product_id}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">
                                    {product.product_name || `Ürün ID: ${product.product_id}`}
                                  </h5>
                                  <p className="text-sm text-gray-600">{product.detail}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-600">Adet: {product.count}</span>
                                    {product.product_price && (
                                      <span className="font-semibold text-gray-900">
                                        {(product.product_price * product.count).toFixed(2)} TL
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Info */}
                      <div className="space-y-6">
                        {/* Payment Info */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Ödeme Bilgileri
                          </h4>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-5 rounded bg-blue-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">VISA</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  **** **** **** {String(order.card_no).slice(-4)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {order.card_name} - {String(order.card_expire_month).padStart(2, '0')}/{order.card_expire_year}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Info */}
                        {order.address && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <MapPin className="w-5 h-5 mr-2" />
                              Teslimat Adresi
                            </h4>
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="space-y-2">
                                <div className="font-medium text-gray-900">{order.address.title}</div>
                                <div className="text-gray-700">
                                  {order.address.name} {order.address.surname}
                                </div>
                                <div className="text-gray-600">{order.address.phone}</div>
                                <div className="text-gray-600">
                                  {order.address.neighborhood}, {order.address.district}, {order.address.city}
                                </div>
                                {order.address.address && (
                                  <div className="text-gray-600">{order.address.address}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Detayları Görüntüle
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Tekrar Sipariş Ver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
