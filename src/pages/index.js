import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import products from "../data/products";

export default function Home({ products }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Head>
        <title>ShopWave</title>
      </Head>
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 py-6">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      headers: {
        Accept: "application/json",
        "User-Agent": "ShopWave/1.0",
      },
      signal: controller.signal,
    });
    const data = await response.json();

    if (response.ok && Array.isArray(data) && data.length > 0) {
      return {
        props: {
          products: data,
        },
      };
    }

    console.error("Product API returned an invalid response", response.status);
  } catch (error) {
    console.error("Product API request failed", error.message);
  } finally {
    clearTimeout(timeout);
  }

  return {
    props: {
      products,
    },
  };
}
