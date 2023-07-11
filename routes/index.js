const routes = require("express").Router();
const {
  register,
  view,
  deleteData,
  updatedUaser,
} = require("../controllers/registerCntrollers");
const chekauth = require("../middelwear/jwtAuth");
const imageUplodes = require("../middelwear/multer");
const { loginData, logout } = require("../controllers/loginCantrollers");
routes.post("/adminCreate", register);
routes.get("/viewAdmin", view);
routes.delete("/adminDelete/:id", deleteData);
routes.patch("/updatedUser/:id", imageUplodes, updatedUaser);
routes.post("/loging", loginData);
routes.get("/logoutAdmin/:id", logout);
const {
  blogAdd,
  blogView,
  onedataView,
  blogDelete,
  blogUpdated,
} = require("../controllers/blogControllers");
routes.post("/blogAdd", chekauth, blogAdd);
routes.get("/viewBlog", chekauth, blogView);
routes.get("/blogOneDataView/:id", chekauth, onedataView);
routes.delete("/deleteBlog/:id", chekauth, blogDelete);
routes.put("/updatedBlog/:id", chekauth, blogUpdated);

module.exports = routes;
