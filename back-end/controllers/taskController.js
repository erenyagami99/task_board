const asyncHandler = require("express-async-handler");
const Portal = require("../models/portalModel");
const { MongoServerError } = require("mongodb");

const createPortal = asyncHandler(async (req, res) => {
  const { appCode, projectId, modelId, version, title, description } = req.body;
  if (
    !appCode ||
    !projectId ||
    !modelId ||
    !version ||
    !title ||
    !description
  ) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  try {
    const portal = await Portal.create({
      appCode,
      projectId,
      modelId,
      version,
      title,
      description,
    });
    res.status(200).json(portal);
    console.log(portal, "Portal");
  } catch (error) {
    res.status(400).json({ message: error.message });
    if (error.message.includes("E11000")) {
      throw new Error("Portal Title Already Exists");
    }
  }
});

const getPortals = asyncHandler(async (req, res) => {
  try {
    const data = await Portal.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updatePortal = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Portal.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deletePortal = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Portal.findByIdAndDelete(id);
    console.log(data, "data");
    res.send(`Document with title ${data.title} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { createPortal, getPortals, updatePortal, deletePortal };
