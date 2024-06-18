import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'

const app = express();

app.use(express.json());

app.use(cors());

const port = process.PORT || 9876;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.log("Error: " + err);
});
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Import routes
import {createRoute} from "./routes/create.js";
import {readRoute} from "./routes/read.js";
import {updateRoute} from "./routes/update.js";
import {deleteRoute} from "./routes/delete.js";

// Use routes
app.use("/create", createRoute);
app.use("/read", readRoute);
app.use("/update", updateRoute);
app.use("/delete", deleteRoute);
