import {
    LIST_TEMPLATE_API_GET_CALL,
    LIST_TEMPLATE_REDUCER
  } from "../../constants/listView";
  
  
  export const initialState = {
    errorMessage: "",
    publishers: [],
    today: {},
    fromYesterday: [],
    topBuyers: [],
    topAdvertisers: [],
    topDemandPartners: [],
    topAdFormats: [],
    topBuyingTypes: [],
    topPlatforms: [],
    total: {},
    byDays: [],
    graphDemandPartners: [],
    graphAdFormat: [],
    cardsLoading: false,
    overviewGraphLoading: false,
    demandGraphLoading: false,
    adformatGraphLoading: false
  };
  
  export default function listPageReducer(state = initialState, action: any) {
    switch (action.type) {
      case LIST_TEMPLATE_API_GET_CALL.GET_REQUEST:
      case LIST_TEMPLATE_API_GET_CALL.GET_SUCCESS:
        return {
          ...state,
          errorMessage: "",
          publishers: action?.result ? action.result : [],
        };
      case LIST_TEMPLATE_API_GET_CALL.GET_FAILURE:
        return {
          ...state,
          errorMessage: action.error,
          overviewGraphLoading: false,
        };
      case LIST_TEMPLATE_REDUCER.CLEAR_REDUCER:
        return {
          ...initialState,
        };
      default:
        return state;
    }
  }
  