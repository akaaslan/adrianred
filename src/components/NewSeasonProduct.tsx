import cover1 from "../assets/hero-cover-1.png"
export default function NewSeasonProduct() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start w-full px-4  mt-10 md:py-0">
            <img 
                src={cover1} 
                alt="New Season Product" 
                className="w-full max-w-full md:max-w-md md:w-auto mb-6 md:mb-0 md:ml-[10vw] rounded-lg shadow mx-auto md:mx-0"
            />
            <div className="flex flex-col justify-center items-start mt-[10vh] ml-[5vw] md:ml-8 w-full max-w-lg">
                <h2 className="text-lg md:text-xl font-normal mb-2 text-gray-400">SUMMER 2025</h2>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">Part of the Neural Universe</h1>
                <div>
                    <p className="text-gray-600 mb-4 text-base md:text-lg">Discover the latest trends and styles for the new season.</p>
                    <div className="flex flex-col w-[80vw] sm:flex-row items-center gap-4 ">
                        <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 transition w-full max-w-xs sm:w-auto sm:max-w-none sm:ml-4">
                            BUY NOW
                        </button>
                        <button className="bg-white text-green-500 border border-green-500 px-6 py-3 rounded hover:bg-green-700 hover:text-white hover:border-green-700 transition w-full max-w-xs sm:w-auto sm:max-w-none">
                            READ MORE
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    )
}