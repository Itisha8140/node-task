const adminModels = require("../models/register");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const imagespath = path.join("imagesUplodes");
const register = async (req, res) => {
  try {
    const {
      body: { name, email, password },
    } = req;
    let bpassword = await bcrypt.hash(password, 10);
    const data = await adminModels.create({ name, email, password: bpassword });
    return res.status(200).json({ sucssee: true, data });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation error
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    } else {
      console.log(error.code);
      if (error.code == 11000) {
        return res.status(500).json({
          error: " Duplicate Record is not fount | email is not vaild  ",
        });
      }
      console.error("Error creating Location:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
const view = async (req, res) => {
  try {
    const data = await adminModels.find({});
    return res.status(200).json({ sucssee: true, data });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteData = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid delete ID" });
    }
    const data = await adminModels.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ sucssee: true, data, msg: "Record is delete !!" });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const updatedUaser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid updated ID" });
    }
    if (req.file) {
      const profile = await adminModels.findById(id);
      if (profile.images != "imagesUlodes/adminimags.jpg") {
        fs.unlinkSync(profile.images);
      }

      const images = `${imagespath}/${req.file.filename}`;
      const uplod = await adminModels.findByIdAndUpdate(
        id,
        Object.assign({ images }, req.body)
      );

      return res.status(200).json({
        success: true,
        data: uplod,
        msg: `data is update on id :- ${id}`,
      });
    } else {
      const admin = await adminModels.findByIdAndUpdate(
        id,
        Object.assign({ images }, req.body)
      );
      if (!admin) {
        return res
          .status(404)
          .json({ success: false, msg: `no user id :- ${id}` });
      }
      res.status(201).json({
        success: true,
        data: user,
        msg: `update for this id :- ${id}`,
      });
    }
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { register, view, deleteData, updatedUaser };
