import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      <div className="flex items-center bg-gray-900 px-4 py-3 text-white shadow-sm">
        <div
          onClick={() => router.push('/')}
          className="mr-4 cursor-pointer rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-lg font-bold tracking-wide text-indigo-200 shadow-sm transition hover:bg-gray-700"
        >
          ShopWave
        </div>

        <div className="hidden h-10 flex-grow items-center rounded-md border border-gray-700 bg-white text-gray-700 shadow-inner sm:flex">
          <input
            className="h-full w-6 flex-grow rounded-l-md border-none bg-transparent px-4 text-sm outline-none"
            type="text"
            placeholder="Search products"
          />
          <div className="flex h-full items-center bg-indigo-500 px-4 text-white hover:bg-indigo-400">
            <SearchIcon className="h-5 w-5" />
          </div>
        </div>

        <div className="ml-6 flex items-center gap-5 whitespace-nowrap text-xs text-gray-200">
          <div onClick={!session ? signIn : signOut} className="link">
            <p className="text-gray-300">{session ? `Hello, ${session.user.name}` : 'Sign in'}</p>
            <p className="text-sm font-bold text-white">Account</p>
          </div>

          <div onClick={() => router.push('/orders')} className="link">
            <p className="text-gray-300">Returns</p>
            <p className="text-sm font-bold text-white">Orders</p>
          </div>

          <div onClick={() => router.push('/checkout')} className="relative flex items-center gap-2">
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-400 text-[10px] font-bold text-gray-900">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-8 w-8" />
            <p className="hidden text-sm font-bold text-white md:inline">Cart</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-gray-700 px-5 py-2 text-sm text-gray-100">
        <p className="link flex items-center">
          <MenuIcon className="mr-2 h-5 w-5" />
          All
        </p>
        <p className="link">Featured</p>
        <p className="link">New arrivals</p>
        <p className="link">Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
      </div>
    </header>
  );
}

export default Header;