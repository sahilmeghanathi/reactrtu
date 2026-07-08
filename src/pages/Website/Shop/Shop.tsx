import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container, ProductCard } from "@/components/common";
import CustomButton from "@/components/custom/CustomButton";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart.store";
import { LayoutGrid, Tag } from "lucide-react";

const categories = ["All", "Audio", "Wearables", "Home", "Footwear", "Accessories"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="bg-slate-50 py-12">
      <Container size="lg" className="space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-teal-600">Shop</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">Browse our collection</h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                Discover products across categories and build your cart in just a few clicks.
              </p>
            </div>
            <Link to="/cart">
              <CustomButton
                label="Go to cart"
                variant="secondary"
                className="bg-teal-600 text-white hover:bg-teal-700"
              />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Featured products</h2>
              <p className="text-sm text-slate-600">{filteredProducts.length} items available</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <LayoutGrid className="h-4 w-4" />
              {activeCategory} category
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Shop;
