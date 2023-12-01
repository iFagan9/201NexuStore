import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const {name, developer, image, rating, description, comments, platforms} = req.body;
    const client = await clientPromise;
    const db = client.db('NexuStore');
    
    await db.collection('Submissions').insertOne({name, developer, image, rating, description, comments, platforms});
    res.status(201).json({message: 'App Submitted Successfully'});
}