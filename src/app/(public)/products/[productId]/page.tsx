import { publicApi } from "@/lib/api/publicApi";
import { makeStore } from "@/lib/store";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "./product-details";

export const dynamic = "force-dynamic";

async function getProductById(productId: string) {
  const store = makeStore();
  const res = await store.dispatch(publicApi.endpoints.getProduct.initiate(productId));
  return res.data;
}

export async function generateMetadata(props: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductById(params.productId);
  if (!product) {
    return { title: "Product Not Found", description: "No product found." };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const url = `${baseUrl}/products/${product._id}`;
  const title = product.name;
  const description = product.short_description || "Explore product details";
  const image = product.images[0]?.image.secure_url || "/fallback-image.jpg";

  return {
    title: `${title} | Our Store`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: baseUrl?.replace(/^https?:\/\//, "") as string,
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage(props: { params: Promise<{ productId: string }> }) {
  const params = await props.params;
  const product = await getProductById(params.productId);
  if (!product) return notFound();

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <ProductDetail product={product} />
    </div>
  );
} 