const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        // Password left unsalted for now, as this is not a full scale project
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;