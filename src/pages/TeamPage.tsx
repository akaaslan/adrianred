import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TeamPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: 'Gökhan Özdemir',
      role: 'Project Manager',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHpBWY8zY8nNA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1691755247673?e=1739404800&v=beta&t=nZmHpkO7qP_1YjUNhUPRgLQqaZJGxqY8nVFqPOcLbuc',
      backgroundColor: 'bg-blue-400',
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
      backgroundColor: 'bg-green-400',
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
      backgroundColor: 'bg-yellow-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'Michael Chen',
      role: 'Frontend Developer',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      backgroundColor: 'bg-blue-500',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 5,
      name: 'Emily Rodriguez',
      role: 'Backend Developer',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      backgroundColor: 'bg-pink-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'DevOps Engineer',
      image: 'https://randomuser.me/api/portraits/men/51.jpg',
      backgroundColor: 'bg-orange-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 7,
      name: 'Lisa Wang',
      role: 'QA Engineer',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      backgroundColor: 'bg-purple-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 8,
      name: 'Alex Thompson',
      role: 'Product Designer',
      image: 'https://randomuser.me/api/portraits/women/71.jpg',
      backgroundColor: 'bg-indigo-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    },
    {
      id: 9,
      name: 'James Wilson',
      role: 'Marketing Specialist',
      image: 'https://randomuser.me/api/portraits/men/56.jpg',
      backgroundColor: 'bg-cyan-400',
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-gray-900">Team</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div 
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <span className="text-gray-500 text-sm font-medium tracking-wide uppercase">What we do</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Innovation tailored for you
          </h1>
          <div className="mb-12">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">Home</Link>
            <span className="text-gray-400 mx-2">&gt;</span>
            <span className="text-gray-900 text-sm">Team</span>
          </div>
        </div>

        {/* Hero Image Grid */}
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64 md:h-80">
            {/* Large left image */}
            <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg group">
              <img
                src="https://picsum.photos/seed/team-hero-1/600/600"
                alt="Team collaboration"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-red-500 bg-opacity-20"></div>
            </div>
            
            {/* Top right images */}
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="https://picsum.photos/seed/team-hero-2/300/300"
                alt="Team member"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20"></div>
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="https://picsum.photos/seed/team-hero-3/300/300"
                alt="Team member"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cyan-400 bg-opacity-20"></div>
            </div>
            
            {/* Bottom right images */}
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="https://picsum.photos/seed/team-hero-4/300/300"
                alt="Team member"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-purple-500 bg-opacity-20"></div>
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="https://picsum.photos/seed/team-hero-5/300/300"
                alt="Team member"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-green-500 bg-opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
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
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.533l1.089-.893c.542.669 1.365 1.097 2.116 1.097 1.346 0 2.438-1.091 2.438-2.438 0-1.346-1.091-2.438-2.438-2.438-.669 0-1.273.271-1.712.708l-.708-.708C6.571 9.241 7.464 8.55 8.449 8.55c2.156 0 3.9 1.744 3.9 3.9s-1.744 3.9-3.9 3.9z"/>
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
                  <p className="text-gray-600 text-sm font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className={`py-16 bg-gray-50 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start your 14 days free trial</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mb-8">
            Try it free now
          </button>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001z"/>
              </svg>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
