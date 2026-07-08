import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Container } from "@/components/common";
import CustomButton from "@/components/custom/CustomButton";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/utils/formatCurrency";
import NotFound from "@/pages/common/NotFound/NotFound";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="bg-slate-50 py-12">
      <Container size="lg" className="space-y-10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full rounded-3xl object-cover"
            />
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
              <p className="text-lg leading-8 text-slate-600">{product.description}</p>
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-teal-600">Price</p>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-semibold text-slate-900">
                  {formatCurrency(product.price)}
                </p>
                {product.oldPrice && (
                  <p className="text-sm text-slate-500 line-through">
                    {formatCurrency(product.oldPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                Highlights
              </p>
              <ul className="space-y-2 text-slate-600">
                {product.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <CustomButton
              label="Add to cart"
              onClick={() => addToCart(product)}
              className="w-full bg-teal-600 hover:bg-teal-700"
              endIcon={<ShoppingCart className="h-4 w-4" />}
            />
            <CustomButton
              label="Continue shopping"
              asChild
              variant="outline"
            >
              <Link to="/shop" className="w-full inline-flex justify-center" />
            </CustomButton>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
