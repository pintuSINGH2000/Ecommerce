import express from 'express';
import colors  from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import ForgotPasswordRoute from './routes/forgotPasswordRoute.js';
import categoryRoutes from './routes/categoryRoute.js'
import ProductRoutes from './routes/productRoute.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


//configure env
   dotenv.config();

//databse config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/forgetpassword',ForgotPasswordRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',ProductRoutes);

//rest api
app.use('*',function(req,res) {
   res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
   console.log(`server is Running on ${PORT}`.bgCyan.white)
});