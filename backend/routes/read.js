import express from "express";
import Issue from "../models/issue.js";

const router = express.Router();

export const readRoute = router.get("/:id", (req, res) => {
    Issue.findById(req.params.id)
    .then((issue) => {
        res.json(issue);
    })
    .catch((err) => {
        res.status(400).json("Error: " + err);
    });
});
