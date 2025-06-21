const express = require('express');
const { connectDB } = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file


// Importing routers
const authRouter = require('./routes/auth/auth-routes.js');
const adminProductsRouter = require('./routes/admin/products-routes.js');
const commonFeatureRouter = require('./routes/common/feature-routes.js');
const morgan = require('morgan');

const app = express();

// cors configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control','Expires','Pragma'], // Allowed headers
    credentials: true // Allow credentials
}));

app.use(morgan('dev'))

app.use(cookieParser())
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// connecting to the database
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/common/feature", commonFeatureRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});