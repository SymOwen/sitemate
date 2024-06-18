import express from "express";
import Issue from "../models/issue.js";

const router = express.Router();

export const updateRoute = router.put("/:id", (req, res) => {
    const {title, description} = req.body;
    Issue.findByIdAndUpdate(req.params.id, {title, description}, {new: true})
        .then((issue) => {
            res.json(issue);
        })
        .catch((err) => {
            res.status(400).json("Error: " + err);
        });
});
