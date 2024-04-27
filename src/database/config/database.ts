import mongoose from 'mongoose';

const dbLink: string = process.env.MONGO_DB_LOCAL || "mongodb://localhost:27017/event-management-platform-db"

mongoose.connect(dbLink).then(()=>{
    console.log("Connected to the database")
}).catch(err=>{
    console.log("Connecting to database error: ", err)
})