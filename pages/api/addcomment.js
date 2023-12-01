import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const {newComment} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');
        
        await db.collection('Apps').updateOne(
            { _id: new ObjectId(app._id) },
            { $set: { comments: newComment } }
        );
        res.status(201).json({message: 'App Acceptance Successfully'});
    }
}