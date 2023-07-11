const blogModels = require("../models/blogModels");
const mongoose = require("mongoose");
const blogAdd = async (req, res) => {
  try {
    const {
      body: { title, content, author },
    } = req;
    const data = await blogModels.create({ title, content, author });
    return res.status(200).json({ sucssee: true, data });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation error
      console.error(error.message);
      return res.json({
        error: "title author and contect number is not vaild !!",
      });
    } else {
      console.error("Error creating Location:", error);
      return res.json({ error: "Internal Server Error" });
    }
  }
};
const blogView = async (req, res) => {
  try {
    const { page, search, pagePerRecords, sortFieldKey, sortKey } = req.query;
    let query = {};
    //search
    if (search) {
      query.$or = [
        { title: { $regex: "^" + search, $options: "i" } },
        { author: { $regex: "^" + search, $options: "i" } },
        { webstoreURL: { $regex: "^" + search, $options: "i" } },
      ];
    }
    //sort
    let sort_query = {};
    if (sort_query) {
      sort_query[sortFieldKey] = sortKey == "desc" ? -1 : 1;
    }
    console.log(sort_query);
    //pagination
    let pageNumber = 1;
    if (page) {
      pageNumber = Number(page);
    }
    let skip = parseInt(pageNumber * pagePerRecords) - pagePerRecords;
    let totleRecod = await blogModels.find(query);
    let blog = await blogModels
      .find(query)
      .limit(pagePerRecords)
      .skip(skip)
      .sort(sort_query);
    return res.status(200).json({ blog, totleRecod });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const onedataView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid delete ID" });
    }
    const data = await blogModels.findById(id);
    return res.status(200).json({ sucssee: true, data });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const blogDelete = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid delete ID" });
    }
    const data = await blogModels.findByIdAndDelete(id);
    return res.status(200).json({ sucssee: true, msg: "Record is delete !!" });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const blogUpdated = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, content, author },
    } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid delete ID" });
    }
    const data = await blogModels.findByIdAndUpdate(id, {
      title,
      content,
      author,
    });
    return res.status(200).json({ sucssee: true, data });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { blogAdd, blogView, onedataView, blogDelete, blogUpdated };
