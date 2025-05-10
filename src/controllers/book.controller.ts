import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { BaseError } from "../utils/BaseError";
import logger from "../utils/log";
import { bookIdSchema } from "../validator/bookValidator";

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookService.getAllBooks();
    if (!books)
      throw new BaseError("Books not found", 404);

    logger.info(`${req.ip} - Retrieved all books`);
    res.status(200).json({ data: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    logger.error(`${req.ip} - ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {

  try {
    const validation = bookIdSchema.safeParse(req.params);
    console.log(validation.error)
    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }
    const book = await BookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ data: book });
  } catch (error) {
    console.error("Error fetching book:", error); 
    res.status(500).json({ message: "Server Error" });
  }
}

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = await BookService.createBook(req.body);
    res.status(201).json({ data: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Update an existing book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await BookService.updateBook(req.params.id, req.body);
    res.status(200).json({ data: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    await BookService.deleteBook(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
