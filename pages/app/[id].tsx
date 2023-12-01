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

function AppDetailsPage({ app }: { app: MobileApp }) {

	const [newComment, setNewComment] = useState('');
  	const router = useRouter();

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
		  handleComment();
		}
	  };
	  const handleDeleteComment = async (index: number) => {
		//If user is a moderator
		try {
			//const client = await clientPromise;
    		//const db = client.db("NexuStore");
			//const updatedComments = app.comments.filter((_, i) => i !== index);
    		//await db.collection("Apps").updateOne(
      			//{ _id: new ObjectId(app._id) },
      			//{ $set: { comments: updatedComments } }
   			// );
			
		  router.reload();
		} catch (error) {
		  console.error("Error deleting comment from the database:", error);
		}
	  };


	  const handleComment = async () => {
		if (!newComment.trim()) {
		  return; // Prevent adding empty comments
		}
	
		// Add the new comment to the list
		const updatedComments = [...app.comments, newComment];
	
		// Update the comment list in your database (if needed)
		try {
			//const client = await clientPromise;
			//const db = client.db('NexuStore');
	  
			// Add the new comment to the list in the database
			//await db.collection('Apps').updateOne(
			  //{ _id: new ObjectId(app._id) },
			  //{ $push: { comments: newComment } }
			//);

		} catch (error) {
			console.error("Error adding comment", error);
		}

		// Reload the page to reflect the changes
		router.reload();
	  };

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

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
			<div className='overflow-hidden rouned-lg text-left' style={{ marginTop: '20px', marginLeft: '80px' }}>
				<p style={{ fontSize: '30px' }}>Comments: </p>
 			 <div style={{ fontSize: '20px' }}>
    			{app.comments.map((comment, index) => (
     		 <div key={index} className="mb-2">
       		 {comment}
        	<button
        	  onClick={() => handleDeleteComment(index)}
         	 className="ml-2 text-red-500"
        	>
         	 Delete
        	</button>
      		</div>
    		))}
				</div>
				<input
        			type="text"
					value={newComment}
          			onChange={(e) => setNewComment(e.target.value)}
        			placeholder="Add Comment..."
        			onKeyPress={handleKeyPress} // Optional: Allows search on enter key press
        			className="px-2 py-1 border rounded-md"
      			/>
      			<button type="submit" onClick={handleComment} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md">
        			Submit
      			</button>
			</div>
		</>
	);
}

export async function getStaticPaths() {
	const client = await clientPromise;
	const db = client.db("NexuStore");

	const apps = await db.collection("Apps").find({}).toArray();

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

	const app = await db.collection("Apps").findOne({ _id: new ObjectId(id) });

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

export default AppDetailsPage