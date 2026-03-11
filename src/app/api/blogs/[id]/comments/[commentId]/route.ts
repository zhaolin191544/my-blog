import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";
import { sendEmail } from "@/src/lib/mail";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    if (body.approved !== undefined) {
      updateData.approved = body.approved;
    }

    if (body.reply !== undefined) {
      updateData.reply = body.reply;
      updateData.repliedAt = new Date();

      // Send email notification to the commenter
      const existing = await prisma.blogComment.findUnique({
        where: { id: commentId },
        include: { post: { select: { title: true, slug: true } } },
      });

      if (existing && existing.email && body.reply) {
        try {
          await sendEmail({
            to: existing.email,
            subject: `Re: 你在「${existing.post.title}」的评论收到了回复`,
            text: `你好 ${existing.author}，\n\n你在文章「${existing.post.title}」中的评论收到了站长的回复：\n\n你的评论：${existing.content}\n\n站长回复：${body.reply}\n\n---\nLin's Blog`,
            html: `
              <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #222;">
                <p style="color: #8e8e8e; font-size: 13px; margin-bottom: 24px;">你好 ${existing.author}，你在文章「<strong>${existing.post.title}</strong>」中的评论收到了回复：</p>
                <blockquote style="border-left: 3px solid #eee; margin: 0 0 20px 0; padding: 12px 16px; color: #8e8e8e; font-style: italic;">
                  ${existing.content}
                </blockquote>
                <div style="background: #fafafa; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                  <p style="margin: 0; font-size: 14px; line-height: 1.7;">${body.reply}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #c0c0c0; font-size: 11px; text-align: center;">Lin's Blog · 此邮件为自动发送，请勿直接回复</p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error("Failed to send comment reply email:", emailErr);
        }
      }
    }

    const comment = await prisma.blogComment.update({
      where: { id: commentId },
      data: updateData,
    });

    return NextResponse.json(comment);
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId } = await params;
    await prisma.blogComment.delete({ where: { id: commentId } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
