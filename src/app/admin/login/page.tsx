import { redirect } from "next/navigation";
import { isAdmin, signIn } from "@/lib/auth";

async function loginAction(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin/inquiry");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin/inquiry");
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-text">
            QAF Admin
          </h1>
          <p className="text-text-light text-sm mt-1">Sign in to continue</p>
        </div>
        <form
          action={loginAction}
          className="bg-white rounded-xl p-6 shadow-sm border border-border space-y-4"
        >
          <label className="block">
            <span className="block text-sm font-semibold text-text mb-1.5">
              Password
            </span>
            <input
              type="password"
              name="password"
              autoFocus
              required
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all"
            />
          </label>
          {error ? (
            <p className="text-red text-sm">Incorrect password.</p>
          ) : null}
          <button
            type="submit"
            className="w-full bg-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-dark transition-all"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
