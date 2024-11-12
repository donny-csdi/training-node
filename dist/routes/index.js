"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var utils_1 = require("../utils");
var math_routes_1 = __importDefault(require("./math.routes"));
var auth_routes_1 = __importDefault(require("./auth.routes"));
var article_routes_1 = __importDefault(require("./article.routes"));
var tag_routes_1 = __importDefault(require("./tag.routes"));
var promo_routes_1 = __importDefault(require("./promo.routes"));
var iklan_routes_1 = __importDefault(require("./iklan.routes"));
var blog_routes_1 = __importDefault(require("./blog.routes"));
var car_routes_1 = __importDefault(require("./car.routes"));
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.get("/try", function (req, res) {
    res.json({
        message: "We in try route",
    });
});
router.get("/about", function (req, res) {
    var url = req.url;
    res.json({
        message: "We in about route",
        url: url,
    });
});
router.get("/user/:person", function (req, res) {
    var person = req.params.person;
    res.send("Hello Guys! ".concat(person));
});
var books = [
    { id: "1", title: "1984", author: "George Orwell" },
    { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];
router.get("/books", function (req, res) {
    res.json((0, utils_1.formatResponse)(200, "success", books));
});
router.get("/books/search", function (req, res) {
    var author = req.query.author;
    var filteredBooks = books.filter(function (book) {
        if (author) {
            return book.author.includes(author);
        }
    });
    if (!filteredBooks.length) {
        res.status(404).json((0, utils_1.formatResponse)(404, "No books found"));
        return;
    }
    else {
        res.json((0, utils_1.formatResponse)(200, "success", filteredBooks));
    }
});
router.post("/books", function (req, res) {
    var _a = req.body, title = _a.title, author = _a.author;
    if (!title || !author) {
        res.status(400).json((0, utils_1.formatResponse)(400, "Bad request"));
        return;
    }
    var newBook = { id: (books.length + 1).toString(), title: title, author: author };
    books.push(newBook);
    res.status(201).json((0, utils_1.formatResponse)(201, "success", newBook));
});
router.get("/books/:id", function (req, res) {
    var id = req.params.id;
    var book = books.find(function (book) { return book.id === id; });
    if (!book) {
        res.status(404).json((0, utils_1.formatResponse)(404, "Book not found"));
        return;
    }
    res.json((0, utils_1.formatResponse)(200, "success", book));
});
router.put("/books/:id", function (req, res) {
    var id = req.params.id;
    var _a = req.body, title = _a.title, author = _a.author;
    var book = books.find(function (book) { return book.id === id; });
    if (!book) {
        res.status(404).json((0, utils_1.formatResponse)(404, "Book not found"));
        return;
    }
    book.title = title;
    book.author = author;
    res.json((0, utils_1.formatResponse)(200, "success", book));
});
router.delete("/books/:id", function (req, res) {
    var id = req.params.id;
    var book = books.find(function (book) { return book.id === id; });
    if (!book) {
        res.status(404).json((0, utils_1.formatResponse)(404, "Book not found"));
        return;
    }
    var index = books.indexOf(book);
    books.splice(index, 1);
    res.json((0, utils_1.formatResponse)(200, "book deleted"));
});
router.use("/", middlewares_1.apikeyValidator, auth_routes_1.default);
router.use("/math", middlewares_1.apikeyValidator, middlewares_1.checkAuth, math_routes_1.default);
router.use("/articles", middlewares_1.apikeyValidator, middlewares_1.checkAuth, article_routes_1.default);
router.use("/promos", middlewares_1.apikeyValidator, middlewares_1.checkAuth, promo_routes_1.default);
router.use("/tags", middlewares_1.apikeyValidator, middlewares_1.checkAuth, tag_routes_1.default);
router.use("/iklan", middlewares_1.apikeyValidator, middlewares_1.checkAuth, iklan_routes_1.default);
router.use("/blogs", middlewares_1.apikeyValidator, middlewares_1.checkAuth, blog_routes_1.default);
router.use("/cars", middlewares_1.apikeyValidator, middlewares_1.checkAuth, car_routes_1.default);
router.get("/get-error", function (req, res) {
    throw new Error("Test Error");
});
router.use(middlewares_1.errorHandler);
exports.default = router;
//# sourceMappingURL=index.js.map