// src/context/cart-context.tsx
"use client"
import { Product } from "@/data/types/product";
import { ReactNode, createContext, useContext, useState } from "react";

// Interface para representar um item do carrinho
export interface CartItem {
  productId: number;
  quantity: number;
  productDetails?: Product; // Alteramos para productDetails opcional
}

// Interface para o contexto do carrinho
interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number, productDetails?: Product) => void; // Alteramos para productDetails opcional
}

// Criação do contexto do carrinho
const cartContext = createContext({} as CartContextType);

// Provedor do contexto do carrinho
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Função para adicionar um produto ao carrinho
  function addToCart(productId: number, productDetails?: Product) { // Alteramos para productDetails opcional
    setCartItems((state) => {

      const productInCart = state.find((item) => item.productId === productId);

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        return [...state, { productId, quantity: 1, productDetails }]; // Alteramos para productDetails opcional
      }
    });
  }

  return (
    <cartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}

// Hook para acessar o contexto do carrinho
export const useCart = () => useContext(cartContext);
