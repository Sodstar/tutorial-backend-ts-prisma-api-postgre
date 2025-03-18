import { PrismaClient } from "@prisma/client";
import redisClient, { getOrSetCache } from "../config/redisClient";

const prisma = new PrismaClient();
const DEFAULT_EXPIRATION = 3600;

export class BookService {

    static async getAllBooks() {
    const cacheKey = "getAllBooks";
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("♻️ Loaded from cache");
      return JSON.parse(cachedData);
    }

    console.log("📚 Fetching from database...");
    const books = await prisma.book.findMany({ orderBy: { title: "desc" } });

    // Cache the result
    await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(books));
    return books;
  }

  // Get a single book by ID with caching
  static async getBookById(bookId: string) {
    return await getOrSetCache(`book:${bookId}`, 60, async () => {
      return await prisma.book.findUnique({
        where: { id: bookId },
      });
    });
  }

  // Create a new book
  static async createBook(bookData: { title: string; description: string; authorId: string }) {
    return await prisma.book.create({
      data: {
        title: bookData.title,
        description: bookData.description,
        author: { connect: { id: bookData.authorId } },
      },
    });
  }

  // Update book details
  static async updateBook(bookId: string, bookData: any) {
    return await prisma.book.update({
      where: { id: bookId },
      data: bookData,
    });
  }

  // Delete a book
  static async deleteBook(bookId: string) {
    return await prisma.book.delete({
      where: { id: bookId },
    });
  }
}