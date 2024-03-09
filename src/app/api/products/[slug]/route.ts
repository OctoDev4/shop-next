import { NextResponse } from "next/server";
import data from "../data.json"
import {z} from "zod"


export async function GET(request:Request,
  {params}:{params:{slug:string}}){

 // Aguarda 2 segundos antes de renderizar a página



const slug = z.string().parse(params.slug)

const product = data.products.find((product)=>product.slug === slug)

if(!product){
  Response.json({message:"product not found"},{status:400})
}
   return Response.json(product)
}
