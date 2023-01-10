const User = require('../models/user.model');

async function getAllUsers() {
    let total = await User.countDocuments();
    try {
        const allUsers = await User.find();
        return {
            success: true,
            data: allUsers,
            total: total.toString()
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch users: "  + error.message };
    }
};

async function createUser(body) {
    try {
        const newUser = await User.create(body);
        return {
            success: true,
            data: newUser,
            message: "User created successfully"
        }
    } catch (error) {
        return { success: false, message: "Unable to create new user: "  + error.message }
    }
};

async function getSpecificUser(id) {
    try {
        let user = await User.findById(id);
        if(user === null) {
            return { success: false, message: `Unable to find user with id of ${id}: `  + error.message }
        } else {
            return {
                success: true,
                data: user
            };
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch user: " + error.message }
    }
};

async function updateUser(id, body) {
    try {
        const user = await User.findByIdAndUpdate(id, body);
        return {
            success: true,
            data: user,
            message: "User updated successfully"
        }
    } catch (error) {
        return { success: false, message: "Unable to update user: " + error.message }
    }
};

async function deleteUser(id) {
    try {
        const user = await User.findByIdAndDelete(id);
        return {
            success: true,
            data: user,
            message: "User deleted"
        }
    } catch (error) {
        return { success: false, message: "Unable to delete user: "  + error.message }
    }
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    updateUser,
    deleteUser
};