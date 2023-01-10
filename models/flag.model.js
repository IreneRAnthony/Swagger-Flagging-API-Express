const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flagSchema = new Schema({
        flaggedItemId: {
            type: mongoose.Types.ObjectId,
            ref: 'project, comment, etc.',
            required: true,
            unique: true
        },
        itemType: {
            type: String,
            required: true,
            enum: ["project", "comment", "recommendation", "user"]
        },
        comment: {
            type: String,
            required: false
        },
        adminComment: {
            type: String,
            required: false,
            default: "No admin comment yet"
        },
        markedForDeletion: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;