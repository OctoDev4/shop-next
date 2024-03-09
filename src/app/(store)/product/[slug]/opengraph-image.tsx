import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { ImageResponse } from 'next/og'
import { ProductProps } from './page'
import { URL } from 'url'
import { env } from '@/env'
import colors from "tailwindcss/colors" 
import Image from 'next/image'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

async function getProducts(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // Revalidar cache a cada 1 hora
    },
  })
  const product = await response.json()
  return product
}

export const contentType = 'image/png'

// Image generation
export default async function OgImage({ params }: ProductProps) {
  const product = await getProducts(params.slug)
  const productImgUrl = new URL(product.image, env.APP_URL).toString()
  


  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Image src={productImgUrl} alt='' width={100}/>
        About Acme
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
     
    }
  )
}
