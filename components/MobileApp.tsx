import { Double, ObjectId } from "mongodb";
import Link from "next/link";
import React, { useState } from 'react';

export interface MobileApp {
    //attributes for mobile apps
    _id: string;
    name: string;
    developer: string;
    image: string;
    reviews: number;
    ratingTotal: number;
    rating: number;
    popularity: number;
    description: string;
    comments: string[];
    platforms: string[];
}

export interface MAppProps {
    app: MobileApp;
}
//graphical representation of a mobile app
const MApp: React.FC<MAppProps> = ({app}) => {
    return (
        <div className="overflow-hidden shadow-lg rounded-lg">
          <img src={app.image} alt="App Image" className="w-full rounded-lg"/>
          <div className="px-6 py-4">
            <Link href={`/app/${app._id}`}>
                <p className="font-bold text-xl mb-0 underline">{app.name}</p>
            </Link>
            <p className="font-bold text-m mb-2">{app.developer}</p>
            <p className="text-gray-700 text-base">{app.description}</p>
            <p className="font-bold text-yellow-500">{app.rating}</p>
        </div>
        </div>
    )

}


export default MApp;

