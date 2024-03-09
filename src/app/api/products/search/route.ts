// Importa o módulo "zod", que é uma biblioteca de validação de esquema para TypeScript
import { z } from "zod"

// Importa os dados do arquivo "data.json"
import data from "../data.json"

// Importa a interface NextRequest do módulo "next/server"
import { NextRequest } from "next/server"

// Importa a interface NextURL do módulo "next/dist/server/web/next-url"
import { NextURL } from "next/dist/server/web/next-url"

// Define a função assíncrona GET que será chamada quando ocorrer uma solicitação HTTP GET
export async function GET(request: NextRequest) {
  
  // Extrai os parâmetros de pesquisa (query params) da URL da solicitação
  const { searchParams } = request.nextUrl

  // Obtém o parâmetro de consulta chamado "q" e valida como uma string usando o Zod
  const query = z.string().parse(searchParams.get("q"))

  // Filtra os produtos com base no título que contém a consulta fornecida (ignorando maiúsculas e minúsculas)
  const products = data.products.filter(product => {
    return product.title.toLowerCase().includes(query.toLowerCase())
  })

  // Retorna uma resposta HTTP com os produtos filtrados em formato JSON
  return Response.json(products)
}
