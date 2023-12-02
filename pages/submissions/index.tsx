import React, { useEffect, useState } from 'react';
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import SmallApp from "../../components/SmallApp"
import { Navbar } from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import SubApp from '../../components/SubmissionApp';
import { useRouter } from 'next/router';

export interface AppsProps {
  apps: MobileApp[];
}


const submissionPage: React.FC<AppsProps> = ({apps}) => {
  
//graphical representation of page
  return (
    <>
      <Navbar />
      <h1 className="font-bold text-xl">Submissions Page</h1>
      <div className="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-5">
      {apps.map((app) => {
        return(
          <div key={app._id}>
            <SubApp app = {app}/>
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

    const apps = await db.collection("Submissions").find().toArray();
    return {
      props: {
        apps: JSON.parse(JSON.stringify(apps))
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default submissionPage;
