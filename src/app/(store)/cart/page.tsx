'use client'

import { CartItem, useCart } from "@/context/cart-context";
import Image from "next/image";

export default function CartPage() {
  const { items } = useCart();

  // Função para calcular o preço total de um item
  function calculateItemTotalPrice(item: CartItem): number {
    if (item.productDetails && item.productDetails.price !== undefined) {
      return item.quantity * item.productDetails.price;
    }
    return 0;
  }
  
  

  // Função para calcular o preço total do carrinho
  const calculateCartTotalPrice = () => {
    return items.reduce((accumulator, item) => {
      return accumulator + calculateItemTotalPrice(item);
    }, 0);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Carrinho</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.productId} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Image src={item.productDetails?.image} width={100} height={100} alt={item.productDetails?.title} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{item.productDetails?.title}</h2>
               
                  <p className="text-gray-600">Preço unitário: ${item.productDetails?.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantidade: {item.quantity}</p>
                  <p className="text-gray-600">Preço total: ${calculateItemTotalPrice(item).toFixed(2)}</p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-gray-600">{item.productDetails?.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">Nenhum item no carrinho</div>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-8 text-xl font-semibold">
          Preço total do carrinho: ${calculateCartTotalPrice().toFixed(2)}
        </div>
      )}
    </div>
  );
}
