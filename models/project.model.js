const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true
        },
        details: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;