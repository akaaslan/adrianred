import cover1 from "../assets/hero-cover-1.png"
export default function NewSeasonProduct() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-8">
                <img 
                    src={cover1} 
                    alt="New Season Product" 
                    className="w-full max-w-md md:w-1/2 rounded-lg shadow"
                />
                <div className="flex flex-col justify-center items-start w-full md:w-1/2">
                    <h2 className="text-lg md:text-xl font-normal mb-2 text-gray-400">SUMMER 2025</h2>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">Part of the Neural Universe</h1>
                    <div className="w-full">
                        <p className="text-gray-600 mb-4 text-base md:text-lg">Discover the latest trends and styles for the new season.</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 transition w-full sm:w-auto">
                                BUY NOW
                            </button>
                            <button className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded hover:bg-green-700 hover:text-white hover:border-green-700 transition w-full sm:w-auto">
                                READ MORE
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}