import React, { useState } from 'react';
import clientPromise from "../lib/mongodb";
import { MobileApp } from "../components/MobileApp";
import MApp from '../components/MobileApp';
import { Navbar } from '../components/Navbar';
import SearchBar from '../components/SearchBar';


export interface HomeProps {
  apps: MobileApp[];
}

const Home: React.FC<HomeProps> = ({apps}) => {
const [searchResults, setSearchResults] = useState<MobileApp[]>(apps); // Initialize with apps

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(apps);
    } else {
      const filtered = apps.filter((app) =>
        app.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <>
      <div className="fixed">
        <Navbar  />
      </div>
      <div className="h-screen bg-slate-900 flex items-center justify-center flex-col">
        <h1 className="font-bold text-9xl text-center text-white">NexuStore</h1>
      </div>
      <div className="bg-slate-300">
        <div className="w-full float-root">
          <h1 className="underline font-bold text-2xl float-left pl-2">Popular:</h1>
          <a href="apps" className="font-bold text-5xl float-right pr-2 -mt-3">&#187;</a>
        </div>
        <div className="p-10 pt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 w-full">
        {apps.map((app) => { // Use searchResults here instead of apps
          return(
            <div key={app._id}>
              <MApp app = {app}/>
            </div>
          )
        })}
        </div>
      </div>
      
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("Apps").find().limit(3).sort({rating: -1}).toArray();
    return {
      props: {
        apps: JSON.parse(JSON.stringify(apps))
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Home;
