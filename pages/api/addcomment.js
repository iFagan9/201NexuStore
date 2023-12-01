import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const {newComment, id} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');
        const {ObjectId} = require('mongodb');
        
        const result = await db.collection('Apps').updateOne(
            { _id: ObjectId(id) },
            { $push: { comments: newComment } }
        );

        if (!result.value) {
            return res.status(404).json({ message: 'Document not found'});
        }

        res.status(201).json({message: 'Added Comment Successfully'});
    } else if (req.method === 'DELETE') {
        const {comment, id} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');
        const {ObjectId} = require('mongodb');

        const result = await db.collection('Apps').updateOne(
            {_id: ObjectId(id)},
            {$pull: {comments: comment}},
        );

        if (!result.value) {
            return res.status(404).json({ message: 'Document not found'});
        }

        res.status(201).json({message: 'Removed Comment Successfully'});
    }
}