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
      console.log("inside the login state")
      return {
        ...state,
        userDetail: action.userDetails
      };
      case CONSTANTS.RESET_USER_STATE_TO_INITIAL_STATE : {
        console.log("inside reste tp oinitial state" )
        return {
          ...state,
          userDetail : ""
        }
      }
      default:
        return state;
    }
};
