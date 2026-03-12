"use client";

import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/routing";
import { format } from "date-fns";
import { MagicCard } from "@/src/components/magicui/magic-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { MessageSquarePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";

interface Message {
  id: string;
  name: string;
  content: string;
  reply?: string | null;
  repliedAt?: string | null;
  createdAt: string;
}

export default function MessagesPage() {
  const t = useTranslations("messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/guestbook?limit=50");
      const data = await res.json();
      setMessages(data.data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) {
      toast.error(t("toast_fill_fields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit message");
      }

      toast.success(t("toast_success"));
      setFormData({ name: "", email: "", content: "" });
      setIsDialogOpen(false);
      fetchMessages(); // Refresh the list
    } catch (error) {
      toast.error(t("toast_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10">
      <LanguageSwitcher />
      <div className="mx-auto min-[900px]:max-w-[90vw] min-[1200px]:max-w-250">
        <header className="px-8 max-[767px]:px-5 pt-10 pb-6 flex items-start justify-between">
          <div>
            <Link
              href="/"
              className="inline-block text-sm text-ash hover:text-carbon transition-colors mb-8  max-[767px]:hidden"
            >
              {t("back")}
            </Link>
            <h1 className="italic font-serif text-4xl max-[767px]:text-3xl font-normal tracking-tight text-carbon">
              {t("title")}
            </h1>
            <p className="mt-2 text-ash text-sm font-serif italic">{t("subtitle")}</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 mt-17 bg-carbon text-white rounded-full text-sm font-serif hover:bg-neutral-800 transition-colors shadow-sm">
                <MessageSquarePlus className="w-4 h-4" />
                <span>{t("leave_message")}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="font-serif italic text-xl">
                    {t("leave_message")}
                  </DialogTitle>
                  <DialogDescription className="font-serif text-sm">
                    {t("email_privacy")}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium font-serif">
                      {t("name_label")}
                    </label>
                    <Input
                      id="name"
                      placeholder={t("name_placeholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium font-serif">
                      {t("email_label")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("email_placeholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="content" className="text-sm font-medium font-serif">
                      {t("message_label")}
                    </label>
                    <Textarea
                      id="content"
                      placeholder={t("message_placeholder")}
                      className="min-h-25 resize-y"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting} className="font-serif">
                    {isSubmitting ? t("submitting") : t("submit")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <main className="px-8 max-[767px]:px-5 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <div className="w-5 h-5 border border-ash border-t-transparent rounded-full animate-spin" />
              <p className="text-ash text-sm font-serif">{t("loading")}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
              <p className="text-cement text-lg font-serif">{t("empty")}</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {messages.map((message) => (
                <div key={message.id} className="break-inside-avoid mb-6">
                  <MagicCard
                    className="p-6 hover:shadow-lg transition-shadow duration-300 h-full"
                    gradientColor="rgba(59, 130, 246, 0.1)"
                    gradientOpacity={1}
                  >
                    <div className="flex flex-col h-full justify-between gap-4 relative z-10">
                      <div>
                        <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-serif whitespace-pre-wrap">
                          {message.content}
                        </p>

                        {message.reply && (
                          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-amber-600 dark:text-amber-500">
                                {t("admin")}
                              </span>
                              {message.repliedAt && (
                                <span className="text-[10px] text-neutral-400">
                                  {format(new Date(message.repliedAt), "MMM d, yyyy")}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif whitespace-pre-wrap">
                              {message.reply}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 text-xs font-serif border-t border-neutral-100 dark:border-neutral-800">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                          {message.name}
                        </span>
                        <span className="text-neutral-400 dark:text-neutral-500">
                          {format(new Date(message.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </MagicCard>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
