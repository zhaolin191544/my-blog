import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getSession } from "@/src/lib/auth";
import { sendEmail } from "@/src/lib/mail";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const message = await prisma.message.update({
      where: { id },
      data: {
        read: body.read !== undefined ? body.read : undefined,
        isSpam: body.isSpam !== undefined ? body.isSpam : undefined,
        reply: body.reply !== undefined ? body.reply : undefined,
        repliedAt: body.reply !== undefined ? new Date() : undefined,
      },
    });

    // If there's a new reply, send an email
    if (body.reply && message.email) {
      try {
        await sendEmail({
          to: message.email,
          subject: "Your message on Lin's Blog has a new reply",
          text: `Hi ${message.name},\n\nLin has replied to your message: "${message.content}"\n\nReply: "${body.reply}"\n\nBest regards,\nLin's Blog`,
          html: `
            <div style="font-family: serif; color: #222; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
              <h2 style="font-style: italic; border-bottom: 1px solid #eee; padding-bottom: 10px;">Lin's Blog</h2>
              <p>Hi <strong>${message.name}</strong>,</p>
              <p>Lin has replied to your message:</p>
              <blockquote style="border-left: 4px solid #eee; padding-left: 15px; font-style: italic; color: #666;">
                ${message.content}
              </blockquote>
              <p><strong>Lin's Reply:</strong></p>
              <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
                ${body.reply}
              </p>
              <p style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; pt: 10px;">
                This is an automated notification. Please do not reply directly to this email.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // We don't want to fail the whole request if email fails, 
        // but we'll log it.
      }
    }

    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.message.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
