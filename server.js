const express = require("express");
const cors = require("cors");

// Express app entity
const app = express();

app.use(
    cors({
        origin: "https://playful-website-builder--santoshmadesh05.replit.app/",
        methods: ["GET","POST","PUT", "DELETE"],
        credentials:true
    })
)

// Loads .env files into process.env 
require("dotenv").config();

// Environment variables
const PORT = process.env.PORT;

// Middleware used to enable JSON parsing in the request's body
app.use(express.json());

// DNS configurations
const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

// Database connection
const connectDB = require("./db/connectDB");
connectDB();

// Import middlewares, routes, etc.
const errorHandler = require("./middlewares/errorMiddleware");
const router = require("./routes/urlRoutes");

// Server health check
app.get("/health", (req, res)=>{
    res.json({
        success: true,
        message: "Server is healthy"
    })
})

app.use(errorHandler);
app.use("/", router);


// Starting the server at the given port
app.listen(PORT, ()=>{
    console.log("Server is up & running")
})