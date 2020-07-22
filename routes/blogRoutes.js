const mongoose = require("mongoose");
const { delHashKey } = require("../services/cache");
const Blog = mongoose.model("Blog");

module.exports = (app) => {
  app.get("/api/blogs/:id", async (req, res) => {
    const blog = await Blog.findOne({
      _user: "5f16a3db1e86733c84f91fe1",
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get("/api/blogs", async (req, res) => {
    const blogs = await Blog.find({ _user: "5f16a3db1e86733c84f91fe1" }).cache({
      key: "5f16a3db1e86733c84f91fe1",
    });

    res.send(blogs);
  });

  app.post("/api/blogs", async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: "5f16a3db1e86733c84f91fe1",
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
    delHashKey("5f16a3db1e86733c84f91fe1");
  });
};
