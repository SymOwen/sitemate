import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Issue", issueSchema);