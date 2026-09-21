import Head from "next/head";
import axios from "axios";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import localProducts from "../data/products";

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
  try {
    const response = await axios.get("https://fakestoreapi.com/products", {
      timeout: 8000,
      headers: {
        Accept: "application/json",
        "User-Agent": "ShopWave/1.0",
      },
    });
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      return {
        props: {
          products: data,
        },
      };
    }

    console.error("Product API returned an invalid response", response.status);
  } catch (error) {
    console.error(
      "Product API request failed",
      error.response?.status || error.code || error.message
    );
  }

  return {
    props: {
      products: localProducts,
    },
  };
}
