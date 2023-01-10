const Project = require('../models/project.model');

async function getAllProjects() {
    const total = await Project.countDocuments();
    try {
        const allProjects = await Project.find();
        return {
            success: true,
            data: allProjects,
            total: total.toString()
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch projects: " + error.message }
    }
};

async function createProject(body) {
    try {
        const newProject = await Project.create(body);
        return {
            success: true,
            data: newProject,
            message: "Project created successfully"
        }
    } catch (error) {
        return { success: false, message: "Unable to create project: " + error.message }
    }
};

async function getSpecificProject(id) {
    try {
        let project = await Project.findById(id);
        if(project === null) {
            return { success: false, message: `Unable to find project with id of ${id}: `  + error.message }
        } else {
            return {
                success: true,
                data: project
            }
        }
    } catch (error) {
        return { success: false, message: "Unable to fetch project: " + error.message }
    }
};

async function updateProject(id, body) {
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, body);
        return {
            success: true,
            data: updatedProject,
            message: "Updated project successfully"
        }
    } catch (error) {
        return { success: false, message: "Unable to update project: " + error.message }
    }
};

async function deleteProject(id) {
    try {
        const project = await Project.findByIdAndDelete(id);
        return {
            success: true,
            data: project,
            message: "Project deleted"
        }
    } catch (error) {
        return { success: false, message: "Unable to delete project: " + error.message }
    }
};

module.exports = {
    getAllProjects,
    getSpecificProject,
    createProject,
    updateProject,
    deleteProject
};