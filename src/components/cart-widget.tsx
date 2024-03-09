"use client"
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { ShoppingBag } from "lucide-react";



export function CartWidget() {
  const { items } = useCart();

  return (
    <div className="flex items-center gap-2">
      <Link href="/cart" legacyBehavior>
        <a>
          <ShoppingBag className="h-4 w-4 cursor-pointer" />
        </a>
      </Link>
      <span className="text-sm"> cart ({items.length})</span>
    </div>
  );
}
