// pages/api/login.js
import { MongoClient } from "mongodb";
//tests if the user is an admin
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { username} = req.body;

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db('NexuStore');
        const user = await db.collection('Users').findOne({ username });
		    
		if (user.accessLevel == 2) {
			return res.status(200).json({ success: true });
		} else {
			return res.status(401).json({ success: false, error: 'Not Mod' });
		}
    } catch (error) {
        console.error(error);
    }
}
