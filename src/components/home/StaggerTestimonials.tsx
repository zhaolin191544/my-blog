"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export function StaggerTestimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      id: 1,
      text: t("t1_text"),
      by: t("t1_by"),
      role: t("t1_role"),
      avatar: t("t1_avatar"),
      color: "#ff8a65",
    },
    {
      id: 2,
      text: t("t2_text"),
      by: t("t2_by"),
      role: t("t2_role"),
      avatar: t("t2_avatar"),
      color: "#4db6ac",
    },
    {
      id: 3,
      text: t("t3_text"),
      by: t("t3_by"),
      role: t("t3_role"),
      avatar: t("t3_avatar"),
      color: "#7986cb",
    },
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-135 ml-auto py-12 max-[767px]:mx-auto relative">
      {/* Decorative background element */}
      <div className="absolute -right-20 top-0 w-64 h-64 bg-cement/20 rounded-full blur-3xl -z-10" />

      <div className="mb-4 max-[767px]:px-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] leading-[1.1] font-bold text-carbon tracking-tight mb-3">
            {t("title")} <br />
            <span className="text-ash/60 italic font-serif">{t("subtitle")}</span>
          </h2>
          <div className="w-12 h-1 bg-carbon rounded-full" />
        </motion.div>
      </div>

      <div className="space-y-6 max-[767px]:px-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1 : 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{
              y: -8,
              rotate: i % 2 === 0 ? 1 : -1,
              transition: { duration: 0.2 },
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.21, 1.11, 0.81, 0.99],
            }}
            className={`
              relative p-8 bg-white border border-aluminum/30 
              shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] 
              rounded-4xl overflow-hidden group
              ${i % 2 === 0 ? "mr-12" : "ml-6"}
              max-[767px]:mr-0 max-[767px]:ml-0
            `}
          >
            {/* Background Accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity"
              style={{ backgroundColor: t.color, clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />

            <div className="absolute top-6 right-8 text-aluminum/20 group-hover:text-aluminum/40 transition-colors">
              <Quote size={40} fill="currentColor" />
            </div>

            <div className="relative z-10">
              <p className="text-[17px] leading-relaxed text-carbon/90 font-medium mb-8">
                {t.text}
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-carbon tracking-tight">{t.by}</h4>
                  <p className="text-[12px] text-ash font-medium uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
