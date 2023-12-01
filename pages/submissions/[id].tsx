import React, { useState } from 'react';
import { useRouter } from "next/router";
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import { GetStaticProps, GetStaticPaths } from "next";
import { Navbar } from '../../components/Navbar';
import { ObjectId } from 'mongodb';

type Props = {
	app: MobileApp;
}

function SubAppDetailsPage({ app }: { app: MobileApp }) {
    const id = app._id;
    const name = app.name;
    const developer = app.developer;
    const image = app.image;
    const rating = app.rating;
    const description = app.description;
    const platforms = app.platforms;
    const comments = app.comments;
    const [error, setError] = useState('');
    const router = useRouter();

	const handleAccept = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api/acceptrejectapp', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, developer, image, rating, description, comments, platforms})
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Failed to Add app to database")
            } else {
                alert("Added app to database");
            }
        } catch (error) {
            console.error('submission failed', error);
            setError('An Unexpected Error Occured');
        }

        try {
            const response = await fetch('/api/acceptrejectapp', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Failed to remove app from database");
            } else {
                alert("removed app from database");
                router.push('/submissions');
            }
        } catch (error) {
            console.error('submission failed', error);
            setError('An Unexpected Error Occured');
        }
        
    };
    
    const handleReject = async (event) => {
        try {
            const response = await fetch('/api/acceptrejectapp', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                console.log(errorData.message);
                //console.log(id);
                //console.log(name);
                alert("Failed to remove app from database")
            } else {
                alert("romoved app from database");
                router.push('/submissions');
            }
        } catch (error) {
            console.error('submission failed', error);
            setError('An Unexpected Error Occured');
        }
    };

	return (
		<>
			<div className='fixed'>
				<Navbar />
			</div>
			<div className='overflow-hidden rounded-lg text-left' style={{ marginLeft: '65px' }}>
				<div className='flex'>
					<div className='w-3/4 p-4' style={{ marginTop: '80px' }}>
						<p style={{ fontSize: '75px' }}>{app.name}</p>
						<p style={{ fontSize: '20px' }}>{app.developer}</p>
						<p>
							{Number(app.rating).toFixed(1)}
							<span role='img' aria-label='star'>⭐</span>
						</p>
					</div>
					<div className='w-3/4' style={{ marginRight: '70px' }}>
						<img src={app.image} className='mx-auto rounded-lg' style={{ width: '250px', height: '250px', marginTop: '70px' }} />
					</div>
				</div>
			</div>
			<div className='overflow-hidden rounded-lg text-left' style={{ marginTop: '30px', marginLeft: '80px' }}>
				<p style={{ fontSize: '30px' }}>About this app:</p>
				<p style={{ fontSize: '20px' }}>{app.description}</p>
			</div>
            <div className='mt-5'>
                <button onClick={handleAccept} className='bg-green-500 px-4 text-center justify-center items-center ml-20'>Accept</button>
                <button onClick={handleReject} className='bg-red-500 px-4 text-center justify-center items-center ml-5'>Deny</button>
            </div>
		</>
	);
}

export async function getStaticPaths() {
	const client = await clientPromise;
	const db = client.db("NexuStore");

	const apps = await db.collection("Submissions").find({}).toArray();

	const paths = apps.map((app) => ({
		params: { id: app._id.toString() },
	}));

	return {
		paths,
		fallback: true,
	};
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
	if (!params?.id) {
		return {
			notFound: true,
		};
	}

	const id = params.id as string;

	const client = await clientPromise;
	const db = client.db("NexuStore");

	const app = await db.collection("Submissions").findOne({ _id: new ObjectId(id) });

	if (!app) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			app: JSON.parse(JSON.stringify(app)),
		},
	};
}

export default SubAppDetailsPage