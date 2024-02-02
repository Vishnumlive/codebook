import { useTitle } from "../../hooks/useTitle";

import { useCart } from "../../context";
import { CartEmpty } from "./components/CartEmpty";
import { CartList } from "./components/CartList";

export const CartPage = () => {

    const { cartList } = useCart();

    useTitle("Cart");

    
      return (
        <main>       
          { cartList.length ?  <CartList  /> : <CartEmpty />}
        </main>
      )
    }
    