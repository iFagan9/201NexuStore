import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

export const Navbar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');



    return (
        <>
        <nav className="flex items-center flex-wrap bg-slate-700 p-3 w-screen opacity-90">
        <a href="/">
            <h1 className='text-white text-xl font-bold'>NexuStore</h1>
        </a>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto pr-3">
            <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                <a href="/" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Home
                </a>
                <a href="/apps" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Apps
                </a>
                <a href="/develop" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Develop
                </a>
                <a href="/submissions" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Submissions
                </a>
                <a href="/signup" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                        Sign Up / Login
                </a>
                <a href="/profile" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                        Profile
                </a>
                <a href="/help" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                        Help
                </a>
                <SearchBar onSearch={() => {}} /> {/* onSearch prop is no longer needed */}
                </div>
            </div>
        </nav>
        </>
    )
}