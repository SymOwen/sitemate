import express from "express";
import Issue from "../models/issue.js";
import mongoose from "mongoose";

const router = express.Router();

export const createRoute = router.post("", (req, res) => {
    const {title, description} = req.body;
    const issue = new Issue({
        id: new mongoose.Types.ObjectId(),
        title,
        description,
    });
    issue.save()
        .then(() => {
            res.json("Issue created");
        })
        .catch((err) => {
            res.status(400).json("Error: " + err);
        });
});
