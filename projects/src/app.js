import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/user.routes.js'  // importing routes to attach prefix


const app = express();

app.use(cors({              // from where i can acces the requests 
    origin : process.env.cors_origin,
    credentials : true
}))
app.use(express.json({        // to set limit for accesing size of documents for a specific file format 
    limit : '10mb'
}))
app.use(express.urlencoded({  // to understand the url special characters which comees durinf search
    limit : '10mb',
    extended : true
}))
app.use(cookieParser())

//routes



//routes declaration
app.use("/api/v1/users",router) //https://localhost:8000/api/v1/users 
//here we are userRouter get call backed for register prefix which will be add with user


export default app