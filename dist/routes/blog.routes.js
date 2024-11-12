"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blog_controller_1 = require("../controllers/blog.controller");
var router = (0, express_1.Router)();
router.get("/", blog_controller_1.CGetAllBlogs);
router.get("/:id", blog_controller_1.CGetBlogById);
router.post("/", blog_controller_1.CCreateBlog);
router.patch("/:id", blog_controller_1.CUpdateBlog);
router.delete("/:id", blog_controller_1.CDeleteBlog);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map