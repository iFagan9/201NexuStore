import Link from "next/link";
import MobileApp from '/components/MobileApp';

export interface MAppProps {
    app: MobileApp;
}

const SubApp: React.FC<MAppProps> = ({app}) => {
    return (
        <div className="overflow-hidden shadow-lg rounded-lg">
          <img src={app.image} alt="App Image" className="w-full rounded-lg"/>
          <div className="px-6 py-4">
            <Link href={`/submissions/${app._id}`}>
                <p className="font-bold text-xl mb-0 underline">{app.name}</p>
            </Link>
            <p className="font-bold text-m mb-2">{app.developer}</p>
            <p className="text-gray-700 text-base">{app.description}</p>
            <p className="font-bold text-yellow-500">{app.rating}</p>
        </div>
        </div>
    )

}


export default SubApp;