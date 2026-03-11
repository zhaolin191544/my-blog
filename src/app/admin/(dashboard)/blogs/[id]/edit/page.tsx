import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { BlogForm } from "@/src/components/admin/BlogForm";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <BlogForm
      mode="edit"
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        cover: post.cover || "",
        excerpt: post.excerpt || "",
        content: post.content,
        contentType: post.contentType,
        published: post.published,
      }}
    />
  );
}
