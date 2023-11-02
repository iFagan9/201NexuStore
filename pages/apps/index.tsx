import React from 'react';
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import SmallApp from "../../components/SmallApp"
import { Navbar } from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';


export interface AppsProps {
  apps: MobileApp[];
}

const handleSearch = (query: string) => {
  // Implement your search logic here and update filteredApps state
  const filtered = apps.filter((apps) =>  
  apps.name.toLowerCase().includes(query.toLowerCase())
  );
    setFilteredApps(filtered);
  };

const appsPage: React.FC<AppsProps> = ({apps}) => {
  return (
    <>
      <Navbar />
      <h1 className="font-bold text-xl">Apps Page</h1>
      <SearchBar onSearch={handleSearch} /> {/* Include the SearchBar */}
      {/* Render the filtered apps */}
      <label htmlFor="sort">Sort by:</label> 
      <select name="sort" id="sort"> 
        <option value="Rating">Rating</option> 
        <option value="Popularity">Popularity</option> 
        <option value="Alphabetically">Alphabetically</option> 
      </select>
      <div className="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-5">
      {apps.map((app) => {
        return(
          <div key={app.id}>
            <SmallApp app = {app}/>
          </div>
        )
      })}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("Apps").find({name: {$regex: /test/i }}).sort({name: -1}).toArray();
    return {
      props: {
        apps: JSON.parse(JSON.stringify(apps))
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default appsPage;
