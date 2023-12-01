import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const {name, developer, image, rating, description, comments, platforms} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');
        
        await db.collection('Apps').insertOne({name, developer, image, rating, description, comments, platforms});
        res.status(201).json({message: 'App Acceptance Successfully'});
    } else if (req.method === 'DELETE') {
        const {id} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');

        await db.collection('Submissions').deleteOne({_id: id});
        res.status(201).json({message: 'App Deletion Success'})


    }
}