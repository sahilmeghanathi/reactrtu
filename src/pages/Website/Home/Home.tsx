import { Link } from "react-router-dom";
import CustomButton from "@/components/custom/CustomButton";
import { Container } from "@/components/common";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Sparkles, Heart } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { useCartStore } from "@/store/cart.store";

export default function Home() {
  const featured = products.slice(0, 4);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="w-full bg-slate-50">
      <Container size="lg" className="space-y-24 py-12 md:py-20">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
              <Sparkles className="h-4 w-4" />
              Premium ecommerce starter
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900">
                A modern React ecommerce website starter
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Showcase products, build a shopping cart, and launch a fast
                frontend with reusable UI and a polished storefront.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/shop">
                <CustomButton
                  label="Browse Products"
                  endIcon={<ArrowRight className="h-4 w-4" />}
                  className="bg-teal-600 hover:bg-teal-700"
                />
              </Link>
              <Link to="/cart">
                <CustomButton
                  label="View Cart"
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((product) => (
              <Card key={product.id} className="overflow-hidden rounded-3xl p-0 shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <span>{product.category}</span>
                    <span>{product.rating.toFixed(1)} ★</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 justify-between">
                    <span className="text-lg font-semibold text-slate-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to cart
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-teal-600">What we offer</p>
              <h2 className="text-3xl font-bold text-slate-900">Designed for modern shopping experiences</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Build your storefront with reusable product cards, cart actions, and an intuitive browsing experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Fast listings",
                description: "Product feeds and details built for conversion.",
                icon: Heart,
              },
              {
                title: "Mobile-ready",
                description: "Responsive design optimized across desktops and phones.",
                icon: Sparkles,
              },
              {
                title: "Simple checkout",
                description: "Clear cart, pricing, and purchase flow for buyers.",
                icon: ShoppingBag,
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="rounded-3xl p-6 shadow-sm">
                  <div className="inline-flex rounded-full bg-slate-100 p-3 text-teal-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
