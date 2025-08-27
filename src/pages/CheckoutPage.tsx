import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, Plus, Edit, Trash2, Phone, Home, User } from 'lucide-react';
import { toast } from 'react-toastify';
import type { RootState } from '../store';

interface Address {
  id?: number;
  title: string;
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  address?: string;
}

interface Card {
  id?: number;
  card_no: string;
  expire_month: number;
  expire_year: number;
  name_on_card: string;
}

interface AddressFormData {
  title: string;
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
}

interface CardFormData {
  card_no: string;
  expire_month: number;
  expire_year: number;
  name_on_card: string;
}

const CheckoutPage: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<number | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<AddressFormData>({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });

  const [cardFormData, setCardFormData] = useState<CardFormData>({
    card_no: '',
    expire_month: 1,
    expire_year: new Date().getFullYear(),
    name_on_card: ''
  });

  // Turkish cities for dropdown
  const turkishCities = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
    'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan',
    'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay', 'Isparta',
    'İçel', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla',
    'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
    'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van',
    'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
    'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ];

  // Calculate totals for selected items
  const selectedItems = cart.filter(item => item.checked);
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  useEffect(() => {
    const loadData = async () => {
      await fetchAddresses();
      await fetchCards();
    };
    loadData();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('token') || '';
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/user/address', {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Adresler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch('/user/card', {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      } else {
        console.error('Failed to fetch cards');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Kartlar yüklenirken hata oluştu');
    }
  };

  const handleSubmitCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const method = editingCard ? 'PUT' : 'POST';
      const payload = editingCard 
        ? { id: editingCard.id, ...cardFormData }
        : cardFormData;

      const response = await fetch('/user/card', {
        method,
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingCard ? 'Kart güncellendi' : 'Kart eklendi');
        setShowCardForm(false);
        setEditingCard(null);
        setCardFormData({
          card_no: '', expire_month: 1, expire_year: new Date().getFullYear(), name_on_card: ''
        });
        fetchCards();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error(`Kart kaydedilirken hata oluştu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    if (!window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/user/card/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        }
      });

      if (response.ok) {
        toast.success('Kart silindi');
        fetchCards();
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Kart silinirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setCardFormData({
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
      name_on_card: card.name_on_card
    });
    setShowCardForm(true);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    return 'unknown';
  };

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const method = editingAddress ? 'PUT' : 'POST';
      
      // Transform formData to match API structure
      const apiPayload = {
        title: formData.title,
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone,
        city: formData.city,
        district: formData.district,
        neighborhood: formData.neighborhood,
        address: formData.address
      };
      
      const payload = editingAddress 
        ? { id: editingAddress.id, ...apiPayload }
        : apiPayload;

      const response = await fetch('/user/address', {
        method,
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(editingAddress ? 'Adres güncellendi' : 'Adres eklendi');
        setShowAddressForm(false);
        setEditingAddress(null);
        setFormData({
          title: '', name: '', surname: '', phone: '',
          city: '', district: '', neighborhood: '', address: ''
        });
        fetchAddresses();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error(`Adres kaydedilirken hata oluştu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/user/address/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        }
      });

      if (response.ok) {
        toast.success('Adres silindi');
        fetchAddresses();
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Adres silinirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address: address.address || ''
    });
    setShowAddressForm(true);
  };

  const renderCardCard = (card: Card) => {
    const isSelected = selectedCard === card.id;
    const cardType = getCardType(card.card_no);
    const maskedCardNumber = `**** **** **** ${card.card_no.slice(-4)}`;

    return (
      <div
        key={card.id}
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setSelectedCard(card.id || null)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-5 rounded ${
              cardType === 'visa' ? 'bg-blue-600' : 'bg-red-500'
            } flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">
                {cardType === 'visa' ? 'VISA' : 'MC'}
              </span>
            </div>
            <span className="font-mono text-sm">{maskedCardNumber}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditCard(card);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (card.id) handleDeleteCard(card.id);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <div>{card.name_on_card}</div>
          <div>{String(card.expire_month).padStart(2, '0')}/{card.expire_year}</div>
        </div>
      </div>
    );
  };
    const isSelected = type === 'shipping' 
      ? selectedShippingAddress === address.id
      : selectedBillingAddress === address.id;

    return (
      <div
        key={`${type}-${address.id}`}
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => {
          if (type === 'shipping') {
            setSelectedShippingAddress(address.id || null);
          } else {
            setSelectedBillingAddress(address.id || null);
          }
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-900">{address.title}</h4>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditAddress(address);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (address.id) handleDeleteAddress(address.id);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {address.name} {address.surname}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {address.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {address.neighborhood}, {address.district}, {address.city}
          </div>
          {address.address && (
            <div className="flex items-start gap-2">
              <Home className="w-4 h-4 mt-0.5" />
              {address.address}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sepetinizde Ürün Bulunmuyor</h1>
            <p className="text-gray-600 mb-8">Sipariş vermek için önce sepetinize ürün eklemelisiniz.</p>
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Sepete Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Anasayfa</Link>
            <span className="text-gray-400">&gt;</span>
            <Link to="/cart" className="text-gray-500 hover:text-gray-700">Sepetim</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900">Sipariş Ver</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Sipariş Ver</h1>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className={`text-sm font-medium ${
                currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Adres Bilgileri
              </span>
              <div className={`w-16 h-0.5 ${
                currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className={`text-sm font-medium ${
                currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Ödeme Seçenekleri
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Teslimat Adresi</h2>
                    <button
                      onClick={() => {
                        setEditingAddress(null);
                        setFormData({
                          title: '', name: '', surname: '', phone: '',
                          city: '', district: '', neighborhood: '', address: ''
                        });
                        setShowAddressForm(true);
                      }}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Yeni Adres Ekle
                    </button>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Adresler yükleniyor...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => renderAddressCard(address, 'shipping'))}
                    </div>
                  )}
                </div>

                {/* Billing Address */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Fatura Adresi</h2>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBillingAddress === selectedShippingAddress}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBillingAddress(selectedShippingAddress);
                          } else {
                            setSelectedBillingAddress(null);
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Fatura adresim teslimat adresiyle aynı
                      </span>
                    </label>
                  </div>
                  
                  {selectedBillingAddress !== selectedShippingAddress && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => renderAddressCard(address, 'billing'))}
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedShippingAddress || !selectedBillingAddress}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Ödeme Seçeneklerine Geç
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Payment Methods */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Ödeme Seçenekleri</h2>
                  </div>
                  
                  {/* Payment Type Selection */}
                  <div className="mb-6">
                    <div className="border border-orange-300 bg-orange-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card-payment"
                          name="payment-type"
                          defaultChecked
                          className="mr-3"
                        />
                        <label htmlFor="card-payment" className="font-medium text-gray-900">
                          Kart ile Öde
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.
                      </p>
                    </div>
                  </div>

                  {/* Card Selection */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Kart Bilgileri</h3>
                      <button
                        onClick={() => {
                          setEditingCard(null);
                          setCardFormData({
                            card_no: '', expire_month: 1, expire_year: new Date().getFullYear(), name_on_card: ''
                          });
                          setShowCardForm(true);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Başka bir Kart ile Ödeme Yap
                      </button>
                    </div>
                    
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-2">Kartlar yükleniyor...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards.map((card) => renderCardCard(card))}
                        {cards.length === 0 && (
                          <div className="col-span-2 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500 mb-4">Henüz kayıtlı kartınız yok</p>
                            <button
                              onClick={() => {
                                setEditingCard(null);
                                setCardFormData({
                                  card_no: '', expire_month: 1, expire_year: new Date().getFullYear(), name_on_card: ''
                                });
                                setShowCardForm(true);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4 inline mr-2" />
                              Yeni Kart Ekle
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Installment Options */}
                  {selectedCard && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Taksit Seçenekleri</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-3">Kartınıza uygun taksit seçeneğini seçiniz</p>
                        <div className="space-y-2">
                          <label className="flex items-center justify-between p-3 bg-white rounded border cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center">
                              <input type="radio" name="installment" defaultChecked className="mr-3" />
                              <span className="font-medium">Tek Çekim</span>
                            </div>
                            <span className="font-semibold text-orange-600">{totalPrice.toFixed(2)} TL</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3D Secure */}
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700">
                        🔒 3D Secure ile ödemek istiyorum
                      </span>
                    </label>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Geri Dön
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedCard) {
                        toast.error('Lütfen bir kart seçin');
                        return;
                      }
                      toast.success('Sipariş başarıyla oluşturuldu!');
                    }}
                    disabled={!selectedCard}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Siparişi Tamamla
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {selectedItems.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images?.[0]?.url || `https://picsum.photos/80/80?random=${item.product.id}`}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.count} adet × {item.product.price} TL
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {(item.product.price * item.count).toFixed(2)} TL
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ürünler Toplamı:</span>
                    <span className="font-medium">{totalPrice.toFixed(2)} TL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo:</span>
                    <span className="font-medium text-green-600">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Toplam:</span>
                    <span className="text-blue-600">{totalPrice.toFixed(2)} TL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Form Modal */}
        {showCardForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingCard ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowCardForm(false);
                      setEditingCard(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitCard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Numarası *
                    </label>
                    <input
                      type="text"
                      value={formatCardNumber(cardFormData.card_no)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        if (value.length <= 16) {
                          setCardFormData({...cardFormData, card_no: value});
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      placeholder="1234 1234 1234 1234"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Üzerindeki Ad Soyad *
                    </label>
                    <input
                      type="text"
                      value={cardFormData.name_on_card}
                      onChange={(e) => setCardFormData({...cardFormData, name_on_card: e.target.value.toUpperCase()})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ALİ BAŞTÜRK"
                      style={{ textTransform: 'uppercase' }}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Son Kullanma Tarihi *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={cardFormData.expire_month}
                          onChange={(e) => setCardFormData({...cardFormData, expire_month: parseInt(e.target.value)})}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>
                              {String(month).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <select
                          value={cardFormData.expire_year}
                          onChange={(e) => setCardFormData({...cardFormData, expire_year: parseInt(e.target.value)})}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        maxLength={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        placeholder="123"
                        pattern="[0-9]{3}"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCardForm(false);
                        setEditingCard(null);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Kaydediliyor...' : editingCard ? 'Güncelle' : 'Kaydet'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddress(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitAddress} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adres Başlığı *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ev, İş, vs."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ad *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Soyad *
                      </label>
                      <input
                        type="text"
                        value={formData.surname}
                        onChange={(e) => setFormData({...formData, surname: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="05XXXXXXXXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İl *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">İl seçiniz</option>
                      {turkishCities.map((city) => (
                        <option key={city} value={city.toLowerCase()}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        İlçe *
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mahalle *
                      </label>
                      <input
                        type="text"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adres Detayı
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Sokak, cadde, bina no, daire no, vs."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Kaydediliyor...' : editingAddress ? 'Güncelle' : 'Kaydet'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
