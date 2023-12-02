import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
//adds comment to list of comments or changes to comment to the message "This comment has been deleted"
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {newerComment, id} = req.body;
        const client = await clientPromise;
        const db = client.db('NexuStore');
        const {ObjectId} = require('mongodb');
        
        const result = await db.collection('Apps').updateOne(
            { _id: ObjectId(id) },
            { $push: { comments: newerComment } }
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
        console.log(req.body);

        const result = await db.collection('Apps').updateOne(
            {_id: ObjectId(id), comments: comment},
            {$set: {'comments.$': 'This comment has been deleted'}},
        );

        if (result.matchedCount === 0) {
            console.log('No document matched the filter criteria. Comment not found.');
        } else if (result.modifiedCount === 0) {
            console.log('Document matched the filter criteria, but comment was not replaced.');
        } else {
            console.log('Comment replaced successfully.');
        }

        if (!result.value) {
            return res.status(404).json({ message: 'Document not found'});
        }

        res.status(201).json({message: 'Removed Comment Successfully'});
    }
}