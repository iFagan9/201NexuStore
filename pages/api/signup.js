// pages/api/signup.js
import bcrypt from 'bcryptjs';
import clientPromise from '../../lib/mongodb';
//checks if username is taken and adds the new user to database
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  const client = await clientPromise;
  const db = client.db('NexuStore');

  const existingUser = await db.collection('Users').findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }


  await db.collection('Users').insertOne({ username, password });
  res.status(201).json({ message: 'User created successfully' });
}