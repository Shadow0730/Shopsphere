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
  return {
    props: {
      products,
    },
  };
}
