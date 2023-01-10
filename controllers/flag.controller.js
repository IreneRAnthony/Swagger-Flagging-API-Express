const FlaggedItem = require('../models/flag.model');

async function getAllFlaggedItems() {
    const total = await FlaggedItem.countDocuments();
    try {
        const flaggedItems = await FlaggedItem.find();
        return {
            success: true,
            data: flaggedItems,
            total: total.toString()
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch flagged items: " + error.message }
    }
};

async function getAllFlaggedUsers() {
    try {
        const flaggedUsers = await FlaggedItem.find({ itemType: "user" });
        return {
            success: true,
            data: flaggedUsers
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch flagged users: " + error.message };
    }
};

async function getAllFlaggedProjects() {
    try {
        const flaggedProjects = await FlaggedItem.find({ itemType: "project" });
        return {
            success: true,
            data: flaggedProjects
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch flagged projects: " + error.message };
    }
};

async function createFlaggedItem(body) {
    try {
        const existingFlag = await FlaggedItem.findById(body.flaggedItemId);
        if(existingFlag) {
            return { success: false, message: "Flag already created for item" }
        } else {
            const newFlaggedItem = await FlaggedItem.create(body);
            return {
                success: true,
                data: newFlaggedItem,
                message: "Flag for item created"
            }
        }
    } catch (error) {
        return { success: false, message: "Unable to create flag for item: " + error.message }
    }
};

async function getSpecificFlaggedItem(id) {
    try {
        const flaggedItem = await FlaggedItem.findById(id);
        if(flaggedItem === null) {
            return { success: false, message: `Unable to find flagged item with id of ${id}: `  + error.message }
        } else {
            return {
                success: true,
                data: flaggedItem
            };
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch flagged item: " + error.message }
    }
};

async function updateFlaggedItem(id, body) {
    try {
        const flaggedItem = await FlaggedItem.findByIdAndUpdate(id, body);
        return {
            success: true,
            data: flaggedItem,
            message: "Flag updated"
        }
    } catch (error) {
        return { success: false, message: "Unable to update item flag: " + error.message }
    }
};

async function deleteFlaggedItem(id) {
    try {
        const flaggedItem = await FlaggedItem.findByIdAndDelete(id);
        return {
            success: true,
            data: flaggedItem,
            message: "Flag deleted"
        }
    } catch (error) {
        return { success: false, message: "Unable to delete item flag: " + error.message }
    }
};

module.exports = {
    getAllFlaggedItems,
    getAllFlaggedUsers,
    getAllFlaggedProjects,
    getSpecificFlaggedItem,
    createFlaggedItem,
    updateFlaggedItem,
    deleteFlaggedItem
};