"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { useState, useCallback, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Undo,
  Redo,
  FileCode,
  Eye,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface RichTextEditorProps {
  content: string;
  contentType: "MARKDOWN" | "HTML";
  onChange: (content: string, contentType: "MARKDOWN" | "HTML") => void;
  placeholder?: string;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "rounded p-1.5 transition-colors",
        active
          ? "bg-amber-100 text-amber-700"
          : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  content,
  contentType,
  onChange,
  placeholder = "开始写作...",
}: RichTextEditorProps) {
  const [mode, setMode] = useState<"wysiwyg" | "source">(
    contentType === "MARKDOWN" ? "source" : "wysiwyg",
  );
  const [sourceContent, setSourceContent] = useState(content);
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: contentType === "HTML" ? content : "",
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML(), "HTML");
    },
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  const handleImageUpload = useCallback(async () => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "blogs");

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          if (mode === "wysiwyg" && editor) {
            editor.chain().focus().setImage({ src: data.url }).run();
          } else {
            const imgTag =
              contentType === "MARKDOWN"
                ? `![image](${data.url})\n`
                : `<img src="${data.url}" alt="image" />\n`;
            setSourceContent((prev) => prev + imgTag);
            onChange(sourceContent + imgTag, contentType === "MARKDOWN" ? "MARKDOWN" : "HTML");
          }
        }
      } catch {
        // Upload failed silently
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [editor, mode, contentType, sourceContent, onChange],
  );

  const handleSourceChange = useCallback(
    (value: string) => {
      setSourceContent(value);
      onChange(value, contentType);
    },
    [contentType, onChange],
  );

  const handleAddLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("输入链接 URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const togglePreview = useCallback(async () => {
    if (!showPreview && mode === "source") {
      if (contentType === "MARKDOWN") {
        const { marked } = await import("marked");
        const html = await marked(sourceContent);
        setPreviewHtml(html);
      } else {
        setPreviewHtml(sourceContent);
      }
    }
    setShowPreview(!showPreview);
  }, [showPreview, mode, contentType, sourceContent]);

  const toggleMode = useCallback(() => {
    if (mode === "wysiwyg") {
      setSourceContent(editor?.getHTML() || "");
      setMode("source");
      onChange(editor?.getHTML() || "", contentType);
    } else {
      if (contentType === "MARKDOWN") {
        import("marked").then(async ({ marked }) => {
          const html = await marked(sourceContent);
          editor?.commands.setContent(html);
          setMode("wysiwyg");
        });
      } else {
        editor?.commands.setContent(sourceContent);
        setMode("wysiwyg");
      }
    }
  }, [mode, editor, sourceContent, contentType, onChange]);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-neutral-200 px-2 py-1.5">
        {mode === "wysiwyg" && editor && (
          <>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="粗体"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="斜体"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
              title="下划线"
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
              title="删除线"
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>

            <div className="mx-1 h-6 w-px bg-neutral-200" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              active={editor.isActive("heading", { level: 1 })}
              title="标题 1"
            >
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              active={editor.isActive("heading", { level: 2 })}
              title="标题 2"
            >
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              active={editor.isActive("heading", { level: 3 })}
              title="标题 3"
            >
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>

            <div className="mx-1 h-6 w-px bg-neutral-200" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              title="无序列表"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              title="有序列表"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
              title="引用"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              active={editor.isActive("codeBlock")}
              title="代码块"
            >
              <Code className="h-4 w-4" />
            </ToolbarButton>

            <div className="mx-1 h-6 w-px bg-neutral-200" />

            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              active={editor.isActive({ textAlign: "left" })}
              title="左对齐"
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              active={editor.isActive({ textAlign: "center" })}
              title="居中"
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              active={editor.isActive({ textAlign: "right" })}
              title="右对齐"
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>

            <div className="mx-1 h-6 w-px bg-neutral-200" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              active={editor.isActive("highlight")}
              title="高亮"
            >
              <Highlighter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={handleAddLink} title="链接">
              <LinkIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={handleImageUpload} title="插入图片">
              <ImageIcon className="h-4 w-4" />
            </ToolbarButton>

            <div className="mx-1 h-6 w-px bg-neutral-200" />

            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="撤销">
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="重做">
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </>
        )}

        {mode === "source" && (
          <ToolbarButton onClick={handleImageUpload} title="插入图片">
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
        )}

        <div className="ml-auto flex items-center gap-1">
          {mode === "source" && (
            <ToolbarButton onClick={togglePreview} active={showPreview} title="预览">
              <Eye className="h-4 w-4" />
            </ToolbarButton>
          )}
          <ToolbarButton
            onClick={toggleMode}
            active={mode === "source"}
            title={mode === "wysiwyg" ? "切换到源码模式" : "切换到可视化模式"}
          >
            <FileCode className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        {mode === "wysiwyg" ? (
          <EditorContent editor={editor} />
        ) : (
          <div className={showPreview ? "grid grid-cols-2" : ""}>
            <textarea
              value={sourceContent}
              onChange={(e) => handleSourceChange(e.target.value)}
              className="min-h-[400px] w-full resize-y p-4 font-mono text-sm text-neutral-800 focus:outline-none"
              placeholder={contentType === "MARKDOWN" ? "在此输入 Markdown..." : "在此输入 HTML..."}
            />
            {showPreview && (
              <div className="border-l border-neutral-200 p-4">
                <div className="mb-2 text-xs font-medium text-neutral-400">预览</div>
                <div
                  className="prose prose-neutral max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
