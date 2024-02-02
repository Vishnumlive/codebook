import { useEffect, useState } from "react";
import { useTitle } from "../../hooks/useTitle";
import { DashboardCard } from "./components/DashboardCard";
import { DashboardEmpty } from "./components/DashboardEmpty";
import { getUserOrders } from "../../services";
import { toast } from "react-toastify";

export const DashboardPage = () => {

    const [orders, setOrders] = useState([]);

    useTitle("Order History Dashboard");
    
    useEffect(()=>{
        async function getallOrders(){

            try {

                const data = await getUserOrders();
                setOrders(data);
        
            } catch (error) {
                toast.error(error.message,{ position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: false,theme: "light"});
            }

        }

        getallOrders();

    },[]);

    return (
      <main>
        <section>
            <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
        </section>

        <section>
            { orders.length > 0 && orders.map((order) => (
                <DashboardCard key={order.id} order={order} />
            ))}
            {orders.length ===0 && (
                <DashboardEmpty />
            )}
        </section>
    
      </main>
    )
  }
  