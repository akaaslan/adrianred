import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // First 3 team members from TeamPage
  const teamMembers = [
    {
      id: 1,
      name: 'Gökhan Özdemir',
      role: 'Project Manager',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHpBWY8zY8nNA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1691755247673?e=1739404800&v=beta&t=nZmHpkO7qP_1YjUNhUPRgLQqaZJGxqY8nVFqPOcLbuc',
      backgroundColor: 'bg-yellow-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'GitHub Copilot',
      role: 'Full Stack Developer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      backgroundColor: 'bg-gray-200',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Kaan Aslan',
      role: 'UI/UX Designer',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      backgroundColor: 'bg-blue-500',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  const stats = [
    { number: '15K', label: 'Happy Customers' },
    { number: '150K', label: 'Monthly Visitors' },
    { number: '15', label: 'Countries Worldwide' },
    { number: '100+', label: 'Top Partners' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900">About</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div 
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Content */}
            <div 
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="mb-4">
                <span className="text-gray-500 text-sm font-medium tracking-wide uppercase">About Company</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                ABOUT US
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We know how large objects will act,<br />
                but things on a small scale
              </p>
              <button className="bg-blue-500 text-white px-8 py-3 rounded font-medium hover:bg-blue-600 transition-colors">
                Get Quote Now
              </button>
            </div>

            {/* Right Side - Image */}
            <div 
              className={`relative transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-200 rounded-full opacity-30"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-40"></div>
                <div className="absolute top-1/2 -right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-50"></div>
                
                {/* Main image */}
                <div className="relative bg-pink-100 rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/about-hero/600/500"
                    alt="About us"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div 
        className={`py-16 bg-white transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">Problems trying</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <h2 className="text-2xl font-bold text-gray-900">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        className={`py-16 bg-white transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div 
        className={`py-16 bg-white transition-all duration-1000 delay-1100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://picsum.photos/seed/video-bg/800/400"
              alt="Video background"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <button className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors group">
                <svg className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div 
        className={`py-16 bg-white transition-all duration-1000 delay-1300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Problems trying to resolve the conflict between<br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${1400 + index * 150}ms` }}
              >
                {/* Member Image */}
                <div className={`relative ${member.backgroundColor} rounded-lg overflow-hidden mb-6 aspect-square`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=random`;
                    }}
                  />
                  
                  {/* Social Media Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={member.social.facebook}
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a
                        href={member.social.instagram}
                        className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001z"/>
                        </svg>
                      </a>
                      <a
                        href={member.social.twitter}
                        className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-sm font-medium mb-4">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Team Button */}
          <div className="text-center">
            <Link
              to="/team"
              className="inline-flex items-center bg-blue-500 text-white px-8 py-3 rounded font-medium hover:bg-blue-600 transition-colors group"
            >
              View Full Team
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
