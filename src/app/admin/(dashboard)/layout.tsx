import { getSession } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/src/components/admin/AdminSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-neutral-50 p-6">
        {children}
      </main>
    </div>
  );
}
