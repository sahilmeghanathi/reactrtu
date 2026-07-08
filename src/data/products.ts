import { Product } from "@/types/product.types";

export const products: Product[] = [
  {
    id: "aurora-headphones",
    name: "Aurora Wireless Headphones",
    category: "Audio",
    description: "Clean, immersive sound with active noise canceling and long battery life.",
    price: 199,
    oldPrice: 249,
    image:
      "https://images.unsplash.com/photo-1517503736105-c19fbb6c98af?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    tags: ["Wireless", "Noise-canceling"],
  },
  {
    id: "nova-smartwatch",
    name: "Nova Smartwatch",
    category: "Wearables",
    description: "Track workouts, sleep, and health metrics with a vibrant touchscreen display.",
    price: 139,
    oldPrice: 169,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    tags: ["Fitness", "Sleep"],
  },
  {
    id: "pixel-lamp",
    name: "Pixel Desk Lamp",
    category: "Home",
    description: "Minimal LED lamp with adjustable color temperature and energy-efficient lighting.",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    tags: ["Desk", "Lighting"],
  },
  {
    id: "echo-speaker",
    name: "Echo Smart Speaker",
    category: "Audio",
    description: "Voice-enabled smart speaker with crystal-clear sound and home assistant integration.",
    price: 99,
    oldPrice: 129,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    tags: ["Smart", "Voice"],
  },
  {
    id: "cosmo-sneakers",
    name: "Cosmo Running Sneakers",
    category: "Footwear",
    description: "Lightweight, responsive running shoes with breathable mesh and supportive cushioning.",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    tags: ["Sport", "Comfort"],
  },
  {
    id: "nova-backpack",
    name: "Nova Travel Backpack",
    category: "Accessories",
    description: "Durable travel backpack with a laptop sleeve, water-resistant fabric, and organized storage.",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    tags: ["Travel", "Organized"],
  },
];
