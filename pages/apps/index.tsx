import React, { useEffect, useState } from 'react';
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import SmallApp from "../../components/SmallApp"
import { Navbar } from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import MApp from '../../components/MobileApp';
import { useRouter } from 'next/router';

export interface AppsProps {
  apps: MobileApp[];
}


const appsPage: React.FC<AppsProps> = ({apps}) => {
  const [filteredApps, setFilteredApps] = useState<MobileApp[]>([]);
  const [sortMethod, setSortMethod] = useState('Rating'); // Default sorting method
  const router = useRouter();
  const query = router.query.query as string;

  //handles changes
  useEffect(() => {
    //handles searches
    let updatedApps = apps;
    if (query) {
      updatedApps = updatedApps.filter((app) =>
        app.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Handle sorting
    updatedApps = sortApps(updatedApps, sortMethod);

    setFilteredApps(updatedApps);
  }, [query, apps, sortMethod]);

  //sets all searcher for apps
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredApps(apps);
    } else {
      const filtered = apps.filter((app) =>
        app.name.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
      setFilteredApps(filtered);
    }
  };
  //sets the correct sort
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortMethod(sortValue);
  };
  //sorts the apps according to filter
  const sortApps = (apps: MobileApp[], sortMethod: string) => {
    if (sortMethod === 'Rating') {
      return apps.slice().sort((a, b) => b.rating.valueOf() - a.rating.valueOf());
    } else if (sortMethod === 'Popularity') {
      return apps.slice().sort((a, b) => b.popularity.valueOf() - a.popularity.valueOf());
    } else if (sortMethod === 'Alphabetically') {
      return apps.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    return apps;
  };
  //graphical representation of page
  return (
    <>
      <Navbar />
      <h1 className="font-bold text-xl">Apps Page</h1>
      {/* Render the filtered apps */}
      {/* ... rest of the component */}
      {filteredApps.map((app) => {
        // ... render the app
      })}
      {/* ... */}      {/* Render the filtered apps */}
      <label htmlFor="sort">Sort by:</label> 
      <select name="sort" id="sort" onChange={handleSortChange}>
        <option value="Rating">Rating</option>
        <option value="Popularity">Popularity</option>
        <option value="Alphabetically">Alphabetically</option>
      </select>
      <div className="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-5">
      {filteredApps.map((app) => {
        return(
          <div key={app._id}>
            <MApp app = {app}/>
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

    const apps = await db.collection("Apps").find().toArray();
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
