import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header";

function Orders({ orders, session }) {
    const { data: userSession } = useSession();

    return (
        <div>
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

                {userSession ? (
                    <h2>{orders?.length || 0} Orders</h2>
                ) : (
                    <h2>Please sign in to see your products</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map((order) => (
                        <div key={order.id} className="border p-4 rounded-md">
                            <p>Order ID: {order.id}</p>
                            <p>Total: ${order.amount / 100}</p>
                            <p>Shipping: ${order.amountShipping / 100}</p>
                            <p>Timestamp: {new Date(order.timestamp * 1000).toLocaleString()}</p>
                            <div className="flex gap-2 mt-2">
                                {order.images?.map((image, index) => (
                                    <img key={`${order.id}-${index}`} src={image} className="h-20 w-20 object-contain" alt="Order item" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Orders;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return { props: { orders: [], session: null } };
    }

    const firebase = require("firebase");
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
        });
    }

    const db = firebase.firestore();
    const stripeOrders = await db
        .collection("users")
        .doc(session.user.email)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .get();

    const orders = stripeOrders.docs.map((order) => ({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: order.data().timestamp?.toDate ? order.data().timestamp.toDate().getTime() / 1000 : 0,
    }));

    return {
        props: {
            orders,
            session,
        },
    };
}