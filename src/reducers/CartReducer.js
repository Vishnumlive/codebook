export const CartReducer = (state, action) =>{

    const {type, payload} = action;

    switch (type){
        case "ADD_TO_CART" :
            return { ...state, cartList: payload.cartList }
        case "REMOVE_FROM_CART" :
            return { ...state, cartList: payload.cartList }
        case "CLEAR_CART" :
            return {cartList: payload.cartList, cartTotal : payload.cartTotal}
        case "UPDATE_PRICE" :
            return {...state, cartTotal : payload.cartTotal }
        default:
            throw new Error("Case Not Found!");
        
    }
}