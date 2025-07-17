export default function EditorsPick() {
  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-tight">EDITOR’S PICK</h2>
        <p className="text-gray-500">Problems trying to resolve the conflict between</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
        {/* Left large image */}
        <div className="flex-1 flex flex-col">
          <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Men" className="object-cover w-full h-full" />
            <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow">MEN</span>
          </div>
        </div>
        {/* Right grid */}
        <div className="flex-[1.2] grid grid-cols-2 grid-rows-2 gap-6 min-w-[300px]">
          <div className="relative h-[190px] w-full overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Women" className="object-cover w-full h-full" />
            <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow">WOMEN</span>
          </div>
          <div className="relative h-[190px] w-full overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" alt="Accessories" className="object-cover w-full h-full" />
            <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow">ACCESSORIES</span>
          </div>
          <div className="relative h-[190px] w-full overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80" alt="Kids" className="object-cover w-full h-full" />
            <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow">KIDS</span>
          </div>
          <div className="relative h-[190px] w-full overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" alt="Accessories" className="object-cover w-full h-full" />
            <span className="absolute bottom-6 left-6 bg-white px-6 py-2 font-bold text-lg rounded shadow">ACCESSORIES</span>
          </div>
        </div>
      </div>
    </section>
  );
}