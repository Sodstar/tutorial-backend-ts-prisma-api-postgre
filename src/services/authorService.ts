import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthorService {
  // Get all authors with books
  static async getAllAuthors() {
    return await prisma.author.findMany({
      include: { books: true },
    });
  }

  // Get author by ID
  static async getAuthorById(authorId: string) {
    return await prisma.author.findUnique({
      where: { id: authorId },
      include: { books: true },
    });
  }

  // Create a new author
  static async createAuthor(authorData: any) {
    return await prisma.author.create({
      data: authorData,
    });
  }

  // Update author details
  static async updateAuthor(authorId: string, authorData: any) {
    return await prisma.author.update({
      where: { id: authorId },
      data: authorData,
    });
  }

  // Delete an author
  static async deleteAuthor(authorId: string) {
    return await prisma.author.delete({
      where: { id: authorId },
    });
  }
}