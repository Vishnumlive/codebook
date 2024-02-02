import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { OrderFail } from "./component/OrderFail";
import { OrderSuccess } from "./component/OrderSuccess";

export const OrderPage = () => {

    const { state } = useLocation();
    const orderSuccess = state.status;

    useTitle("Order Status");

    return (
        orderSuccess ? <OrderSuccess data={state.data} /> : <OrderFail />
    )
  }
  