import * as CONSTANTS from './Constant';
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CONSTANTS.GET_CART_DETAILS:
      return {        
        ...state,
        userCartDetails: action.cartData,
      };

      case CONSTANTS.GET_ALL_CATEGORY_LIST:
        return {
          ...state,
          allCategoryList : action.categoryList
        }
  
      case CONSTANTS.GET_SEARCH_VALUE:
        return {
          ...state,
          searchData: action.searchValue,
        };

    case CONSTANTS.GET_USER_DETAILS :
      return {
        ...state,
        userDetail: action.userDetails
      };
      default:
        return state;
    }
};
