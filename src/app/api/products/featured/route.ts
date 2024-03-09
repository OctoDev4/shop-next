import data from "../data.json"


export async function GET(){

 // Aguarda 2 segundos antes de renderizar a página
 await new Promise((resolve) => setTimeout(resolve, 1500));

  const featuredProducts = data.products.filter((product)=>product.featured)


  return Response.json(featuredProducts)

}