import { Router, Request, Response } from "express";
import { formatResponse } from "../utils";
import mathRouter from "./math.routes";
import authRouter from "./auth.routes";
import articleRouter from "./article.routes";
import tagRouter from "./tag.routes";
import promoRouter from "./promo.routes";
import iklanRouter from "./iklan.routes";
import blogRouter from "./blog.routes";
import carRouter from "./car.routes";
import { apikeyValidator, checkAuth, errorHandler } from "../middlewares";

const router = Router();

router.get("/try", (req: Request, res: Response) => {
  res.json({
    message: "We in try route",
  });
});

router.get("/about", (req: Request, res: Response) => {
  const url = req.url;
  res.json({
    message: "We in about route",
    url,
  });
});

router.get("/user/:person", (req: Request, res: Response) => {
  const person = req.params.person;
  res.send(`Hello Guys! ${person}`);
});

const books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];

router.get("/books", (req: Request, res: Response) => {
  res.json(formatResponse(200, "success", books));
});

router.get("/books/search", (req: Request, res: Response) => {
  const { author } = req.query;

  const filteredBooks = books.filter((book) => {
    if (author) {
      return book.author.includes(author as string);
    }
  });

  if (!filteredBooks.length) {
    res.status(404).json(formatResponse(404, "No books found"));
    return;
  } else {
    res.json(formatResponse(200, "success", filteredBooks));
  }
});

router.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).json(formatResponse(400, "Bad request"));
    return;
  }

  const newBook = { id: (books.length + 1).toString(), title, author };
  books.push(newBook);
  res.status(201).json(formatResponse(201, "success", newBook));
});

router.get("/books/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json(formatResponse(404, "Book not found"));
    return;
  }
  res.json(formatResponse(200, "success", book));
});

router.put("/books/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, author } = req.body;
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json(formatResponse(404, "Book not found"));
    return;
  }
  book.title = title;
  book.author = author;
  res.json(formatResponse(200, "success", book));
});

router.delete("/books/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json(formatResponse(404, "Book not found"));
    return;
  }
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.json(formatResponse(200, "book deleted"));
});

router.use("/", apikeyValidator, authRouter);

router.use("/math", apikeyValidator, checkAuth, mathRouter);

router.use("/articles", apikeyValidator, checkAuth, articleRouter);

router.use("/promos", apikeyValidator, checkAuth, promoRouter);

router.use("/tags", apikeyValidator, checkAuth, tagRouter);

router.use("/iklan", apikeyValidator, checkAuth, iklanRouter);

router.use("/blogs", apikeyValidator, checkAuth, blogRouter);

router.use("/cars", apikeyValidator, checkAuth, carRouter);

router.get("/get-error", (req: Request, res: Response) => {
  throw new Error("Test Error");
});

router.use(errorHandler);

export default router;
