
"use client"


import { useCart } from "@/context/cart-context";
import { Product } from "@/data/types/product";

interface AddToCartButtonProps {
  productId: number;
  productDetails: Product;
 
}

export default function AddToCartButton({ productId, productDetails}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(productId, productDetails);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao Carrinho
    </button>
  );
}
