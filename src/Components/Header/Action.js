import * as CONSTANTS from "./Constant";

export let getCartDetails = (cartData) => {
  return {
    type: CONSTANTS.GET_CART_DETAILS,
    cartData,
  };
};

export let getAllCategoryList = (categoryList) => {
  return {
    type: CONSTANTS.GET_ALL_CATEGORY_LIST,
    categoryList,
  };
};

export const getSearchValue = (searchValue) => {
  return {
    type: CONSTANTS.GET_SEARCH_VALUE,
    searchValue,
  };
};

export let getUserDetails = (userDetails) => {
  return {
    type: CONSTANTS.GET_USER_DETAILS,
    userDetails,
  };
}
// export let resetCartToInitialState = () => {
//     return {
//       type : CONSTANTS.RESET_CART_TO_INITIAL_STATE
//     }
//   }

export let resetUserToInitialState = () => {
  return {
    type: CONSTANTS.RESET_USER_STATE_TO_INITIAL_STATE,
    
  }
}