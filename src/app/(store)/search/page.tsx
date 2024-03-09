// Importa o componente de imagem do Next.js para renderizar imagens otimizadas
import Image from 'next/image'

// Importa o componente de link do Next.js para navegação entre páginas
import Link from 'next/link'

// Importa a função de redirecionamento do Next.js
import { redirect } from 'next/navigation'

// Importa o tipo de dados Product
import { Product } from '@/data/types/product'

// Importa a função de chamada à API
import { api } from '@/data/api'

// Define a interface para os parâmetros de busca
interface SearchProps {
  searchParams: {
    q: string // Campo "q" contendo a string de busca
  }
}

// Função assíncrona para buscar os produtos com base na query
async function searchProducts(query: string): Promise<Product[]> {
  // Faz uma chamada à API para buscar os produtos que correspondem à query
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // Configura o tempo de revalidação do cache para 1 hora
    },
  })

  // Extrai os produtos da resposta da API
  const products = await response.json()

  return products // Retorna os produtos encontrados
}

// Componente de pesquisa de produtos
export default async function Search({ searchParams }: SearchProps) {
  const { q } = searchParams // Extrai a query dos parâmetros de busca

  // Verifica se a query está vazia
  if (!q) {
    redirect('/') // Redireciona para a página inicial se a query estiver vazia
  }

  // Busca os produtos com base na query
  const products = await searchProducts(q)

  return (
    <div className="flex flex-col gap-4">
      {/* Título mostrando os resultados da busca */}
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{q}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {/* Mapeia os produtos e renderiza um link para cada um */}
        {products.map((product) => {
          return (
            // Renderiza um link para o detalhe do produto
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              {/* Renderiza a imagem do produto */}
              <Image
                src={product.image}
                className="group-hover:scale-105 transition-transform duration-500"
                width={480}
                height={480}
                quality={100}
                alt=""
              />

              {/* Renderiza o título e o preço do produto */}
              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                {/* Trunca o título do produto se for muito longo */}
                <span className="text-sm truncate">{product.title}</span>
                
                {/* Renderiza o preço do produto formatado como moeda brasileira */}
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
