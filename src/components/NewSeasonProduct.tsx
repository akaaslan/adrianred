import cover1 from "../assets/hero-cover-1.png"
export default function NewSeasonProduct() {
    return (
        <div className="flex">
            <img src={cover1} alt="New Season Product" className="ml-[10vw]" />
            <div className="flex flex-col justify-center items-start ml-8">
                <h2 className="text-xl font-normal mb-2 text-gray-400">SUMMER 2025</h2>
                <h1 className="text-4xl font-bold mb-4">Part of the Neural Universe</h1>
                <div>
                <p className="text-gray-600 mb-4">Discover the latest trends and styles for the new season.</p>
                <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                    BUY NOW
                </button>
                <button className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded hover:bg-green-700 hover:text-white hover:border-green-700 transition ml-5">
                    READ MORE
                </button>
                </div> 
            </div>
        </div>
    )
}