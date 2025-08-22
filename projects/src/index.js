import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints"
import connectDB from "./DB/db.js";
import app from "./app.js";


dotenv.config({                   //till here server is tated but not connected to app
    path : './.env'
})


connectDB()      
.then(()=>{         // here we are connecting db server to app
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is running on port : ${process.env.PORT || 5000}`)
    })
})
.catch((err)=>{
    console.log("mongo db connection lost !!!", err);
})



// const app = express();  

// // Middleware
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));

/*
import express from "express";

const connectDB = (async () => {
    try {
        await mongoose.connect(`${Process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR:", error);
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("ERROR",error);
        throw error;
    }
})();
*/