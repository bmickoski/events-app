import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbuser:dbpassword@cluster0.8fs6ret.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const res = await db.collection(collection).insertOne(document);

  return res;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
