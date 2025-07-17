import React from 'react';
import Slider, { type CustomArrowProps } from 'react-slick';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bgImages = [
  'https://picsum.photos/id/190/1920/1080',
  'https://picsum.photos/id/10/1920/1080',
];

const NextArrow = (props: CustomArrowProps) => (
  <button
    {...props}
    className="slick-arrow slick-next !right-2 !z-10 bg-white bg-opacity-30 hover:bg-blue-600 hover:bg-opacity-80 text-blue-600 hover:text-white rounded-full shadow-lg p-3 flex items-center justify-center border-2 border-blue-600 transition-all duration-200"
    style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48 }}
    aria-label="Next"
  >
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

const PrevArrow = (props: CustomArrowProps) => (
  <button
    {...props}
    className="slick-arrow slick-prev !left-6 !z-10 bg-white bg-opacity-30 hover:bg-blue-600 hover:bg-opacity-80 text-blue-600 hover:text-white rounded-full shadow-lg p-3 flex items-center justify-center border-2 border-blue-600 transition-all duration-200"
    style={{ ...props.style, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48 }}
    aria-label="Previous"
  >
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="15 6 9 12 15 18" />
    </svg>
  </button>
);

const HeroCarousel: React.FC = () => (
  <div className="w-full h-screen relative">
    <Slider
      dots={false}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      arrows={true}
      autoplay={true}
      autoplaySpeed={3000}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      
      className="h-screen"
    >
      {bgImages.map((img, idx) => (
        <div key={idx} className="w-full h-screen relative">
          <div
            className="w-full h-screen flex items-center justify-start relative"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: '60% center',
              backgroundRepeat: 'no-repeat',
            }}
            role="main"
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 z-0" />
            <div className="relative z-10 flex flex-col justify-center items-center px-8 py-12 md:py-0 md:pl-16 max-w-xl text-center">
              <h2 className="text-lg font-bold text-white mb-2">Summer 2020</h2>
              <h1 className="text-5xl font-semibold text-white mb-4">Vita Classic Product</h1>
              <p className="text-white mb-6">We know how large objects will act, but things on a small scale</p>
              <div className="mt-6 flex">
                  <span className='text-white text-2xl mr-[1vw] mt-2 font-bold'>$16.48</span>
              <button
                className="bg-green-500 text-white font-bold px-6 py-3 rounded hover:bg-blue-600 transition"
                onClick={() => {}}
              >
                Add To Cart
              </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

export default HeroCarousel;
