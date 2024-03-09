// Importa a função `api` do módulo `@/data/api` para fazer requisições à API
import { api } from "@/data/api";
// Importa o tipo `Product` do módulo `@/data/types/product` para tipagem dos produtos
import { Product } from "@/data/types/product";
import { Metadata } from "next";
// Importa o componente `Image` do Next.js para renderizar imagens otimizadas
import Image from "next/image";
// Importa o componente `Link` do Next.js para criar links na aplicação
import Link from "next/link";


export const metadata:Metadata={
  title:'Home'
}




// Função assíncrona que busca os produtos em destaque
async function getFeaturedProducts(): Promise<Product[]> {
  // Faz uma requisição à API para obter os produtos em destaque
  const response = await api("/products/featured", {
    next: {
      revalidate: 60 * 60, // Define o tempo de revalidação do cache em 1 hora
    },
  });

  // Converte a resposta da API para JSON
  const products = await response.json();

  // Retorna os produtos em destaque
  return products;
}

// Página inicial da aplicação
export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Obtém os produtos em destaque e outros produtos
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

 

  // Renderiza a página inicial
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      {/* Renderiza o produto em destaque */}
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end relative"
      >
        <Image
          src={highlightedProduct.image}
          width={920}
          height={920}
          quality={100}
          alt=""
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="bottom-28 absolute right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold text-xs">
            {highlightedProduct.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {/* Renderiza os outros produtos */}
      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              width={920}
              height={920}
              quality={100}
              alt=""
              className="group-hover:scale-105 transition-transform duration-500"
            />
            <div className="bottom-10 absolute right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold text-xs">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
