import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="border-b flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
        <h1 className="sm:ml-[11vw] py-6 sm:py-10 text-3xl font-bold">adrianred</h1>
        <div className="sm:mr-[10vw] flex gap-4">
          <Instagram />
          <Facebook />
          <Twitter />
        </div>
      </div>
      <main className="flex flex-col md:flex-row md:space-x-[5vw] space-y-8 md:space-y-0 justify-center items-start py-4 px-4">
        <div>
          <h2 className="text-xl font-bold"> Company Info </h2>
          <div className="flex flex-col pt-3">
            <a href="#" className="text-gray-400 font-bold">About Us</a>
            <a href="#" className="text-gray-400 font-bold">Career</a>
            <a href="#" className="text-gray-400 font-bold">We are hiring</a>
            <a href="#" className="text-gray-400 font-bold">Blog</a>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold"> Legal </h2>
          <div className="flex flex-col pt-3">
            <a href="#" className="text-gray-400 font-bold">About Us</a>
            <a href="#" className="text-gray-400 font-bold">Career</a>
            <a href="#" className="text-gray-400 font-bold">We are hiring</a>
            <a href="#" className="text-gray-400 font-bold">Blog</a>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold"> Features </h2>
          <div className="flex flex-col pt-3">
            <a href="#" className="text-gray-400 font-bold">Business Marketing</a>
            <a href="#" className="text-gray-400 font-bold">User Analytic</a>
            <a href="#" className="text-gray-400 font-bold">Live Chat</a>
            <a href="#" className="text-gray-400 font-bold">Unlimited Support</a>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold"> Resources </h2>
          <div className="flex flex-col pt-3">
            <a href="#" className="text-gray-400 font-bold">iOS & Android</a>
            <a href="#" className="text-gray-400 font-bold">Watch a Demo</a>
            <a href="#" className="text-gray-400 font-bold">Customers</a>
            <a href="#" className="text-gray-400 font-bold">API</a>
          </div>
        </div>
        <div className="mb-6 md:mb-10 w-full max-w-xs">
          <h2 className="text-xl font-bold"> Get In Touch </h2>
          <form className="flex flex-col sm:flex-row gap-2 mt-2">
            <input type="text" placeholder="Your email address" className="border border-gray-300 rounded-md p-2 flex-1" />
            <input type="button" value="Subscribe" className="bg-blue-500 text-white rounded-md p-2 w-full sm:w-auto" />
          </form>
          <div className="text-gray-400 text-xs mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
      </main>
      <div className="text-left py-4 text-gray-300 text-sm sm:ml-[11vw] font-semibold px-4">
        This site actually has no rights to reserve but I will do that anyways, © 2023 Adrian Red. All rights reserved.
      </div>
    </footer>
  );
}