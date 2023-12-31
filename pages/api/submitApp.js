import clientPromise from "../../lib/mongodb";
//submits app request to the database
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const {name, developer, image, rating, description, comments, platforms, popularity} = req.body;
    const client = await clientPromise;
    const db = client.db('NexuStore');
    
    await db.collection('Submissions').insertOne({name, developer, image, rating, description, comments, platforms, popularity});
    res.status(201).json({message: 'App Submitted Successfully'});
}