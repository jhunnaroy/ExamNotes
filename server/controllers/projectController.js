import Project from "../models/Project.js";

// Create project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};