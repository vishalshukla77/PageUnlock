const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookRoute = require("./route/book_route"); // Use require instead of import
const userRoute=require("./route/user_route");
const cors = require('cors');
const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;


// Connect to MongoDB
mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Middleware to parse JSON request bodies
app.use(express.json());

// Use bookRoute for handling /book routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
