import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/custom/CustomButton";
import { Product } from "@/types/product.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
          <span>{product.category}</span>
          <span>{product.rating.toFixed(1)} ★</span>
        </div>
        <div className="space-y-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-semibold text-slate-900 hover:text-teal-600">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm leading-6 text-slate-600 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {formatCurrency(product.price)}
            </p>
            {product.oldPrice && (
              <p className="text-sm text-slate-500 line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            )}
          </div>
          <CustomButton
            label="Add to cart"
            onClick={() => onAddToCart(product)}
            className="bg-teal-600 hover:bg-teal-700"
            endIcon={<ShoppingCart className="h-4 w-4" />}
          />
        </div>
      </div>
    </Card>
  );
}
