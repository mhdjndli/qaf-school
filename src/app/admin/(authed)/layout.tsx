import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin, signOut } from "@/lib/auth";
import AdminNav from "./AdminNav";

async function logoutAction() {
  "use server";
  await signOut();
  redirect("/admin/login");
}

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 md:min-h-screen bg-text text-white/80 flex md:flex-col">
        <div className="px-6 py-5 border-b border-white/10 md:w-full">
          <Link
            href="/admin/inquiry"
            className="font-heading text-xl font-bold text-white"
          >
            QAF Admin
          </Link>
        </div>
        <nav className="flex-1 md:py-6 md:w-full">
          <AdminNav />
        </nav>
        <form action={logoutAction} className="px-6 py-4 md:w-full md:border-t md:border-white/10">
          <button
            type="submit"
            className="text-sm text-white/60 hover:text-orange transition-colors"
          >
            Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-6 md:p-10 bg-cream">{children}</main>
    </div>
  );
}
