import mongoose from 'mongoose'
import  { MongoMemoryServer } from 'mongodb-memory-server'


const mongod = new MongoMemoryServer();
/**
 * Connect to the mongoDB ATLAS database.
*/
export const connect = async () => {
    let uri = await mongod.getUri();
    if(process.env.SERVER_ENV==='production'){
        uri = process.env.MONGO_URI || ''
    }
    
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}