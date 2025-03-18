import { Request, Response } from "express";
import { AuthorService } from "../services/authorService";
import logger from "../utils/log";

// getAllAuthors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorService.getAllAuthors();
    logger.info(`${req.ip} - Retrieved all authors`);
    res.status(200).json({ data: authors });
  } catch (error) {
    console.error("Error fetching authors:", error);
    logger.error(`${req.ip} - ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// getAuthorById
export const getAuthorById = async (req, res) => {
  try {
    const author = await AuthorService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ data: author });
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// createAuthor
export const createAuthor = async (req, res) => {
  try {
    const newAuthor = await AuthorService.createAuthor(req.body);
    res.status(201).json({ data: newAuthor });
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// updateAuthor
export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await AuthorService.updateAuthor(req.params.id, req.body);
    res.status(200).json({ data: updatedAuthor });
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// deleteAuthor
export const deleteAuthor = async (req, res) => {
  try {
    await AuthorService.deleteAuthor(req.params.id);
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
