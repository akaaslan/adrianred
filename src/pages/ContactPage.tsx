import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contactbg from '../assets/contactbg.jpg';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const offices = [
    {
      city: 'Paris',
      address: '1901 Thorn ridge Cir.',
      zipCode: '75000 Paris',
      phone: '+33 1 23 45 67',
      fax: '+33 1 23 45 68'
    },
    {
      city: 'New York',
      address: '2715 Ash Dr. San Jose,',
      zipCode: '75000 Paris',
      phone: '+1 (415) 555-0132',
      fax: '+33 1 23 45 68'
    },
    {
      city: 'Berlin',
      address: '4140 Parker Rd.',
      zipCode: '75000 Paris',
      phone: '+49 30 901820',
      fax: '+33 1 23 45 68'
    },
    {
      city: 'London',
      address: '3517 W. Gray St. Utica,',
      zipCode: '75000 Paris',
      phone: '+44 20 7946 0958',
      fax: '+33 1 23 45 68'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900">Contact</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div 
        className={`relative bg-gradient-to-r from-teal-500 to-cyan-500 min-h-screen flex items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={contactbg}
            alt="Contact background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Left vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Contact Form */}
            <div 
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-6">CONTACT US</h1>
                <p className="text-white/90 text-sm leading-relaxed mb-8">
                  Problems trying to resolve the conflict between<br />
                  the two major realms of Classical physics:<br />
                  Newtonian mechanics
                </p>
                <button className="bg-blue-500 text-white px-8 py-3 rounded font-medium hover:bg-blue-600 transition-colors">
                  CONTACT US
                </button>
              </div>
            </div>

            {/* Right Side - Office Locations */}
            <div 
              className={`space-y-6 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {offices.map((office, index) => (
                  <div
                    key={office.city}
                    className={`group bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-white ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {office.city}
                      </h3>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">{office.address}</p>
                          <p className="text-blue-600 font-semibold">{office.zipCode}</p>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <span className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">{office.phone}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                            </svg>
                          </div>
                          <span className="text-gray-600">{office.fax}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Map Section */}
      <div 
        className={`h-96 bg-gray-300 transition-all duration-1000 delay-1500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="text-lg font-medium">Interactive Map</p>
            <p className="text-sm opacity-80">Map integration would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
