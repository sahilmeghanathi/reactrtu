import { Link, Outlet } from "react-router-dom";
import { Home, LayoutDashboard, LogOut, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/common";
import { useAuthContext } from "@/providers/AuthProvider";

export default function DashboardLayout() {
  const { logout, user } = useAuthContext();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="lg:flex lg:min-h-screen">
        <aside className="hidden lg:block lg:w-72 border-r border-slate-200 bg-white">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="border-b border-slate-200 px-6 py-6">
                <Link to="/dashboard" className="flex items-center gap-3 text-xl font-semibold">
                  <Sparkles className="h-6 w-6 text-teal-600" />
                  ReactRTU
                </Link>
              </div>

              <nav className="space-y-1 px-6 py-6">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Home className="h-4 w-4" />
                  Website
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Users className="h-4 w-4" />
                  Users
                </Link>
              </nav>
            </div>

            <div className="border-t border-slate-200 px-6 py-6">
              <div className="mb-4 text-sm text-slate-500">
                Signed in as
                <p className="font-medium text-slate-900">{user?.name ?? user?.email ?? "Member"}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1 bg-slate-50">
          <header className="border-b border-slate-200 bg-white">
            <Container className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm text-muted-foreground">Admin dashboard</p>
                <h1 className="text-xl font-semibold">Control panel</h1>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-slate-100 px-3 py-2">Live</span>
                <span>{user?.email ?? "guest@reactrtu.io"}</span>
              </div>
            </Container>
          </header>

          <main className="py-8">
            <Container>
              <Outlet />
            </Container>
          </main>
        </div>
      </div>
    </div>
  );
}
