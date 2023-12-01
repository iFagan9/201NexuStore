import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const {name, developer, image, rating, description, comments, platforms, popularity} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');
        
        await db.collection('Apps').insertOne({name, developer, image, rating, description, comments, platforms, popularity});
        res.status(201).json({message: 'App Acceptance Successfully'});
    } else if (req.method === 'DELETE') {
        const { ObjectId } = require('mongodb');
        const {id} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ObjectId format' });
        }

        const result = await db.collection('Submissions').findOneAndDelete({ _id: ObjectId(id) });

        if (!result.value) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.status(201).json({ message: 'App Deletion Success' });


    }
}