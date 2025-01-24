import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
const query = request.nextUrl.searchParams.get("query") 
// Replace the uri string with your connection string.
const uri = "mongodb+srv://Akshat_Arora2004:030704@mongoinventorymanagemen.yvlip.mongodb.net/";
const client = new MongoClient(uri); 
  try {
    const database = client.db('Akshat');
    const inventory = database.collection('Inventory'); 
 
    const products = await inventory.aggregate([{
        $match: {
          $or: [
            { slug: { $regex: query, $options: "i" } }, 
           ]
        }
      }
    ]).toArray()
    return NextResponse.json({ success: true, products})
  } finally {
 
    await client.close();
  } 

}

 
    
    