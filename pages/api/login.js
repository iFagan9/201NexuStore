// pages/api/login.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { username, password } = req.body;

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db('NexuStore');
        const user = await db.collection('Users').findOne({ username });
		    
		if (user && user.password === password) {
			return res.status(200).json({ success: true });
		} else {
			return res.status(401).json({ success: false, error: 'Invalid username or password' });
		}
    } catch (error) {
        console.error(error);
    }
}
