import {useSession} from 'next-auth/client';
import Header from "../components/Header"
import moment from "moment";

function Orders() {
    return(
        <div>
            <Header/>
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">your Orderd</h1>

                {session ? (
                    <h2>x Orders</h2>
                ) : (
                    <h2>Please sign in to see your products</h2>
                )}

                <div className='mt-5 space-y-4'></div>
            </main>
        </div>
    )
}

export default Orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //get the users logged in credentials
    const session = getSession(context);

    if(!session){
        return {
            props: {},
        };
    }
    const stripeOrders = await db.collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy("timestamp", "desc")
    .get();

    //stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
        }))
    )
}