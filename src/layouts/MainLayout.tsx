import { Outlet, Link } from "react-router-dom";
import { ShoppingCart, Sparkles, Tag } from "lucide-react";
import { Container } from "@/components/common";
import { useCartStore } from "@/store/cart.store";

export default function MainLayout() {
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900">
            <Sparkles className="h-5 w-5 text-teal-600" />
            ReactShop
          </Link>

          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link to="/shop" className="hover:text-slate-900">
              Shop
            </Link>
            <Link to="/cart" className="flex items-center gap-2 hover:text-slate-900">
              <ShoppingCart className="h-4 w-4" />
              Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-teal-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/terms"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900"
            >
              <Tag className="h-4 w-4" />
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-slate-500 hover:text-slate-900"
            >
              Privacy
            </Link>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <Container className="py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ReactShop. Built with modern React.
        </Container>
      </footer>
    </div>
  );
}
