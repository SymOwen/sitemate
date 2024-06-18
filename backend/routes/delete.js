import express from "express";
import Issue from "../models/issue.js";

const router = express.Router();

export const deleteRoute = router.delete("/:id", (req, res) => {
    Issue.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json("Issue deleted");
        })
        .catch((err) => {
            res.status(400).json("Error: " + err);
        });
});