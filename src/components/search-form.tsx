'use client'

import { Search } from "lucide-react"; // Importa o ícone de busca da biblioteca Lucide React
import { useRouter, useSearchParams } from "next/navigation"; // Importa hooks para lidar com a rota e parâmetros de busca
import { FormEvent } from "react"; // Importa o tipo de evento de formulário do React

export default function SearchForm() { // Define o componente de formulário de busca

  const router = useRouter(); // Inicializa o hook useRouter para obter acesso ao objeto de rota
  const searchParams = useSearchParams(); // Inicializa o hook useSearchParams para obter os parâmetros de busca da URL
  const query = searchParams.get('q'); // Obtém o valor do parâmetro 'q' da busca, se existir

  function handleSearch(e:FormEvent<HTMLFormElement>){ // Função para lidar com a submissão do formulário
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const formData = new FormData(e.currentTarget); // Obtém os dados do formulário submetido
    const data = Object.fromEntries(formData); // Converte os dados do formulário em um objeto

    const query = data.q; // Obtém o valor da busca do objeto de dados

    if(!query){ // Verifica se a busca está vazia
      return null; // Retorna nulo se a busca estiver vazia
    }

    router.push(`/search?q=${query}`); // Redireciona para a rota de busca com o parâmetro de busca atualizado
  }

  return (
    <form
    onSubmit={handleSearch} // Define a função de tratamento para o evento de envio do formulário
     className="flex w-[320px] items-center gap-3 
    rounded-full
     bg-zinc-900 
     px-5 py-3
      ring-zinc-700">

      <Search className="w-5 h-5 text-zinc-500" 
      />
    
      <input type="text"
      defaultValue={query??''} // Define o valor padrão do campo de entrada como o valor da busca atual ou uma string vazia
      name="q" // Define o nome do campo de entrada como 'q'
      required // Define o campo de entrada como obrigatório
      placeholder="Buscar Produtos" // Define o texto do espaço reservado do campo de entrada
      className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500" /> 

    </form>
  )
}
