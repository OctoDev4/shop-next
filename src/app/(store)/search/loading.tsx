'use client' // Esta linha indica que o código deve ser executado no lado do cliente

import { Skeleton } from "@/components/skeleton" // Importa o componente Skeleton de um local específico do projeto
import { useSearchParams } from "next/navigation" // Importa o hook useSearchParams do Next.js para acessar os parâmetros de busca da URL

// Componente de carregamento para a página de resultados da busca
export default function SearchLoading() {
   // Utiliza o hook useSearchParams para acessar os parâmetros de busca da URL
   const searchParams = useSearchParams()

   // Obtém o valor do parâmetro 'q' da URL, que representa a query de busca
   const query = searchParams.get('q')

   return (
      <div className="flex flex-col gap-4">
         {/* Título mostrando a query de busca */}
         <p className="text-sm">Resultados Para : <span className="font-semibold">{query}</span></p>
         
         {/* Grid para exibir os esqueletos de carregamento dos produtos */}
         <div className="grid grid-cols-3 gap-6">
            {/* Renderiza vários esqueletos de carregamento para simular o carregamento dos produtos */}
            <Skeleton className="h-[420px]"/>
            <Skeleton className="h-[420px]"/>
            <Skeleton className="h-[420px]"/>
            <Skeleton className="h-[420px]"/>
            <Skeleton className="h-[420px]"/>
            <Skeleton className="h-[420px]"/>  
         </div>
      </div>
   )
}
