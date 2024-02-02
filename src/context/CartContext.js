import { useContext, useReducer } from "react";
import { createContext } from "react";
import { CartReducer } from "../reducers";

const intialCart = {
    cartList : [],
    cartTotal : 0
}

const CartContext = createContext(intialCart);

export const CartProvider = ({children}) =>{

    const [state, dispatch] = useReducer(CartReducer,intialCart);

    function addToCart(product){
        const updatedList = state.cartList.concat(product);
        dispatch({type: "ADD_TO_CART", payload : { cartList : updatedList }})
        updateTotal(updatedList);
        
    }

    function removeFromCart(product){
        const updatedList = state.cartList.filter((item) => item.id !== product.id);
        
        dispatch({type: "REMOVE_FROM_CART", payload : { cartList : updatedList }})
        updateTotal(updatedList);
    }

    function clearCart(){
        dispatch({type: "CLEAR_CART", payload : {
            cartList : [],
            cartTotal : 0
        }})
    }

    function updateTotal(updatedList){
        
        let total = 0;
        updatedList.map((product) => total += product.price );

        dispatch({type:"UPDATE_PRICE", payload: {cartTotal : total}})
    }

    const value = {
        addToCart,
        removeFromCart,
        clearCart,
        cartList : state.cartList,
        cartTotal : state.cartTotal
    }

    return (
        <CartContext.Provider value={ value } >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}