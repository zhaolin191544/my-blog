import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ["three", "meshline"],
  serverExternalPackages: ["@prisma/adapter-pg", "pg", "bcryptjs", "jose"],
};

export default withNextIntl(nextConfig);
