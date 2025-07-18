
import bgImage from '../assets/background.png';
import Slider, { type CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EditorsPick from '../components/EditorsPick';
import FeaturedProducts from '../components/FeaturedProducts';
import NewSeasonProduct from '../components/NewSeasonProduct';
import FeaturedPosts from '../components/FeaturedPosts';

import HeroCarousel from '../components/HeroCarousel';

const NextArrow = (props: CustomArrowProps) => (
  <button
    {...props}
    className="slick-arrow slick-next !right-8 !z-10 bg-white bg-opacity-80 hover:bg-blue-500 hover:text-white text-black rounded-full shadow-lg p-2 flex items-center justify-center"
    style={{ ...props.style, display: 'block' }}
    aria-label="Next"
  >
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
  </button>
);

const PrevArrow = (props: CustomArrowProps) => (
  <button
    {...props}
    className="slick-arrow slick-prev !left-8 !z-10 bg-white bg-opacity-80 hover:bg-blue-500 hover:text-white text-black rounded-full shadow-lg p-2 flex items-center justify-center"
    style={{ ...props.style, display: 'block' }}
    aria-label="Previous"
  >
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>
  </button>
);

export default function HomePage() {
  return (
    <main>
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
          {[bgImage, 'https://picsum.photos/id/1025/1920/1080'].map((img, idx) => (
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
                  <h2 className="text-lg font-bold text-white mb-2">SUMMER 2020</h2>
                  <h1 className="text-5xl font-extrabold text-white mb-4">IT’S A SPECIAL GIFT</h1>
                  <p className="text-white mb-6">We know how large objects will act, but things on a small scale</p>
                  <a
                    href="/shop"
                    className="bg-blue-500 text-white font-bold px-6 py-3 rounded hover:bg-blue-600 transition"
                  >
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <EditorsPick/>
      <FeaturedProducts />
      <HeroCarousel />
      <NewSeasonProduct />
      <FeaturedPosts />
    </main>
  );
}
