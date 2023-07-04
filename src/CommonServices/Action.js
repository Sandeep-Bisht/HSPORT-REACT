import * as CONSTANTS from "./Constant";

export const getCartItem = (cartItems) => {
    return {
        type : CONSTANTS.GET_CARTITEMS_NUMBER,
        cartItems
    }
}
