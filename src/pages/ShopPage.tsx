/* eslint-disable @typescript-eslint/no-unused-vars */
// import ProductList from "../components/ProductList";

import ShopItemList from "../components/ShopItemList";

export default function ShopPage() {

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row py-10 px-[12vw] items-center justify-between w-full">
                <h1 className="text-2xl font-bold ">Shop</h1>
                <div className="flex items-center ml-auto">
                    <a href="/" className="text-lg text-black mr-1 hover:underline">Home</a>
                    <span className="text-lg text-gray-400">&gt;</span>
                    <span className="text-lg ml-1 hover:underline text-gray-400">Shop</span>
                </div>
            </div>
                <div className="flex flex-col md:flex-row w-full md:w-screen max-w-[85vw] ml-[6vw] md:ml-[7vw] md:h-[30vh] gap-4 py-4">

                    {[
                        '1025','1026','1027','1028','1029'
                    ].map((id) => (
                        <a
                          key={id}
                          href="#"
                          className="relative group w-full md:min-w-[180px] md:h-full rounded-lg shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100 overflow-hidden"
                          style={{ aspectRatio: '1/1', backgroundImage: `url(https://picsum.photos/id/${id}/400/400)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300" />
                          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
                            <span className="text-white text-xl md:text-3xl font-bold tracking-wide drop-shadow-lg">CLOTHES</span>
                            <span className="text-white text-base md:text-lg font-semibold mt-2 drop-shadow">x Items</span>
                          </div>
                        </a>
                    ))}
                </div>
                <ShopItemList />

        </div>
    )
}