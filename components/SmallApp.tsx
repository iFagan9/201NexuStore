import { MobileApp } from "./MobileApp";
import { MAppProps } from "./MobileApp";
import Link from "next/link";
    //small graphical representation of app
const SmallApp: React.FC<MAppProps> = ({app}) => {
    return (
        <div className="overflow-hidden shadow-lg rounded-lg">
          <img src={app.image} className="w-full"/>
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

export default SmallApp