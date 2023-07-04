import * as CONSTANTS from './Constant'

export let getCartDetails = (cartData) => {
    console.log(cartData, "inside get cart action")
    return {
        type:CONSTANTS.GET_CART_DETAILS,
        cartData
    }
}
// export let resetCartToInitialState = () => {
//     return {
//       type : CONSTANTS.RESET_CART_TO_INITIAL_STATE
//     }
//   }

