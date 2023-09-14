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


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/forgetpassword',ForgotPasswordRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',ProductRoutes);

// app.get("/",(req,res) => {
//    res.send("<h1>Hello my friend</h1>");
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
   console.log(`server is Running on ${PORT}`.bgCyan.white)
});