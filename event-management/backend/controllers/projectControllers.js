import Project from '../models/project.js';

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
