export const metadata = {
  title: "Admin - My Blog",
  description: "Blog administration panel",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-neutral-50 font-sans antialiased">{children}</div>;
}
