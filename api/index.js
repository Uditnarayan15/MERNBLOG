import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Modules/routes/user.routes.js';
import authRoutes from './Modules/routes/auth.route.js';
import cors from 'cors';
const app = express();
app.use(cors({
   origin:'http://localhost:5174'
}));
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
   console.log("Database is connnected");
})

app.use(express.json());
app.listen(3000, () =>{
   console.log("server is running on port 3000")  
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) =>{
   const statuscode = err.statuscode || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statuscode).json({
      
      success: false,
      statuscode,
      message,
   });
});