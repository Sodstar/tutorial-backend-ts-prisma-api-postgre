import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostService {
  static async getAllPosts() {
    return await prisma.post.findMany();
  }

  static async getPostById(postId: string) {
    return await prisma.post.findUnique({
      where: { id: postId },
    });
  }
}