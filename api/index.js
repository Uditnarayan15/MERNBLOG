import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Modules/routes/user.routes.js';
import authRoutes from './Modules/routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
   console.log("Database is connnected");
})
const app = express();

app.use(express.json());
app.listen(3000, () =>{
   console.log("server is running on port 3000")  
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);