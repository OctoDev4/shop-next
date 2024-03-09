// Importa a função `api` do módulo '@/data/api'
import AddToCartButton from "@/components/add-to-cart-button";
import { api } from "@/data/api";
// Importa o tipo `Product` do módulo '@/data/types/product'
import { Product } from "@/data/types/product";
// Importa o tipo `Metadata` do módulo `next`
import { Metadata } from "next";
// Importa o componente `Image` do Next.js
import Image from "next/image";

// Interface que define a estrutura dos parâmetros esperados
export interface ProductProps {
  params: {
    slug: string; // Define que params tem uma propriedade slug do tipo string
  };
}

// Função assíncrona que busca os detalhes do produto com base no slug
async function getProducts(slug: string): Promise<Product> {
  // Faz uma chamada à API para buscar os detalhes do produto com base no slug
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // Revalidar cache a cada 1 hora
    },
  });

  // Converte a resposta da API para JSON
  const product = await response.json();

  // Retorna os detalhes do produto
  return product;
}

// Função assíncrona que gera os metadados da página do produto com base no slug
export async function generateMetaData({ params }: ProductProps): Promise<Metadata> {
  // Obtém os detalhes do produto com base no slug
  const product = await getProducts(params.slug);

  // Retorna os metadados da página com o título do produto
  return {
    title: product.title,
  };
}


export function generateStaticParams(){
  return[
    {
      slug:""
    }
  ]
}

// Página do produto que recebe os parâmetros da rota e exibe os detalhes do produto
export default async function ProductPage({ params }: ProductProps) {
  // Obtém os detalhes do produto com base no slug
  const product = await getProducts(params.slug);

  // Renderiza a página do produto com os detalhes do produto
  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        {/* Exibe a imagem do produto */}
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        {/* Exibe o título do produto */}
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        {/* Exibe a descrição do produto */}
        <p className="mt-2 leading-relaxed text-zinc-400">{product.description}</p>
        {/* Exibe o preço do produto */}
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          {/* Calcula e exibe o preço parcelado do produto */}
          <span className="text-sm text-zinc-400">Em Até {(product.price / 12).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</span>
        </div>
        {/* Exibe os tamanhos disponíveis do produto */}
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <div className="flex gap-2">
            {/* Botões para os tamanhos disponíveis do produto */}
            <button type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              P
            </button>
            <button type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              M
            </button>
            <button type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              G
            </button>
            <button type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              GG
            </button>
          </div>
        </div>
        {/* Botão para adicionar o produto ao carrinho */}
        <AddToCartButton productId={product.id} productDetails={product} />
      </div>
    </div>
  );
}
