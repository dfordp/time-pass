import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();

import connectDB from "./mongodb/index.js";
import authRoute from "./routers/userAuth.router.js"
import userRoute from "./routers/user.router.js"
import taskRoute from "./routers/task.router.js"    

const app=express();
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173', 'https://time-pass-client.vercel.app'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }));
app.use(express.json());



app.get("/", (req, res) => {
    res.send({message: "Hello World"});
});

app.use("/api/auth" , authRoute)
app.use("/api/user" , userRoute)
app.use("/api/task" , taskRoute)


const startServer=async()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=>console.log("Server started on http://localhost:8080"));
    } catch(error){
        console.log(error);
    }
}


startServer();
