import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

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
  let products = [];

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    if (response.ok && Array.isArray(data)) {
      products = data;
    }
  } catch (error) {
    products = [];
  }

  return {
    props: {
      products,
    },
  };
}
