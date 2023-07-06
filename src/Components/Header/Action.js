import * as CONSTANTS from './Constant'

export let getCartDetails = (cartData) => {
    return {
        type:CONSTANTS.GET_CART_DETAILS,
        cartData
    }
}

export let getAllCategoryList = (categoryList) => {
    
    return {
        type : CONSTANTS.GET_ALL_CATEGORY_LIST,
        categoryList
    }
}
// export let resetCartToInitialState = () => {
//     return {
//       type : CONSTANTS.RESET_CART_TO_INITIAL_STATE
//     }
//   }

