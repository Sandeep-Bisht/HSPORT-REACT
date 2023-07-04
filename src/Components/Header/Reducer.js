import * as CONSTANTS from './Constant';
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action, "actin inside reducer")
  switch (action.type) {

    case CONSTANTS.GET_CART_DETAILS:
      return {        
        ...state,
        userCartDetails: action.cartData,
      };
    // case CONSTANTS.GET_CART_DETAILS_SUCCESS:
    //   return {
    //     ...state,
    //     cartDetailsSuccess: action.response,
    //   };

    // case CONSTANTS.GET_CART_DETAILS_FAILURE:
    //   return {
    //     ...state,
    //     cartDetailsFalure: action.error,
    //   };

      // case CONSTANTS.RESET_CART_TO_INITIAL_STATE :
      //   return {
      //     ...state,
      //     cartDetailsSuccess: ""
      //   };
    default:
      return state;
  }
};
