
import bgImage from '../assets/background.png';

import { useHistory } from 'react-router-dom';

export default function HomePage() {
  const history = useHistory();

  return (
    <main
      className="w-full h-screen flex items-center justify-start relative"
      style={{
        backgroundImage: `url(${bgImage})`,
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
        <button
          className="bg-blue-500 text-white font-bold px-6 py-3 rounded hover:bg-blue-600 transition"
          onClick={() => history.push('/product')}
        >
          SHOP NOW
        </button>
      </div>
    </main>
  );
}
