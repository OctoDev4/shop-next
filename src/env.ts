// Importa a função `error` do módulo `console`
import { error } from "console";
// Importa a função `z` do módulo `zod`
import { z } from "zod";

// Define um esquema de validação para as variáveis de ambiente
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(), // Define que a variável deve ser uma string válida de URL
  APP_URL: z.string().url()
});

// Faz a análise segura das variáveis de ambiente com base no esquema de validação
const parsedEnv = envSchema.safeParse(process.env);

// Verifica se a análise foi bem-sucedida
if (!parsedEnv.success) {
  // Se houver erro na análise, exibe uma mensagem de erro detalhada no console
  console.error("Invalid environment variables", parsedEnv.error.flatten().fieldErrors);
  // Lança um erro para interromper a execução do programa
  throw new Error("Invalid environment variables");
}

// Exporta as variáveis de ambiente analisadas e validadas
export const env = parsedEnv.data;
