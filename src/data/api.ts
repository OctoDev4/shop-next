// Importa a variável de ambiente `env` do módulo `@/env`
import { env } from "@/env";

// Define uma função `api` que recebe um caminho e uma configuração de inicialização opcional
export function api(path: string, init?: RequestInit) {
  // Obtém a URL base da API da variável de ambiente `env`
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  const apiPrefix = "/api"


  // Cria uma nova URL combinando o caminho fornecido com a URL base da API
  const url = new URL(apiPrefix.concat(path), baseUrl);

  // Realiza uma requisição fetch para a URL construída, com a configuração de inicialização opcional
  return fetch(url, init);
}

// Exemplo de uso da função `api` para obter os produtos
api("/api/products");
