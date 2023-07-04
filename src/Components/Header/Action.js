import * as CONSTANTS from './Constant'

export let getCartDetails = (cartData) => {
    return {
        type:CONSTANTS.GET_CART_DETAILS,
        cartData
    }
}
export const getSearchValue = (searchValue) => {
    return {
        type : CONSTANTS.GET_SEARCH_VALUE,
        searchValue
    }
}

export const getUserDetails = (userDetails)=>{
    return {
        type : CONSTANTS.GET_USER_DETAILS,
        userDetails
    }
}
// export let resetCartToInitialState = () => {
//     return {
//       type : CONSTANTS.RESET_CART_TO_INITIAL_STATE
//     }
//   }

